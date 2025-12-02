import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'

interface Scholarship {
  id: number
  title: string
  organization: string
  date: string
  description?: string
}

const ScholarshipsPage = () => {
  const scholarships: Scholarship[] = [
    {
      id: 1,
      title: 'KYK Burs Kredi Başvuruları Başladı!',
      organization: 'Kredi ve Yurtlar Kurumu',
      date: '2024-10-08',
      description: 'KYK burs ve kredi başvuruları başlamıştır. Başvurular için resmi KYK web sitesini ziyaret ediniz.',
    },
    {
      id: 2,
      title: 'Yaşar Eğitim ve Kültür Vakfı Burs Başvurusu 2024',
      organization: 'Yaşar Eğitim ve Kültür Vakfı',
      date: '2024-10-01',
    },
    {
      id: 3,
      title: 'EGET Vakfı Burs Başvurusu 2024',
      organization: 'EGET Vakfı',
      date: '2024-10-01',
    },
    {
      id: 4,
      title: '1884 Vakfı Burs Başvurusu 2024',
      organization: '1884 Vakfı',
      date: '2024-09-30',
    },
    {
      id: 5,
      title: 'Türk Petrol Vakfı Burs Başvurusu 2024',
      organization: 'Türk Petrol Vakfı',
      date: '2024-09-30',
    },
    {
      id: 6,
      title: 'Esenler Belediyesi Burs Başvurusu 2024',
      organization: 'Esenler Belediyesi',
      date: '2024-09-30',
    },
    {
      id: 7,
      title: 'İstanbul Ticaret Odası İTO Burs Başvurusu 2024',
      organization: 'İstanbul Ticaret Odası',
      date: '2024-09-30',
    },
    {
      id: 8,
      title: 'Tekfen Vakfı Burs Başvurusu 2024',
      organization: 'Tekfen Vakfı',
      date: '2024-09-27',
    },
    {
      id: 9,
      title: 'İstanbul Büyükşehir Belediyesi İBB Burs Başvurusu 2024',
      organization: 'İstanbul Büyükşehir Belediyesi',
      date: '2024-09-25',
    },
    {
      id: 10,
      title: 'Borusan Kocabıyık Vakfı Burs Başvurusu 2024',
      organization: 'Borusan Kocabıyık Vakfı',
      date: '2024-09-24',
    },
  ]

  const sortedScholarships = [...scholarships].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Burs Haberleri</h1>

        {/* Burs İlanları */}
        {sortedScholarships.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <p className="text-lg text-gray-700">Henüz burs ilanı bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
                        Burs Haberleri
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(scholarship.date), 'd MMMM yyyy', { locale: tr })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{scholarship.title}</h3>
                    <p className="text-gray-600 font-medium mb-2">{scholarship.organization}</p>
                    {scholarship.description && (
                      <p className="text-gray-700 text-sm">{scholarship.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.ytukampus.com/burs/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors whitespace-nowrap"
                    >
                      Detaylı Bilgi
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ScholarshipsPage
