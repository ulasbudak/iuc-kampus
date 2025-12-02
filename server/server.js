import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import { initDatabase } from './database.js'
import authRoutes from './routes/auth.js'
import newsRoutes from './routes/news.js'
import eventsRoutes from './routes/events.js'
import announcementsRoutes from './routes/announcements.js'
import qaRoutes from './routes/qa.js'
import notesRoutes from './routes/notes.js'
import statsRoutes from './routes/stats.js'
import contactRoutes from './routes/contact.js'
import { apiLimiter } from './middleware/rateLimiter.js'

dotenv.config()

// JWT_SECRET kontrolü - Production'da zorunlu
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('❌ JWT_SECRET environment variable is required in production!')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 5001

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}))

// CORS ayarları - Production'da frontend URL'ini ekleyin
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',')
  : (process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000'])

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins 
    : (process.env.FRONTEND_URL || '*'),
  credentials: true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Body parser middleware
app.use(express.json({ limit: '10mb' })) // JSON payload limiti
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Data sanitization - NoSQL injection koruması
app.use(mongoSanitize())

// XSS koruması - HTML escape için express-validator kullanıyoruz
// (xss-clean deprecated olduğu için express-validator'ın escape özelliğini kullanıyoruz)

// Rate limiting - Tüm API istekleri için (stats hariç)
app.use('/api', (req, res, next) => {
  // Stats endpoint'ini rate limiting'den muaf tut
  if (req.path === '/stats' || req.path.startsWith('/stats') || req.originalUrl === '/api/stats') {
    return next()
  }
  apiLimiter(req, res, next)
})

// Initialize database
initDatabase().then(() => {
  console.log('✅ Database initialized successfully')
}).catch((err) => {
  console.error('❌ Database initialization error:', err)
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/announcements', announcementsRoutes)
app.use('/api/qa', qaRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'İUC Kampüs API is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})




