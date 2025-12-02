import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'

interface Content {
  id: number
  title?: string
  question?: string
  description?: string
  answer?: string
  course_name?: string
  file_url?: string
  author: string
  created_at: string
  type: 'announcement' | 'qa' | 'note'
}

const MyContentPage = () => {
  const { user, isAuthenticated } = useAuth()
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    fetchMyContent()
  }, [])

  const fetchMyContent = async () => {
    try {
      const [announcementsRes, qaRes, notesRes] = await Promise.all([
        axios.get('/api/announcements?admin=true'),
        axios.get('/api/qa?admin=true'),
        axios.get('/api/notes?admin=true'),
      ])

      const myAnnouncements = (announcementsRes.data || [])
        .filter((item: any) => item.author === user?.name)
        .map((item: any) => ({ ...item, type: 'announcement' as const }))

      const myQA = (qaRes.data || [])
        .filter((item: any) => item.author === user?.name)
        .map((item: any) => ({ ...item, type: 'qa' as const }))

      const myNotes = (notesRes.data || [])
        .filter((item: any) => item.author === user?.name)
        .map((item: any) => ({ ...item, type: 'note' as const }))

      setContents([...myAnnouncements, ...myQA, ...myNotes].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ))
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, type: 'announcement' | 'qa' | 'note') => {
    if (!confirm('Bu içeriği silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const endpoint = type === 'announcement' ? 'announcements' : type === 'qa' ? 'qa' : 'notes'
      await axios.delete(`/api/${endpoint}/${id}`)
      fetchMyContent()
    } catch (error) {
      console.error('Error deleting content:', error)
      alert('İçerik silinirken bir hata oluştu')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">İçeriklerim</h1>
          <Link
            to="/add-content"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Yeni İçerik Ekle
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
        ) : contents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-lg text-gray-700 mb-6">Henüz içerik eklemediniz.</p>
            <Link
              to="/add-content"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              İlk İçeriğinizi Ekleyin
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {contents.map((content) => (
              <div
                key={`${content.type}-${content.id}`}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          content.type === 'announcement'
                            ? 'bg-blue-100 text-blue-800'
                            : content.type === 'qa'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {content.type === 'announcement' ? 'İlan' : content.type === 'qa' ? 'Soru' : 'Ders Notu'}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          (content as any).status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : (content as any).status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {(content as any).status === 'approved'
                          ? 'Onaylandı'
                          : (content as any).status === 'rejected'
                          ? 'Reddedildi'
                          : 'Onay Bekliyor'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(content.created_at), 'd MMMM yyyy', { locale: tr })}
                      </span>
                    </div>
                    {content.type === 'announcement' ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {content.title}
                        </h3>
                        <p className="text-gray-700 line-clamp-2">{content.description}</p>
                      </>
                    ) : content.type === 'qa' ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {content.question}
                        </h3>
                        {content.answer && (
                          <p className="text-gray-700 line-clamp-2">
                            <strong>Cevap:</strong> {content.answer}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {content.title}
                        </h3>
                        {content.course_name && (
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 mb-2">
                            {content.course_name}
                          </span>
                        )}
                        <p className="text-gray-700 line-clamp-2">{content.description}</p>
                        {content.file_url && (
                          <a
                            href={content.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                          >
                            Dosya Linki →
                          </a>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(content.id, content.type)}
                    className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                    title="Sil"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyContentPage

