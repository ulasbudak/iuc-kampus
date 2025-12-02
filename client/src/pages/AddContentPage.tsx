import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const AddContentPage = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [contentType, setContentType] = useState<'announcement' | 'qa' | 'note'>('announcement')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    question: '',
    courseName: '',
    fileUrl: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (contentType === 'announcement') {
        if (!formData.title || !formData.description) {
          setError('Başlık ve açıklama alanları zorunludur')
          setLoading(false)
          return
        }
        await axios.post('/api/announcements', {
          title: formData.title,
          description: formData.description,
          author: user?.name,
        })
        alert('İlanınız başarıyla oluşturuldu. Admin onayından sonra yayınlanacaktır.')
        navigate('/announcements')
      } else if (contentType === 'qa') {
        if (!formData.question) {
          setError('Soru alanı zorunludur')
          setLoading(false)
          return
        }
        await axios.post('/api/qa', {
          question: formData.question,
          author: user?.name,
        })
        alert('Sorunuz başarıyla oluşturuldu. Admin onayından sonra yayınlanacaktır.')
        navigate('/qa')
      } else {
        if (!formData.title || !formData.description) {
          setError('Başlık ve açıklama alanları zorunludur')
          setLoading(false)
          return
        }
        await axios.post('/api/notes', {
          title: formData.title,
          description: formData.description,
          courseName: formData.courseName,
          fileUrl: formData.fileUrl,
          author: user?.name,
        })
        alert('Ders notunuz başarıyla oluşturuldu. Admin onayından sonra yayınlanacaktır.')
        navigate('/notes')
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'İçerik eklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Yeni İçerik Ekle</h1>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Content Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              İçerik Türü
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setContentType('announcement')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  contentType === 'announcement'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                İlan
              </button>
              <button
                type="button"
                onClick={() => setContentType('qa')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  contentType === 'qa'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Soru
              </button>
              <button
                type="button"
                onClick={() => setContentType('note')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  contentType === 'note'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ders Notu
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {contentType === 'announcement' ? (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="İlan başlığı"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Açıklama
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="İlan açıklaması"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </>
            ) : contentType === 'qa' ? (
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Soru
                </label>
                <textarea
                  id="question"
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sorunuzu yazın"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ders notu başlığı"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ders Adı
                  </label>
                  <input
                    id="courseName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Örn: Matematik, Fizik, Kimya"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Açıklama
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ders notu açıklaması"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Dosya Linki (Opsiyonel)
                  </label>
                  <input
                    id="fileUrl"
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Google Drive, Dropbox veya başka bir dosya paylaşım servisi linki
                  </p>
                </div>
              </>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Ekleniyor...' : 'Yayınla'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddContentPage

