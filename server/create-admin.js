import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import { promisify } from 'util'

const db = new sqlite3.Database('./database.db')
const dbGet = promisify(db.get.bind(db))
const dbRun = promisify(db.run.bind(db))

async function createAdmin() {
  try {
    // Check if admin exists
    const adminCheck = await dbGet("SELECT * FROM users WHERE email = ?", ['serdarulasbudak@gmail.com'])
    
    if (adminCheck) {
      // Update existing admin password and name
      const hashedPassword = await bcrypt.hash('Qrtes s d s 17891917%', 10)
      await dbRun(
        "UPDATE users SET name = ?, password = ?, role = ? WHERE email = ?",
        ['Ulaş/Admin', hashedPassword, 'admin', 'serdarulasbudak@gmail.com']
      )
      console.log('✅ Admin şifresi ve ismi güncellendi: serdarulasbudak@gmail.com')
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash('Qrtes s d s 17891917%', 10)
      await dbRun(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        ['Ulaş/Admin', 'serdarulasbudak@gmail.com', hashedPassword, 'admin']
      )
      console.log('✅ Admin kullanıcısı oluşturuldu: serdarulasbudak@gmail.com')
    }
    
    console.log('✅ Admin hazır!')
    console.log('   Email: serdarulasbudak@gmail.com')
    console.log('   Şifre: Qrtes s d s 17891917%')
    
    db.close()
  } catch (error) {
    console.error('❌ Hata:', error)
    db.close()
    process.exit(1)
  }
}

createAdmin()

