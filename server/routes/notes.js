import express from 'express'
import { dbRun, dbAll, dbGet } from '../database.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { validateNote, validateId } from '../middleware/validation.js'
import { contentLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Get all notes (only approved for non-admins)
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100) // Max 100
    const isAdmin = req.user && req.user.role === 'admin'
    
    let query = 'SELECT * FROM notes'
    let params = []
    
    if (!isAdmin) {
      query += ' WHERE status = ?'
      params.push('approved')
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)
    
    const notes = await dbAll(query, params)
    res.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ message: 'Ders notları getirilirken bir hata oluştu' })
  }
})

// Get pending notes (admin only) - MUST BE BEFORE /:id route
router.get('/pending', authenticate, requireAdmin, async (req, res) => {
  try {
    const notes = await dbAll(
      'SELECT * FROM notes WHERE status = ? ORDER BY created_at DESC',
      ['pending']
    )
    res.json(notes)
  } catch (error) {
    console.error('Error fetching pending notes:', error)
    res.status(500).json({ message: 'Bekleyen ders notları getirilirken bir hata oluştu' })
  }
})

// Get single note
router.get('/:id', validateId, async (req, res) => {
  try {
    const note = await dbGet('SELECT * FROM notes WHERE id = ?', [req.params.id])
    if (!note) {
      return res.status(404).json({ message: 'Ders notu bulunamadı' })
    }
    // Non-admins can only see approved notes
    if (note.status !== 'approved' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ message: 'Ders notu bulunamadı' })
    }
    res.json(note)
  } catch (error) {
    console.error('Error fetching note:', error)
    res.status(500).json({ message: 'Ders notu getirilirken bir hata oluştu' })
  }
})

// Create note (requires authentication, status: pending)
router.post('/', authenticate, contentLimiter, validateNote, async (req, res) => {
  try {
    const { title, description, course_name, file_url } = req.body
    const author = req.user.name
    const userId = req.user.id

    const result = await dbRun(
      'INSERT INTO notes (title, description, course_name, file_url, author, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, course_name || null, file_url || null, author, userId, 'pending']
    )

    res.status(201).json({
      id: result.lastID,
      message: 'Ders notu başarıyla oluşturuldu. Onay bekliyor.'
    })
  } catch (error) {
    console.error('Error creating note:', error)
    res.status(500).json({ message: 'Ders notu oluşturulurken bir hata oluştu' })
  }
})

// Approve note (admin only)
router.post('/:id/approve', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    await dbRun(
      'UPDATE notes SET status = ? WHERE id = ?',
      ['approved', req.params.id]
    )
    res.json({ message: 'Ders notu onaylandı' })
  } catch (error) {
    console.error('Error approving note:', error)
    res.status(500).json({ message: 'Ders notu onaylanırken bir hata oluştu' })
  }
})

// Reject note (admin only)
router.post('/:id/reject', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    await dbRun(
      'UPDATE notes SET status = ? WHERE id = ?',
      ['rejected', req.params.id]
    )
    res.json({ message: 'Ders notu reddedildi' })
  } catch (error) {
    console.error('Error rejecting note:', error)
    res.status(500).json({ message: 'Ders notu reddedilirken bir hata oluştu' })
  }
})

// Delete note (user can delete own, admin can delete any)
router.delete('/:id', authenticate, validateId, async (req, res) => {
  try {
    // Check if note exists and user has permission
    const note = await dbGet('SELECT * FROM notes WHERE id = ?', [req.params.id])
    if (!note) {
      return res.status(404).json({ message: 'Ders notu bulunamadı' })
    }

    // User can only delete their own notes, admin can delete any
    if (note.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' })
    }

    const result = await dbRun('DELETE FROM notes WHERE id = ?', [req.params.id])
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Ders notu bulunamadı' })
    }
    res.json({ message: 'Ders notu başarıyla silindi' })
  } catch (error) {
    console.error('Error deleting note:', error)
    res.status(500).json({ message: 'Ders notu silinirken bir hata oluştu' })
  }
})

export default router

