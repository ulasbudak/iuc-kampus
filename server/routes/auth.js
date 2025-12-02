import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { dbRun, dbGet } from '../database.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { validateRegister, validateLogin } from '../middleware/validation.js'

const router = express.Router()

// JWT_SECRET kontrolü
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production!')
    }
    console.warn('⚠️  JWT_SECRET not set, using default (NOT SECURE FOR PRODUCTION)')
    return 'your-secret-key-change-in-production'
  }
  return secret
}

// Register
router.post('/register', authLimiter, validateRegister, async (req, res) => {
  try {
    const { name, email, password, studentNumber } = req.body

    // Check if user exists
    const existingUser = await dbGet('SELECT * FROM users WHERE email = ?', [email])
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user
    const result = await dbRun(
      'INSERT INTO users (name, email, password, student_number) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, studentNumber || null]
    )

    // Generate token
    const token = jwt.sign(
      { id: result.lastID, email },
      getJWTSecret(),
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: { id: result.lastID, name, email, role: 'user' }
    })
  } catch (error) {
    console.error('Register error:', error)
    // Hassas bilgi sızıntısını önle
    res.status(500).json({ message: 'Kayıt sırasında bir hata oluştu' })
  }
})

// Login
router.post('/login', authLimiter, validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email])
    if (!user) {
      // Timing attack koruması için aynı süreyi bekle
      await bcrypt.compare(password, '$2a$10$dummyhashfordelay')
      return res.status(401).json({ message: 'E-posta veya şifre hatalı' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'E-posta veya şifre hatalı' })
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      getJWTSecret(),
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Giriş başarılı',
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        role: user.role || 'user'
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    // Hassas bilgi sızıntısını önle
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu' })
  }
})

export default router

