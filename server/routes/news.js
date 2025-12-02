import express from 'express'
import { dbRun, dbAll, dbGet } from '../database.js'

const router = express.Router()

// Get all news
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20
    const news = await dbAll(
      'SELECT * FROM news ORDER BY created_at DESC LIMIT ?',
      [limit]
    )
    res.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    res.status(500).json({ message: 'Haberler getirilirken bir hata oluştu' })
  }
})

// Get single news
router.get('/:id', async (req, res) => {
  try {
    const news = await dbGet('SELECT * FROM news WHERE id = ?', [req.params.id])
    if (!news) {
      return res.status(404).json({ message: 'Haber bulunamadı' })
    }
    res.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    res.status(500).json({ message: 'Haber getirilirken bir hata oluştu' })
  }
})

// Create news (requires authentication)
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Tüm alanları doldurunuz' })
    }

    const result = await dbRun(
      'INSERT INTO news (title, content, author) VALUES (?, ?, ?)',
      [title, content, author]
    )

    res.status(201).json({
      id: result.lastID,
      message: 'Haber başarıyla oluşturuldu'
    })
  } catch (error) {
    console.error('Error creating news:', error)
    res.status(500).json({ message: 'Haber oluşturulurken bir hata oluştu' })
  }
})

export default router

