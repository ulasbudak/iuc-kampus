import express from 'express'
import { dbRun, dbAll, dbGet } from '../database.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { validateContact, validateId } from '../middleware/validation.js'
import { contactLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Create contact message
router.post('/', contactLimiter, validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const result = await dbRun(
      'INSERT INTO contact_messages (name, email, subject, message, read_status) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, 0]
    )

    res.status(201).json({
      id: result.lastID,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
    })
  } catch (error) {
    console.error('Error creating contact message:', error)
    res.status(500).json({ message: 'Mesaj gönderilirken bir hata oluştu' })
  }
})

// Get all contact messages (admin only)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const messages = await dbAll(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    )
    res.json(messages)
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    res.status(500).json({ message: 'Mesajlar getirilirken bir hata oluştu' })
  }
})

// Get unread contact messages count (admin only)
router.get('/unread-count', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await dbGet(
      'SELECT COUNT(*) as count FROM contact_messages WHERE read_status = 0'
    )
    res.json({ count: result?.count || 0 })
  } catch (error) {
    console.error('Error fetching unread count:', error)
    res.status(500).json({ message: 'Okunmamış mesaj sayısı getirilirken bir hata oluştu' })
  }
})

// Mark message as read (admin only)
router.post('/:id/read', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    await dbRun(
      'UPDATE contact_messages SET read_status = 1 WHERE id = ?',
      [req.params.id]
    )
    res.json({ message: 'Mesaj okundu olarak işaretlendi' })
  } catch (error) {
    console.error('Error marking message as read:', error)
    res.status(500).json({ message: 'Mesaj işaretlenirken bir hata oluştu' })
  }
})

// Delete contact message (admin only)
router.delete('/:id', authenticate, requireAdmin, validateId, async (req, res) => {
  try {
    const result = await dbRun('DELETE FROM contact_messages WHERE id = ?', [req.params.id])
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' })
    }
    res.json({ message: 'Mesaj başarıyla silindi' })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    res.status(500).json({ message: 'Mesaj silinirken bir hata oluştu' })
  }
})

export default router

