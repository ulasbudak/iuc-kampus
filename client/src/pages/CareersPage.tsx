import { useState } from 'react'
import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'

interface JobPosting {
  id: number
  company: string
  position: string
  type: 'İş İlanları' | 'Staj İlanları'
  date: string
  description?: string
}

const CareersPage = () => {
  const [selectedType, setSelectedType] = useState<string>('Tümü')

  const jobPostings: JobPosting[] = [
    {
      id: 1,
      company: 'DÖHLER',
      position: 'Supply Chain – Long Term Intern',
      type: 'Staj İlanları',
      date: '2025-06-10',
    },
    {
      id: 2,
      company: 'Medical Center Turkey',
      position: 'Video Prodüksiyon Uzmanı (Freelance)',
      type: 'İş İlanları',
      date: '2025-05-31',
    },
    {
      id: 3,
      company: 'Medical Center Turkey',
      position: 'Dijital Pazarlama Stajyeri',
      type: 'Staj İlanları',
      date: '2025-05-27',
    },
    {
      id: 4,
      company: 'SEKTÖREL HABER MERKEZİ',
      position: 'Müşteri Hizmetleri Temsilcisi',
      type: 'İş İlanları',
      date: '2025-05-20',
    },
    {
      id: 5,
      company: 'FES GAYRİMENLUK DANIŞMANLIK',
      position: 'Sosyal Medya Asistanı',
      type: 'İş İlanları',
      date: '2025-05-20',
    },
    {
      id: 6,
      company: 'NOP.digital',
      position: 'Grafik Tasarım Uzmanı',
      type: 'İş İlanları',
      date: '2025-05-20',
    },
    {
      id: 7,
      company: 'BAT Türkiye',
      position: 'Global Graduate in HR',
      type: 'İş İlanları',
      date: '2025-04-15',
    },
    {
      id: 8,
      company: 'BAT Türkiye',
      position: 'Global Graduate in Marketing',
      type: 'İş İlanları',
      date: '2025-04-15',
    },
    {
      id: 9,
      company: 'BAT Türkiye',
      position: 'Global Graduate in Procurement',
      type: 'İş İlanları',
      date: '2025-04-15',
    },
  ]

  const filteredJobs = selectedType === 'Tümü' 
    ? jobPostings 
    : jobPostings.filter(job => job.type === selectedType)

  const sortedJobs = [...filteredJobs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Kariyer & Staj İlanları</h1>

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('Tümü')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedType === 'Tümü'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setSelectedType('İş İlanları')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedType === 'İş İlanları'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              İş İlanları
            </button>
            <button
              onClick={() => setSelectedType('Staj İlanları')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedType === 'Staj İlanları'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Staj İlanları
            </button>
          </div>
        </div>

        {/* İlanlar */}
        {sortedJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💼</div>
            <p className="text-lg text-gray-700">Seçilen kategoride ilan bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded ${
                          job.type === 'İş İlanları'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {job.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(job.date), 'd MMMM yyyy', { locale: tr })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.position}</h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.ytukampus.com/kariyer/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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

export default CareersPage
