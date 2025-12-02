import { useState } from 'react'
import { competitions } from '../utils/competitions'

const CompetitionsPage = () => {
  const [openCompetition, setOpenCompetition] = useState<number | null>(null)

  const toggleCompetition = (id: number) => {
    setOpenCompetition(openCompetition === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Yarışmalar</h1>

        <div className="space-y-4">
          {competitions.map((competition) => (
            <div
              key={competition.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              {/* Başlık ve Kısa Bilgi */}
              <button
                onClick={() => toggleCompetition(competition.id)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {competition.title}
                    </h2>
                    {competition.subtitle && (
                      <p className="text-sm text-gray-600 mb-2">{competition.subtitle}</p>
                    )}
                    <p className="text-gray-700 mb-3">{competition.shortDescription}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="mr-1">🏢</span>
                        {competition.organizer}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">📅</span>
                        Son Başvuru: {competition.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-gray-500 transition-transform ${
                        openCompetition === competition.id ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Detaylar (Açılır/Kapanır) */}
              {openCompetition === competition.id && (
                <div className="border-t border-gray-200 p-6 space-y-6">
                  {/* Açıklama */}
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Yarışma Hakkında</h3>
                    <p className="text-gray-700 leading-relaxed">{competition.details.description}</p>
                  </section>

                  {/* Takvim */}
                  {competition.details.schedule && (
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Yarışma Takvimi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {competition.details.schedule.map((item, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                          >
                            <div className="text-sm font-semibold text-blue-600 mb-2">
                              {item.title}
                            </div>
                            <div className="text-base font-bold text-gray-900">{item.date}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Ödüller */}
                  {competition.details.prizes && (
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Ödüller</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {competition.details.prizes.map((prize, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4"
                          >
                            <div className="text-sm font-semibold text-gray-600 mb-1">
                              {prize.rank}
                            </div>
                            <div className="text-xl font-bold text-blue-600">{prize.amount}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Proje Temaları */}
                  {competition.details.themes && (
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Proje Temaları</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {competition.details.themes.map((theme, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                          >
                            <div className="text-sm text-gray-800 font-medium">{theme}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Seminerler */}
                  {competition.details.seminars && (
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Seminerler ve Eğitimler</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="space-y-3">
                          {competition.details.seminars.map((seminar, index) => (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-3 border-b border-blue-200 last:border-0 last:pb-0"
                            >
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900">{seminar.date}</div>
                                <div className="text-sm text-gray-700">{seminar.title}</div>
                              </div>
                              <div className="text-sm text-gray-600 font-medium">{seminar.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Katılım Şartları */}
                  {competition.details.requirements && (
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Katılım Şartları</h3>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <ul className="space-y-2 text-gray-700">
                          {competition.details.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  )}

                  {/* Başvuru Butonları */}
                  <section className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href={competition.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-center"
                      >
                        Başvuru Yap
                      </a>
                      {competition.email && (
                        <a
                          href={`mailto:${competition.email}`}
                          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg text-center"
                        >
                          İletişim
                        </a>
                      )}
                    </div>
                  </section>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Yarışma yoksa */}
        {competitions.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-lg text-gray-700">Henüz yarışma bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompetitionsPage
