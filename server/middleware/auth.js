import jwt from 'jsonwebtoken'
import { dbGet } from '../database.js'

// Authentication middleware - JWT token kontrolü
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Yetkilendirme gerekli' })
    }

    const token = authHeader.substring(7) // "Bearer " kısmını çıkar

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not set!')
      return res.status(500).json({ message: 'Sunucu yapılandırma hatası' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Kullanıcıyı veritabanından al ve role bilgisini kontrol et
    const user = await dbGet('SELECT id, email, role FROM users WHERE id = ?', [decoded.id])
    
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz token' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token süresi dolmuş' })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Geçersiz token' })
    }
    console.error('Authentication error:', error)
    return res.status(500).json({ message: 'Yetkilendirme hatası' })
  }
}

// Authorization middleware - Admin kontrolü
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Yetkilendirme gerekli' })
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin yetkisi gerekli' })
    }

    next()
  } catch (error) {
    console.error('Authorization error:', error)
    return res.status(500).json({ message: 'Yetkilendirme hatası' })
  }
}

