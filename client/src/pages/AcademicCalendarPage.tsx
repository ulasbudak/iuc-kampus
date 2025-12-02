import { Link } from 'react-router-dom'

const AcademicCalendarPage = () => {
  const calendars = [
    {
      category: 'Ön Lisans-Lisans',
      items: [
        {
          title: '2025-2026 Eğitim-Öğretim Yılı Ön Lisans-Lisans Özet Akademik Takvim',
          link: '/academic-calendar/summary',
        },
        {
          title: '2025-2026 Eğitim-Öğretim Yılı Ön Lisans-Lisans Sınav Takvimi',
          link: '/academic-calendar/detailed',
        },
      ],
    },
    {
      category: 'Fakülteler',
      items: [
        {
          title: '2025-2026 Eğitim-Öğretim Yılı Cerrahpaşa Tıp Fakültesi Akademik Takvimi',
          link: '/academic-calendar/medicine',
        },
        {
          title: '2025-2026 Eğitim-Öğretim Yılı Diş Hekimliği Fakültesi Akademik Takvimi',
          link: '/academic-calendar/dentistry',
        },
        {
          title: '2025-2026 Eğitim-Öğretim Yılı Eczacılık Fakültesi Akademik Takvimi',
          link: '/academic-calendar/pharmacy',
        },
        {
          title: '2025-2026 Eğitim-Öğretim Yılı Florence Nightingale Hemşirelik Fakültesi Akademik Takvimi',
          link: '/academic-calendar/nursing',
        },
        {
          title: '2025-2026 Eğitim-Öğretim Yılı Veteriner Fakültesi Akademik Takvimi',
          link: '/academic-calendar/veterinary',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📅 Akademik Takvim</h1>
          <p className="text-gray-600">2025-2026 Eğitim-Öğretim Yılı Akademik Takvimleri</p>
        </div>

        <div className="space-y-8">
          {calendars.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-primary-600 mb-6 border-b border-gray-200 pb-3">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.link}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-gray-800 group-hover:text-primary-700 flex-1">
                        {item.title}
                      </p>
                      <span className="text-primary-600 font-semibold ml-4 group-hover:text-primary-700">
                        TIKLAYINIZ →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">📌 Not</h3>
          <p className="text-sm text-gray-700">
            Akademik takvimler güncellenebilir. Güncel bilgiler için ilgili fakülte veya birimlerle iletişime geçiniz.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AcademicCalendarPage

