import rateLimit from 'express-rate-limit'

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için 15 dakikada maksimum 100 istek
  message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Auth rate limiter - daha sıkı
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // Her IP için 15 dakikada maksimum 5 login/register denemesi
  message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Başarılı istekleri sayma
})

// Contact form rate limiter
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 saat
  max: 3, // Her IP için 1 saatte maksimum 3 mesaj
  message: 'Çok fazla mesaj gönderildi. Lütfen 1 saat sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Content creation rate limiter
export const contentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 saat
  max: 10, // Her IP için 1 saatte maksimum 10 içerik
  message: 'Çok fazla içerik oluşturuldu. Lütfen 1 saat sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false,
})

