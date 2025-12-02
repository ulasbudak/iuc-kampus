import { body, param, query, validationResult } from 'express-validator'

// Validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Geçersiz veri',
      errors: errors.array()
    })
  }
  next()
}

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation - en az 8 karakter, büyük harf, küçük harf, sayı
const isValidPassword = (password) => {
  if (password.length < 8) return false
  if (!/[A-Z]/.test(password)) return false
  if (!/[a-z]/.test(password)) return false
  if (!/[0-9]/.test(password)) return false
  return true
}

// Register validation
export const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('İsim 2-100 karakter arasında olmalıdır')
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/)
    .withMessage('İsim sadece harf içerebilir'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Şifre en az 8 karakter olmalıdır')
    .custom((value) => {
      if (!isValidPassword(value)) {
        throw new Error('Şifre en az 8 karakter, büyük harf, küçük harf ve sayı içermelidir')
      }
      return true
    }),
  body('studentNumber')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Öğrenci numarası en fazla 50 karakter olabilir'),
  handleValidationErrors
]

// Login validation
export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Şifre gerekli'),
  handleValidationErrors
]

// Announcement validation
export const validateAnnouncement = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Başlık 3-200 karakter arasında olmalıdır')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Açıklama 10-5000 karakter arasında olmalıdır')
    .escape(),
  handleValidationErrors
]

// QA validation (for creating questions)
export const validateQA = [
  body('question')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Soru 10-2000 karakter arasında olmalıdır')
    .escape(),
  handleValidationErrors
]

// Note validation
export const validateNote = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Başlık 3-200 karakter arasında olmalıdır')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Açıklama 10-2000 karakter arasında olmalıdır')
    .escape(),
  body('course_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Ders adı 2-100 karakter arasında olmalıdır')
    .escape(),
  body('file_url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Geçerli bir URL giriniz'),
  handleValidationErrors
]

// Contact validation
export const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('İsim 2-100 karakter arasında olmalıdır')
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  body('subject')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Konu 3-200 karakter arasında olmalıdır')
    .escape(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Mesaj 10-5000 karakter arasında olmalıdır')
    .escape(),
  handleValidationErrors
]

// ID parameter validation
export const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Geçersiz ID'),
  handleValidationErrors
]

