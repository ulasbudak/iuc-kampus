import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import './index.css'

console.log('🚀 İUC Kampüs başlatılıyor...')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('❌ Root element bulunamadı!')
} else {
  console.log('✅ Root element bulundu, render başlıyor...')
  try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  )
    console.log('✅ İUC Kampüs başarıyla başlatıldı!')
  } catch (error) {
    console.error('❌ Render hatası:', error)
  }
}

