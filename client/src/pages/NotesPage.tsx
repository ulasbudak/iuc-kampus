import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'

interface Note {
  id: number
  title: string
  description: string
  course_name?: string
  file_url?: string
  author: string
  created_at: string
}

const NotesPage = () => {
  const { isAuthenticated } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes')
      setNotes(response.data || [])
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ders Notları</h1>
          {isAuthenticated && (
            <Link
              to="/add-content"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ders Notu Ekle
            </Link>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-lg text-gray-700 mb-6">
              {isAuthenticated
                ? 'Henüz ders notu eklenmemiş. İlk ders notunu eklemek için giriş yapın.'
                : 'Henüz ders notu bulunmamaktadır.'}
            </p>
            {isAuthenticated ? (
              <Link
                to="/add-content"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ders Notu Ekle
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{note.title}</h3>
                </div>
                {note.course_name && (
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                      {note.course_name}
                    </span>
                  </div>
                )}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{note.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{note.author}</span>
                  <span>{format(new Date(note.created_at), 'd MMMM yyyy', { locale: tr })}</span>
                </div>
                {note.file_url && (
                  <a
                    href={note.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Dosyayı Görüntüle
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotesPage
