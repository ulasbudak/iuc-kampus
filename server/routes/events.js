import express from 'express'
import { dbRun, dbAll, dbGet } from '../database.js'

const router = express.Router()

// Get all events
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20
    const events = await dbAll(
      'SELECT * FROM events ORDER BY date ASC LIMIT ?',
      [limit]
    )
    res.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ message: 'Etkinlikler getirilirken bir hata oluştu' })
  }
})

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await dbGet('SELECT * FROM events WHERE id = ?', [req.params.id])
    if (!event) {
      return res.status(404).json({ message: 'Etkinlik bulunamadı' })
    }
    res.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({ message: 'Etkinlik getirilirken bir hata oluştu' })
  }
})

// Create event (requires authentication)
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location, author } = req.body
    if (!title || !description || !date || !author) {
      return res.status(400).json({ message: 'Tüm alanları doldurunuz' })
    }

    const result = await dbRun(
      'INSERT INTO events (title, description, date, location, author) VALUES (?, ?, ?, ?, ?)',
      [title, description, date, location || null, author]
    )

    res.status(201).json({
      id: result.lastID,
      message: 'Etkinlik başarıyla oluşturuldu'
    })
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({ message: 'Etkinlik oluşturulurken bir hata oluştu' })
  }
})

export default router

