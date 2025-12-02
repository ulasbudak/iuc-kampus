import express from 'express'
import { dbGet } from '../database.js'

const router = express.Router()

// Get statistics
router.get('/', async (req, res) => {
  try {
    // Get user count
    const userCount = await dbGet('SELECT COUNT(*) as count FROM users')
    console.log('User count:', userCount) // Debug
    
    // Get approved announcements count
    const announcementCount = await dbGet(
      'SELECT COUNT(*) as count FROM announcements WHERE status = ?',
      ['approved']
    )
    console.log('Announcement count:', announcementCount) // Debug
    
    // Get approved Q&A count
    const qaCount = await dbGet(
      'SELECT COUNT(*) as count FROM qa WHERE status = ?',
      ['approved']
    )
    console.log('QA count:', qaCount) // Debug
    
    // Get events count (from events table if exists, otherwise return 0)
    let eventCount = { count: 0 }
    try {
      eventCount = await dbGet('SELECT COUNT(*) as count FROM events') || { count: 0 }
    } catch (error) {
      // Events table might not exist, use 0
      eventCount = { count: 0 }
    }
    console.log('Event count:', eventCount) // Debug

    const stats = {
      users: userCount?.count || 0,
      announcements: announcementCount?.count || 0,
      qa: qaCount?.count || 0,
      events: eventCount?.count || 0,
    }
    
    console.log('Sending stats:', stats) // Debug
    res.json(stats)
  } catch (error) {
    console.error('Error fetching statistics:', error)
    res.status(500).json({ message: 'İstatistikler getirilirken bir hata oluştu' })
  }
})

export default router

