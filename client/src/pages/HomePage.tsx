import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/axios'
import { getActiveCompetitionsCount, competitions } from '../utils/competitions'
import NewsSection from '../components/NewsSection'
import EventsSection from '../components/EventsSection'
import AnnouncementsSection from '../components/AnnouncementsSection'
import QASection from '../components/QASection'

interface Stats {
  users: number
  announcements: number
  qa: number
  events: number
  competitions: number
}

const HomePage = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    announcements: 0,
    qa: 0,
    events: 0,
    competitions: 0,
  })
  const [displayStats, setDisplayStats] = useState<Stats>({
    users: 0,
    announcements: 0,
    qa: 0,
    events: 0,
    competitions: 0,
  })

  useEffect(() => {
    fetchStats()
    
    // Her 30 saniyede bir stats'ı güncelle
    const interval = setInterval(() => {
      fetchStats()
    }, 30000) // 30 saniye

    // Sayfa görünür olduğunda da güncelle (kullanıcı başka sekmeden döndüğünde)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStats()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    // Animate numbers
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    const timers: ReturnType<typeof setInterval>[] = []

    const animate = (key: keyof Stats) => {
      const target = stats[key]
      const start = displayStats[key]
      if (target === start) return

      const increment = (target - start) / steps
      let current = start
      let step = 0

      const timer = setInterval(() => {
        step++
        current += increment
        if (step >= steps) {
          current = target
          clearInterval(timer)
        }
        setDisplayStats((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, stepDuration)
      
      timers.push(timer)
    }

    Object.keys(stats).forEach((key) => {
      animate(key as keyof Stats)
    })

    return () => {
      timers.forEach((timer) => clearInterval(timer))
    }
  }, [stats])

  const fetchStats = async () => {
    try {
      const response = await api.get('/stats')
      console.log('Stats response:', response.data) // Debug için
      const activeCompetitions = getActiveCompetitionsCount(competitions)
      const newStats = {
        users: response.data?.users || 0,
        announcements: response.data?.announcements || 0,
        qa: response.data?.qa || 0,
        events: response.data?.events || 0,
        competitions: activeCompetitions,
      }
      console.log('Setting stats:', newStats) // Debug için
      setStats(newStats)
    } catch (error: any) {
      console.error('Error fetching statistics:', error)
      console.error('Error details:', error.response?.data || error.message)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k+`
    }
    return `${num}+`
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-4 tracking-wide"
              style={{
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                color: '#ffffff',
                textShadow: `
                  2px 2px 4px rgba(0,0,0,0.3),
                  4px 4px 8px rgba(0,0,0,0.2),
                  6px 6px 12px rgba(0,0,0,0.15)
                `,
                letterSpacing: '0.1em',
                fontWeight: 700
              }}
            >
              İUC KAMPÜS
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 font-light">
              İstanbul Üniversitesi-Cerrahpaşa Öğrenci & Mezun Platformu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/register"
                className="px-6 py-3 bg-white text-primary-600 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Hemen Kayıt Ol
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-primary-700 text-white rounded-md font-semibold hover:bg-primary-800 transition-colors border border-primary-500"
              >
                Giriş Yap
              </Link>
            </div>
            
            {/* Sosyal Medya */}
            <div className="flex justify-center items-center gap-6">
              <span className="text-white/80 text-sm font-medium">Bizi Takip Edin:</span>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/iuckampuscom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  title="Instagram"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/iuckampus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  title="Twitter / X"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <NewsSection limit={5} />
            <AnnouncementsSection limit={5} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <EventsSection limit={3} />
            <QASection limit={5} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatNumber(displayStats.users)}
              </div>
              <div className="text-gray-600 text-sm">Aktif Kullanıcı</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatNumber(displayStats.announcements)}
              </div>
              <div className="text-gray-600 text-sm">İlan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatNumber(displayStats.qa)}
              </div>
              <div className="text-gray-600 text-sm">Soru-Cevap</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatNumber(displayStats.events)}
              </div>
              <div className="text-gray-600 text-sm">Etkinlik</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatNumber(displayStats.competitions)}
              </div>
              <div className="text-gray-600 text-sm">Aktif Yarışma</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sosyal Ağ</h3>
              <p className="text-gray-600 text-sm">
                İhtiyaçlara çözüm sunan İUC Kampüs, öğrencilere özel sosyal ağ olarak hizmet vermektedir.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Yasal Bilgilendirme</h3>
              <p className="text-gray-600 text-sm">
                5651 sayılı kanuna göre yer sağlayıcı olarak hizmet vermektedir.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">İletişim</h3>
              <p className="text-gray-600 text-sm mb-3">
                İUC öğrencileri ve mezunları tarafından yönetilmektedir.
                <br />
                <span className="font-semibold text-primary-600">Email: info@iuckampus.com</span>
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="https://www.instagram.com/iuckampuscom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                  title="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/iuckampus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                  title="Twitter / X"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

