import express from 'express'
import { dbRun, dbAll, dbGet } from '../database.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { validateQA, validateId } from '../middleware/validation.js'
import { contentLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Get all QAs (only approved for non-admins)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20
    const isAdmin = req.query.admin === 'true'
    
    let query = 'SELECT * FROM qa'
    let params = []
    
    if (!isAdmin) {
      query += ' WHERE status = ?'
      params.push('approved')
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)
    
    const qas = await dbAll(query, params)
    res.json(qas)
  } catch (error) {
    console.error('Error fetching QAs:', error)
    res.status(500).json({ message: 'Sorular getirilirken bir hata oluştu' })
  }
})

// Get pending QAs (admin only) - MUST BE BEFORE /:id route
router.get('/pending', authenticate, requireAdmin, async (req, res) => {
  try {
    const qas = await dbAll(
      'SELECT * FROM qa WHERE status = ? ORDER BY created_at DESC',
      ['pending']
    )
    res.json(qas)
  } catch (error) {
    console.error('Error fetching pending QAs:', error)
    res.status(500).json({ message: 'Bekleyen sorular getirilirken bir hata oluştu' })
  }
})

// Get single QA
router.get('/:id', validateId, async (req, res) => {
  try {
    const qa = await dbGet('SELECT * FROM qa WHERE id = ?', [req.params.id])
    if (!qa) {
      return res.status(404).json({ message: 'Soru bulunamadı' })
    }
    // Non-admins can only see approved QAs
    if (qa.status !== 'approved' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ message: 'Soru bulunamadı' })
    }
    res.json(qa)
  } catch (error) {
    console.error('Error fetching QA:', error)
    res.status(500).json({ message: 'Soru getirilirken bir hata oluştu' })
  }
})

// Create QA (requires authentication, status: pending)
router.post('/', authenticate, contentLimiter, validateQA, async (req, res) => {
  try {
    const { question } = req.body
    const author = req.user.name
    const userId = req.user.id

    const result = await dbRun(
      'INSERT INTO qa (question, author, user_id, status) VALUES (?, ?, ?, ?)',
      [question, author, userId, 'pending']
    )

    res.status(201).json({
      id: result.lastID,
      message: 'Soru başarıyla oluşturuldu. Onay bekliyor.'
    })
  } catch (error) {
    console.error('Error creating QA:', error)
    res.status(500).json({ message: 'Soru oluşturulurken bir hata oluştu' })
  }
})

// Approve QA (admin only)
router.post('/:id/approve', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    await dbRun(
      'UPDATE qa SET status = ? WHERE id = ?',
      ['approved', req.params.id]
    )
    res.json({ message: 'Soru onaylandı' })
  } catch (error) {
    console.error('Error approving QA:', error)
    res.status(500).json({ message: 'Soru onaylanırken bir hata oluştu' })
  }
})

// Reject QA (admin only)
router.post('/:id/reject', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    await dbRun(
      'UPDATE qa SET status = ? WHERE id = ?',
      ['rejected', req.params.id]
    )
    res.json({ message: 'Soru reddedildi' })
  } catch (error) {
    console.error('Error rejecting QA:', error)
    res.status(500).json({ message: 'Soru reddedilirken bir hata oluştu' })
  }
})

// Answer QA (requires authentication)
router.post('/:id/answer', authenticate, validateId, async (req, res) => {
  try {
    const { answer } = req.body
    if (!answer || answer.trim().length < 10) {
      return res.status(400).json({ message: 'Cevap en az 10 karakter olmalıdır' })
    }

    // Escape answer to prevent XSS
    const sanitizedAnswer = answer.trim()

    await dbRun(
      'UPDATE qa SET answer = ? WHERE id = ?',
      [sanitizedAnswer, req.params.id]
    )

    res.json({ message: 'Cevap başarıyla eklendi' })
  } catch (error) {
    console.error('Error answering QA:', error)
    res.status(500).json({ message: 'Cevap eklenirken bir hata oluştu' })
  }
})

// Delete QA (user can delete own, admin can delete any)
router.delete('/:id', authenticate, validateId, async (req, res) => {
  try {
    // Check if QA exists and user has permission
    const qa = await dbGet('SELECT * FROM qa WHERE id = ?', [req.params.id])
    if (!qa) {
      return res.status(404).json({ message: 'Soru bulunamadı' })
    }

    // User can only delete their own QAs, admin can delete any
    if (qa.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' })
    }

    const result = await dbRun('DELETE FROM qa WHERE id = ?', [req.params.id])
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Soru bulunamadı' })
    }
    res.json({ message: 'Soru başarıyla silindi' })
  } catch (error) {
    console.error('Error deleting QA:', error)
    res.status(500).json({ message: 'Soru silinirken bir hata oluştu' })
  }
})

export default router

