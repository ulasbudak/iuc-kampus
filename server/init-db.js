import { initDatabase } from './database.js'

async function initialize() {
  try {
    await initDatabase()
    console.log('✅ Database başarıyla initialize edildi')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database initialize hatası:', error)
    process.exit(1)
  }
}

initialize()

