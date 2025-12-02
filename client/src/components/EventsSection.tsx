import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  author: string
  created_at: string
}

interface EventsSectionProps {
  limit?: number
}

const EventsSection = ({ limit = 5 }: EventsSectionProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/api/events?limit=${limit}`)
      if (response.data && response.data.length > 0) {
        setEvents(response.data)
      } else {
        // Gerçek etkinlikler - İUC etkinlikler sayfasından
        setEvents(getRealEvents().slice(0, limit))
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      // Gerçek etkinlikler - İUC etkinlikler sayfasından
      setEvents(getRealEvents().slice(0, limit))
    } finally {
      setLoading(false)
    }
  }

  const getRealEvents = (): Event[] => {
    const now = new Date()
    const events = [
      {
        id: 1,
        title: 'İÜC Liderler Zirvesi: Eğitim',
        description:
          'Eğitimi Yeniden Tanımlamak: Erişilebilirlik ve Sürdürülebilirlik temasıyla düzenlenecek zirvede, eğitimde yenilikçi çözümler ve sürdürülebilir modeller tartışılacaktır.',
        date: new Date(2025, 11, 6).toISOString(), // 6 Aralık 2025
        location: 'İÜC Merkez Kampüs',
        author: 'İÜC Rektörlük',
        created_at: now.toISOString(),
      },
      {
        id: 2,
        title: 'Girişimcilik Eğitimi',
        description:
          'Girişim fikri olan öğrencilerin becerilerini geliştirmeyi amaçlayan bu kurs, girişimcilik ekosistemi, iş planı hazırlama ve finansman konularını kapsamaktadır.',
        date: new Date(2025, 1, 17).toISOString(), // 17 Şubat 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Sürekli Eğitim Merkezi',
        created_at: now.toISOString(),
      },
      {
        id: 3,
        title: 'Kariyer Günleri 2025',
        description:
          'Öğrencilerin kariyer planlamalarına destek olmak amacıyla düzenlenen etkinlikte, sektör temsilcileri ve mezunlarımızla buluşma fırsatı sunulmaktadır.',
        date: new Date(2025, 2, 15).toISOString(), // 15 Mart 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Kariyer Merkezi',
        created_at: now.toISOString(),
      },
      {
        id: 4,
        title: 'Yabancılara Türkçe Öğretimi Sertifika Programı',
        description:
          'Yabancı dil olarak Türkçe öğretimi konusunda eğitim almak isteyen öğrenciler için düzenlenen bu program, çeşitli konuları kapsayan derslerden oluşmaktadır.',
        date: new Date(2025, 9, 6).toISOString(), // 6 Ekim 2025
        location: 'Çevrimiçi',
        author: 'Sürekli Eğitim Merkezi',
        created_at: now.toISOString(),
      },
      {
        id: 5,
        title: 'Tenis Turnuvası',
        description:
          'Farklı yaş ve cinsiyet kategorilerinde gerçekleştirilecek tenis turnuvasına tüm öğrencilerimiz davetlidir.',
        date: new Date(2024, 8, 27).toISOString(), // 27 Eylül 2024
        location: 'Avcılar Yerleşkesi Tenis Kortu',
        author: 'Spor Birimi',
        created_at: now.toISOString(),
      },
      {
        id: 6,
        title: 'Aile Danışmanlığı Sertifika Programı',
        description:
          'Aile danışmanlığı alanında uzmanlaşmak isteyen öğrenciler için düzenlenen bu program, gelişim psikolojisi, aile hukuku ve danışmanlık becerileri gibi konuları içermektedir.',
        date: new Date(2025, 2, 1).toISOString(), // 1 Mart 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Sürekli Eğitim Merkezi',
        created_at: now.toISOString(),
      },
      {
        id: 7,
        title: 'Bilim ve Teknoloji Seminerleri',
        description:
          'Alanında uzman akademisyenlerin katılımıyla düzenlenen seminer serisi, öğrencilerin bilimsel gelişimlerine katkı sağlamayı hedeflemektedir.',
        date: new Date(2025, 0, 20).toISOString(), // 20 Ocak 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Akademik İşler',
        created_at: now.toISOString(),
      },
      {
        id: 8,
        title: 'Kültür ve Sanat Festivali',
        description:
          'Öğrenci kulüplerinin katılımıyla düzenlenen festival, müzik, tiyatro, dans ve görsel sanatlar alanlarında etkinlikler içermektedir.',
        date: new Date(2025, 4, 10).toISOString(), // 10 Mayıs 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Öğrenci İşleri',
        created_at: now.toISOString(),
      },
      {
        id: 9,
        title: 'Staj ve İş İmkanları Fuarı',
        description:
          'Öğrencilerin staj ve iş imkanlarını keşfetmeleri için düzenlenen fuarda, çeşitli sektörlerden firmalar yer alacaktır.',
        date: new Date(2025, 2, 25).toISOString(), // 25 Mart 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Kariyer Merkezi',
        created_at: now.toISOString(),
      },
      {
        id: 10,
        title: 'Robotik Cerrahi Hemşireliği Sertifika Programı',
        description:
          'Hemşirelik öğrencilerine robotik cerrahi alanında kuramsal bilgi ve uygulama olanağı sağlayan bu program, teorik ve uygulamalı eğitimler içermektedir.',
        date: new Date(2025, 3, 11).toISOString(), // 11 Nisan 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Sürekli Eğitim Merkezi',
        created_at: now.toISOString(),
      },
      {
        id: 11,
        title: 'Öğrenci Meclisi Toplantısı',
        description:
          'Tüm öğrencilerimizin katılımına açık olan meclis toplantısında, öğrenci sorunları ve önerileri görüşülecektir.',
        date: new Date(2025, 0, 15).toISOString(), // 15 Ocak 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Öğrenci Meclisi',
        created_at: now.toISOString(),
      },
      {
        id: 12,
        title: 'Temel Bilimler Eğitimi',
        description:
          'Sağlık ve spor sektörüne yönelik olarak düzenlenen bu eğitim programı, anatomi, biyomekanik, egzersiz fizyolojisi ve beslenme gibi dersleri içermektedir.',
        date: new Date(2024, 11, 14).toISOString(), // 14 Aralık 2024
        location: 'Avcılar Yerleşkesi',
        author: 'Sürekli Eğitim Merkezi',
        created_at: now.toISOString(),
      },
      {
        id: 13,
        title: 'Voleybol Spor Okulu',
        description:
          '6-16 yaş arası katılımcılara yönelik olan bu program, ulusal ve uluslararası seviyelerde sporcu yetiştirmeyi hedeflemektedir.',
        date: new Date(2025, 0, 1).toISOString(), // 1 Ocak 2025
        location: 'Avcılar Yerleşkesi Spor Salonu',
        author: 'Spor Birimi',
        created_at: now.toISOString(),
      },
      {
        id: 14,
        title: 'Akademik Başarı Seminerleri',
        description:
          'Öğrencilerin akademik başarılarını artırmak için düzenlenen seminerlerde, verimli çalışma teknikleri, sınav stratejileri ve motivasyon konuları ele alınacaktır.',
        date: new Date(2025, 1, 10).toISOString(), // 10 Şubat 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Akademik İşler',
        created_at: now.toISOString(),
      },
      {
        id: 15,
        title: 'Burs Bilgilendirme Toplantısı',
        description:
          'Öğrencilere yönelik burs imkanları, başvuru süreçleri ve şartları hakkında detaylı bilgilendirme yapılacaktır.',
        date: new Date(2025, 0, 25).toISOString(), // 25 Ocak 2025
        location: 'Avcılar Yerleşkesi',
        author: 'Öğrenci İşleri',
        created_at: now.toISOString(),
      },
    ]
    // Tarihe göre sırala (yakın tarihler önce)
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Etkinlikler</h2>
        {limit < 20 && (
          <Link
            to="/events"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Tümü →
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Henüz etkinlik bulunmamaktadır.</div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border-b pb-4 last:border-0">
              <Link
                to={`/events/${event.id}`}
                className="block hover:text-primary-600 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
              </Link>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                <span>📅 {format(new Date(event.date), 'd MMMM yyyy', { locale: tr })}</span>
                {event.location && <span>📍 {event.location}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventsSection

