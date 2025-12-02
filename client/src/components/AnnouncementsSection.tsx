import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface Announcement {
  id: number
  title: string
  description: string
  author: string
  created_at: string
}

interface AnnouncementsSectionProps {
  limit?: number
}

const AnnouncementsSection = ({ limit = 10 }: AnnouncementsSectionProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`/api/announcements?limit=${limit}`)
      if (response.data && response.data.length > 0) {
        setAnnouncements(response.data)
      } else {
        setAnnouncements([])
      }
    } catch (error) {
      console.error('Error fetching announcements:', error)
      setAnnouncements([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">İlanlar</h2>
        <Link
          to="/announcements"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Tümü →
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📢</div>
            <p className="text-lg text-gray-700 mb-6">
              Hesap açıp buraya ev arkadaşı vs ilanlarınızı paylaşabilirsiniz
            </p>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-iuc-blue text-white rounded-lg font-semibold hover:bg-iuc-blue-dark transition-colors shadow-md hover:shadow-lg"
            >
              Hesap Aç
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((item) => (
            <div key={item.id} className="border-b pb-4 last:border-0">
              <Link
                to={`/announcements/${item.id}`}
                className="block hover:text-primary-600 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </Link>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>{item.author}</span>
                <span>
                  {format(new Date(item.created_at), 'd MMMM yyyy', { locale: tr })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AnnouncementsSection

