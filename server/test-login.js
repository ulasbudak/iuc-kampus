import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import { promisify } from 'util'

const db = new sqlite3.Database('./database.db')
const dbGet = promisify(db.get.bind(db))
const dbRun = promisify(db.run.bind(db))

async function testLogin() {
  try {
    const email = 'serdarulasbudak@gmail.com'
    const password = 'Qrtes s d s 17891917%'
    
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email])
    
    if (!user) {
      console.log('❌ Kullanıcı bulunamadı')
      db.close()
      return
    }
    
    console.log('✅ Kullanıcı bulundu:', user.email)
    console.log('   Role:', user.role)
    console.log('   Password hash:', user.password.substring(0, 30) + '...')
    
    const isValid = await bcrypt.compare(password, user.password)
    console.log('   Şifre kontrolü:', isValid ? '✅ Doğru' : '❌ Yanlış')
    
    if (!isValid) {
      console.log('\n🔄 Şifreyi güncelliyorum...')
      const newHash = await bcrypt.hash(password, 10)
      await dbRun(
        'UPDATE users SET password = ? WHERE email = ?',
        [newHash, email]
      )
      console.log('✅ Şifre güncellendi')
      
      // Tekrar test et
      const updatedUser = await dbGet('SELECT * FROM users WHERE email = ?', [email])
      const isValidAfter = await bcrypt.compare(password, updatedUser.password)
      console.log('   Yeni şifre kontrolü:', isValidAfter ? '✅ Doğru' : '❌ Yanlış')
    }
    
    db.close()
  } catch (error) {
    console.error('❌ Hata:', error)
    db.close()
  }
}

testLogin()

