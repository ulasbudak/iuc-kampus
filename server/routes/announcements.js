import express from 'express'
import { dbRun, dbAll, dbGet } from '../database.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { validateAnnouncement, validateId } from '../middleware/validation.js'
import { contentLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Get all announcements (only approved for non-admins)
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100) // Max 100
    const isAdmin = req.user && req.user.role === 'admin'
    
    let query = 'SELECT * FROM announcements'
    let params = []
    
    if (!isAdmin) {
      query += ' WHERE status = ?'
      params.push('approved')
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)
    
    const announcements = await dbAll(query, params)
    res.json(announcements)
  } catch (error) {
    console.error('Error fetching announcements:', error)
    res.status(500).json({ message: 'İlanlar getirilirken bir hata oluştu' })
  }
})

// Get pending announcements (admin only) - MUST BE BEFORE /:id route
router.get('/pending', authenticate, requireAdmin, async (req, res) => {
  try {
    const announcements = await dbAll(
      'SELECT * FROM announcements WHERE status = ? ORDER BY created_at DESC',
      ['pending']
    )
    res.json(announcements)
  } catch (error) {
    console.error('Error fetching pending announcements:', error)
    res.status(500).json({ message: 'Bekleyen ilanlar getirilirken bir hata oluştu' })
  }
})

// Get single announcement
router.get('/:id', validateId, async (req, res) => {
  try {
    const announcement = await dbGet('SELECT * FROM announcements WHERE id = ?', [req.params.id])
    if (!announcement) {
      return res.status(404).json({ message: 'İlan bulunamadı' })
    }
    // Non-admins can only see approved announcements
    if (announcement.status !== 'approved' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ message: 'İlan bulunamadı' })
    }
    res.json(announcement)
  } catch (error) {
    console.error('Error fetching announcement:', error)
    res.status(500).json({ message: 'İlan getirilirken bir hata oluştu' })
  }
})

// Create announcement (requires authentication, status: pending)
router.post('/', authenticate, contentLimiter, validateAnnouncement, async (req, res) => {
  try {
    const { title, description } = req.body
    const author = req.user.name
    const userId = req.user.id

    const result = await dbRun(
      'INSERT INTO announcements (title, description, author, user_id, status) VALUES (?, ?, ?, ?, ?)',
      [title, description, author, userId, 'pending']
    )

    res.status(201).json({
      id: result.lastID,
      message: 'İlan başarıyla oluşturuldu. Onay bekliyor.'
    })
  } catch (error) {
    console.error('Error creating announcement:', error)
    res.status(500).json({ message: 'İlan oluşturulurken bir hata oluştu' })
  }
})

// Approve announcement (admin only)
router.post('/:id/approve', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    await dbRun(
      'UPDATE announcements SET status = ? WHERE id = ?',
      ['approved', req.params.id]
    )
    res.json({ message: 'İlan onaylandı' })
  } catch (error) {
    console.error('Error approving announcement:', error)
    res.status(500).json({ message: 'İlan onaylanırken bir hata oluştu' })
  }
})

// Reject announcement (admin only)
router.post('/:id/reject', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    await dbRun(
      'UPDATE announcements SET status = ? WHERE id = ?',
      ['rejected', req.params.id]
    )
    res.json({ message: 'İlan reddedildi' })
  } catch (error) {
    console.error('Error rejecting announcement:', error)
    res.status(500).json({ message: 'İlan reddedilirken bir hata oluştu' })
  }
})

// Delete announcement (user can delete own, admin can delete any)
router.delete('/:id', authenticate, validateId, async (req, res) => {
  try {
    // Check if announcement exists and user has permission
    const announcement = await dbGet('SELECT * FROM announcements WHERE id = ?', [req.params.id])
    if (!announcement) {
      return res.status(404).json({ message: 'İlan bulunamadı' })
    }

    // User can only delete their own announcements, admin can delete any
    if (announcement.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' })
    }

    const result = await dbRun('DELETE FROM announcements WHERE id = ?', [req.params.id])
    if (result.changes === 0) {
      return res.status(404).json({ message: 'İlan bulunamadı' })
    }
    res.json({ message: 'İlan başarıyla silindi' })
  } catch (error) {
    console.error('Error deleting announcement:', error)
    res.status(500).json({ message: 'İlan silinirken bir hata oluştu' })
  }
})

export default router

