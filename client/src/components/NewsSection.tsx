import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface News {
  id: number
  title: string
  content: string
  author: string
  created_at: string
}

interface NewsSectionProps {
  limit?: number
}

const NewsSection = ({ limit = 10 }: NewsSectionProps) => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await axios.get(`/api/news?limit=${limit}`)
      setNews(response.data)
    } catch (error) {
      console.error('Error fetching news:', error)
      // Mock data for development
      setNews([
        {
          id: 1,
          title: 'ÖSYM 2025 Tercih Kılavuzu ve Kontenjanlar Yayınlandı',
          content: '2025 yılı tercih kılavuzu ve kontenjan bilgileri yayınlandı.',
          author: 'İUC Kampüs',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'İUC Tanıtım Günleri 2025',
          content: 'Üniversitemizin tanıtım günleri düzenlenecektir.',
          author: 'İUC Kampüs',
          created_at: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Haber & Duyurular</h2>
        <Link
          to="/news"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Tümü →
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
      ) : news.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Henüz haber bulunmamaktadır.</div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="border-b pb-4 last:border-0">
              <Link
                to={`/news/${item.id}`}
                className="block hover:text-primary-600 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
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

export default NewsSection

