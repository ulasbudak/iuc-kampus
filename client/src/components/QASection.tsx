import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface QA {
  id: number
  question: string
  answer?: string
  author: string
  created_at: string
}

interface QASectionProps {
  limit?: number
}

const QASection = ({ limit = 10 }: QASectionProps) => {
  const [qas, setQas] = useState<QA[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQAs()
  }, [])

  const fetchQAs = async () => {
    try {
      const response = await axios.get(`/api/qa?limit=${limit}`)
      if (response.data && response.data.length > 0) {
        setQas(response.data)
      } else {
        setQas([])
      }
    } catch (error) {
      console.error('Error fetching QAs:', error)
      setQas([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Soru & Cevap</h2>
        {limit < 20 && (
          <Link
            to="/qa"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Tümü →
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
      ) : qas.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">❓</div>
            <p className="text-lg text-gray-700 mb-6">
              Hesabınıza giriş yapıp buraya sorularınızı yazabilir, yazılan sorulara cevap
              yazabilirsiniz.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-iuc-blue text-white rounded-lg font-semibold hover:bg-iuc-blue-dark transition-colors shadow-md hover:shadow-lg"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {qas.map((item) => (
            <div key={item.id} className="border-b pb-4 last:border-0">
              <Link
                to={`/qa/${item.id}`}
                className="block hover:text-primary-600 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{item.question}</h3>
                {item.answer && (
                  <p className="text-sm text-gray-600 line-clamp-2">{item.answer}</p>
                )}
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

export default QASection

