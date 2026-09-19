import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import { promisify } from 'util'

const db = new sqlite3.Database('./database.db')
const dbGet = promisify(db.get.bind(db))
const dbRun = promisify(db.run.bind(db))

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('❌ Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before running this script.')
    process.exit(1)
  }

  try {
    const adminCheck = await dbGet("SELECT * FROM users WHERE email = ?", [email])

    if (adminCheck) {
      const hashedPassword = await bcrypt.hash(password, 10)
      await dbRun(
        "UPDATE users SET password = ?, role = ? WHERE email = ?",
        [hashedPassword, 'admin', email]
      )
      console.log(`✅ Admin şifresi güncellendi: ${email}`)
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      await dbRun(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        ['Admin', email, hashedPassword, 'admin']
      )
      console.log(`✅ Admin kullanıcısı oluşturuldu: ${email}`)
    }

    console.log('✅ Admin hazır!')

    db.close()
  } catch (error) {
    console.error('❌ Hata:', error)
    db.close()
    process.exit(1)
  }
}

createAdmin()
