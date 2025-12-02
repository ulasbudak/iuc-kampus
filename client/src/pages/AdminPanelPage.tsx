import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'

interface PendingContent {
  id: number
  title?: string
  question?: string
  description?: string
  course_name?: string
  file_url?: string
  author: string
  created_at: string
  type: 'announcement' | 'qa' | 'note'
}

interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  read: number
  created_at: string
}

const AdminPanelPage = () => {
  const { isAuthenticated, isAdmin } = useAuth()
  const [pendingAnnouncements, setPendingAnnouncements] = useState<PendingContent[]>([])
  const [pendingQA, setPendingQA] = useState<PendingContent[]>([])
  const [pendingNotes, setPendingNotes] = useState<PendingContent[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'announcements' | 'qa' | 'notes' | 'contact'>('announcements')

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />
  }

  useEffect(() => {
    fetchPendingContent()
  }, [])

  const fetchPendingContent = async () => {
    try {
      const [announcementsRes, qaRes, notesRes, contactRes] = await Promise.all([
        axios.get('/api/announcements/pending'),
        axios.get('/api/qa/pending'),
        axios.get('/api/notes/pending'),
        axios.get('/api/contact'),
      ])

      setPendingAnnouncements(
        (announcementsRes.data || []).map((item: any) => ({
          ...item,
          type: 'announcement' as const,
        }))
      )

      setPendingQA(
        (qaRes.data || []).map((item: any) => ({
          ...item,
          type: 'qa' as const,
        }))
      )

      setPendingNotes(
        (notesRes.data || []).map((item: any) => ({
          ...item,
          type: 'note' as const,
        }))
      )

      setContactMessages(contactRes.data || [])
    } catch (error) {
      console.error('Error fetching pending content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: number, type: 'announcement' | 'qa' | 'note') => {
    try {
      const endpoint = type === 'announcement' ? 'announcements' : type === 'qa' ? 'qa' : 'notes'
      await axios.post(`/api/${endpoint}/${id}/approve`)
      fetchPendingContent()
    } catch (error) {
      console.error('Error approving content:', error)
      alert('Onaylama sırasında bir hata oluştu')
    }
  }

  const handleReject = async (id: number, type: 'announcement' | 'qa' | 'note') => {
    if (!confirm('Bu içeriği reddetmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const endpoint = type === 'announcement' ? 'announcements' : type === 'qa' ? 'qa' : 'notes'
      await axios.post(`/api/${endpoint}/${id}/reject`)
      fetchPendingContent()
    } catch (error) {
      console.error('Error rejecting content:', error)
      alert('Reddetme sırasında bir hata oluştu')
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await axios.post(`/api/contact/${id}/read`)
      fetchPendingContent()
    } catch (error) {
      console.error('Error marking message as read:', error)
      alert('Mesaj işaretlenirken bir hata oluştu')
    }
  }

  const handleDeleteMessage = async (id: number) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      await axios.delete(`/api/contact/${id}`)
      fetchPendingContent()
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Mesaj silinirken bir hata oluştu')
    }
  }

  const unreadCount = contactMessages.filter((msg) => msg.read === 0).length

  const pendingContent = 
    activeTab === 'announcements' 
      ? pendingAnnouncements 
      : activeTab === 'qa' 
      ? pendingQA 
      : pendingNotes

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
          <p className="text-gray-600 mt-2">Onay bekleyen içerikleri yönetin</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'announcements'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              İlanlar ({pendingAnnouncements.length})
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'qa'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sorular ({pendingQA.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'notes'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ders Notları ({pendingNotes.length})
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              İletişim Mesajları ({unreadCount > 0 && `(${unreadCount} yeni)`})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
        ) : activeTab === 'contact' ? (
          contactMessages.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-lg text-gray-700">Henüz iletişim mesajı bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contactMessages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white rounded-lg shadow-md p-6 ${message.read === 0 ? 'border-l-4 border-blue-600' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {message.read === 0 && (
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                            Yeni
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {format(new Date(message.created_at), 'd MMMM yyyy HH:mm', {
                            locale: tr,
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {message.subject}
                      </h3>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          <strong>Gönderen:</strong> {message.name} ({message.email})
                        </p>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    {message.read === 0 && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Okundu İşaretle
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : pendingContent.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-lg text-gray-700">
              Onay bekleyen {activeTab === 'announcements' ? 'ilan' : activeTab === 'qa' ? 'soru' : 'ders notu'} bulunmamaktadır.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingContent.map((content) => (
              <div
                key={`${content.type}-${content.id}`}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
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
                      <span className="text-sm text-gray-500">
                        {format(new Date(content.created_at), 'd MMMM yyyy HH:mm', {
                          locale: tr,
                        })}
                      </span>
                    </div>
                    {content.type === 'announcement' ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {content.title}
                        </h3>
                        <p className="text-gray-700">{content.description}</p>
                      </>
                    ) : content.type === 'qa' ? (
                      <h3 className="text-lg font-semibold text-gray-900">{content.question}</h3>
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
                        <p className="text-gray-700 mb-2">{content.description}</p>
                        {content.file_url && (
                          <a
                            href={content.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Dosya Linki →
                          </a>
                        )}
                      </>
                    )}
                    <p className="text-sm text-gray-500 mt-2">Yazar: {content.author}</p>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(content.id, content.type)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Onayla
                  </button>
                  <button
                    onClick={() => handleReject(content.id, content.type)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Reddet
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

export default AdminPanelPage

