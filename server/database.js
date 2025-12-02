import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import bcrypt from 'bcryptjs'

const db = new sqlite3.Database('./database.db')

const dbGet = promisify(db.get.bind(db))
const dbAll = promisify(db.all.bind(db))

export const initDatabase = async () => {
  // Users table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      student_number TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Add role column if it doesn't exist
  await dbRun(`
    ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'
  `).catch(() => {
    // Column already exists, ignore error
  })

  // News table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Events table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date DATETIME NOT NULL,
      location TEXT,
      author TEXT NOT NULL,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Announcements table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      author TEXT NOT NULL,
      user_id INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Add status column if it doesn't exist
  await dbRun(`
    ALTER TABLE announcements ADD COLUMN status TEXT DEFAULT 'pending'
  `).catch(() => {
    // Column already exists, ignore error
  })

  // QA table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS qa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT,
      author TEXT NOT NULL,
      user_id INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Add status column if it doesn't exist
  await dbRun(`
    ALTER TABLE qa ADD COLUMN status TEXT DEFAULT 'pending'
  `).catch(() => {
    // Column already exists, ignore error
  })

  // Notes table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      course_name TEXT,
      file_url TEXT,
      author TEXT NOT NULL,
      user_id INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Add status column if it doesn't exist
  await dbRun(`
    ALTER TABLE notes ADD COLUMN status TEXT DEFAULT 'pending'
  `).catch(() => {
    // Column already exists, ignore error
  })

  // Contact messages table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Update existing announcements and qa to approved
  await dbRun(`
    UPDATE announcements SET status = 'approved' WHERE status IS NULL OR status = ''
  `).catch(() => {})
  
  await dbRun(`
    UPDATE qa SET status = 'approved' WHERE status IS NULL OR status = ''
  `).catch(() => {})
  
  await dbRun(`
    UPDATE notes SET status = 'approved' WHERE status IS NULL OR status = ''
  `).catch(() => {})

  // Create or update admin user
  const adminPassword = 'Qrtes s d s 17891917%'
  const adminCheck = await dbGet("SELECT * FROM users WHERE email = 'serdarulasbudak@gmail.com'")
  if (!adminCheck) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await dbRun(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      ['Ulaş/Admin', 'serdarulasbudak@gmail.com', hashedPassword, 'admin']
    )
    console.log('✅ Default admin user created: serdarulasbudak@gmail.com')
  } else {
    // Update admin password and name
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await dbRun(
      "UPDATE users SET name = ?, password = ? WHERE email = ? AND role = 'admin'",
      ['Ulaş/Admin', hashedPassword, 'serdarulasbudak@gmail.com']
    )
    console.log('✅ Admin password and name updated')
  }
  
  // Update existing admin user email if exists
  const oldAdminCheck = await dbGet("SELECT * FROM users WHERE email = 'admin@iuc.edu.tr'")
  if (oldAdminCheck && oldAdminCheck.role === 'admin') {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await dbRun(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE email = ?",
      ['Ulaş/Admin', 'serdarulasbudak@gmail.com', hashedPassword, 'admin@iuc.edu.tr']
    )
    console.log('✅ Admin name, email and password updated')
  }

  // Insert sample data
  db.get('SELECT COUNT(*) as count FROM news', (err, row) => {
    if (err) {
      console.error('Error checking news count:', err)
      return
    }
    if (row && row.count === 0) {
      db.run(`
        INSERT INTO news (title, content, author) VALUES
        ('ÖSYM 2025 Tercih Kılavuzu ve Kontenjanlar Yayınlandı', '2025 yılı tercih kılavuzu ve kontenjan bilgileri yayınlandı.', 'İUC Kampüs'),
        ('İUC Tanıtım Günleri 2025', 'Üniversitemizin tanıtım günleri düzenlenecektir.', 'İUC Kampüs'),
        ('İstanbul Üniversitesi-Cerrahpaşa Taban Puanları ve Başarı Sıralamaları 2025', '2025 yılı taban puanları ve başarı sıralamaları yayınlandı.', 'İUC Kampüs')
      `, (err) => {
        if (err) console.error('Error inserting news:', err)
      })
    }
  })

  db.get('SELECT COUNT(*) as count FROM events', (err, row) => {
    if (err) {
      console.error('Error checking events count:', err)
      return
    }
    if (row && row.count === 0) {
      const eventDate = new Date()
      eventDate.setDate(eventDate.getDate() + 30)
      db.run(`
        INSERT INTO events (title, description, date, location, author) VALUES
        ('İUC Tanıtım Günleri 2025', 'Üniversitemizin tanıtım günleri düzenlenecektir.', ?, 'Merkez Kampüs', 'İUC Kampüs'),
        ('İUC Bahar Şenlikleri: İUC Fest 2025', 'Bahar şenlikleri kapsamında çeşitli etkinlikler düzenlenecektir.', ?, 'Merkez Kampüs', 'İUC Kampüs')
      `, [eventDate.toISOString(), eventDate.toISOString()], (err) => {
        if (err) console.error('Error inserting events:', err)
      })
    }
  })

  db.get('SELECT COUNT(*) as count FROM announcements', (err, row) => {
    if (err) {
      console.error('Error checking announcements count:', err)
      return
    }
    if (row && row.count === 0) {
      db.run(`
        INSERT INTO announcements (title, description, author) VALUES
        ('Kadın Ev Arkadaşı Arıyorum', 'Merter''deki evime kadın ev arkadaşı arıyorum.', 'Melis Malkoç'),
        ('Bakırköy Sahilde 2+1 Ev', 'Bakırköy sahilde 2+1 ev arkadaşı arıyorum.', 'Derin Tekin'),
        ('Erkek ev arkadaşı', 'Kadıköy''deki evime erkek ev arkadaşı arıyorum.', 'Hamza Kaya')
      `, (err) => {
        if (err) console.error('Error inserting announcements:', err)
      })
    }
  })

  db.get('SELECT COUNT(*) as count FROM qa', (err, row) => {
    if (err) {
      console.error('Error checking qa count:', err)
      return
    }
    if (row && row.count === 0) {
      db.run(`
        INSERT INTO qa (question, author) VALUES
        ('Otopark abonelik', 'dbydb'),
        ('Merkezi Yatay Geçiş Ders Saydırma Hakkında', 'Doguhan Akdemir'),
        ('Yaz okulu', 'Mihriban Akbaş')
      `, (err) => {
        if (err) console.error('Error inserting qa:', err)
      })
    }
  })

  console.log('✅ Database initialized')
}

// Export dbRun as a wrapper that returns lastID
export const dbRun = (query, params, callback) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        reject(err)
        if (callback) callback(err)
      } else {
        resolve({ lastID: this.lastID, changes: this.changes })
        if (callback) callback(null, { lastID: this.lastID, changes: this.changes })
      }
    })
  })
}

export { db, dbGet, dbAll }

