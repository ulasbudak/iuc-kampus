interface Dorm {
  id: number
  name: string
  type: string
  gender: string
  location: string
  address: string
  phone: string
  description: string
  features: string[]
  roomTypes: string[]
  distance: string
  application: string
}

const DormsPage = () => {
  const dorms: Dorm[] = [
    {
      id: 1,
      name: 'KYK Prof. Dr. Halil İnalcık Öğrenci Yurdu',
      type: 'KYK Devlet Yurdu',
      gender: 'Kız',
      location: 'Avcılar, İstanbul',
      address: 'Üniversite Mahallesi Sarıgül Sokak 31/8 Avcılar/İstanbul',
      phone: '0(212) 812-32-81',
      description:
        'İstanbul Avcılar\'da yer alan KYK Kredi ve Yurtlar Kurumu\'na ait bir devlet yurdudur. İstanbul Üniversitesi-Cerrahpaşa\'ya oldukça yakındır. Bu üniversitede okuyan öğrenciler tercih etmektedir. Avcılar metrobüs durağına yürüme mesafededir. Tek bloktan oluşmakta, kız öğrenciler kalmaktadır. Yeni binasıyla yeni bir yurttur. Yanına erkek yurdu olarak ayrı KYK Cerrah Mehmet Paşa Öğrenci Yurdu da yapılmıştır.',
      features: [
        'İstanbul Üniversitesi-Cerrahpaşa\'ya yakın',
        'Avcılar metrobüs durağına yürüme mesafesi',
        'Yeni bina',
        'Tek blok',
      ],
      roomTypes: ['4 Kişilik Oda', '6 Kişilik Oda'],
      distance: 'İstanbul Üniversitesi-Cerrahpaşa\'ya yakın',
      application:
        'Başvurular KYK\'nın internet sitesinden başvuru tarihleri açıldığında E-Devlet üzerinden yapılacaktır.',
    },
    {
      id: 2,
      name: 'KYK Cerrah Mehmet Paşa Öğrenci Yurdu',
      type: 'KYK Devlet Yurdu',
      gender: 'Erkek',
      location: 'Avcılar, İstanbul',
      address: 'Üniversite Mahallesi Sarıgül Sokak 31/4 Avcılar/İstanbul',
      phone: '0(212) 823-64-98',
      description:
        'İstanbul Avcılar ilçesinde bulunan Kredi ve Yurtlar Kurumu KYK\'ya bağlı erkek devlet yurdudur. İstanbul Üniversitesi-Cerrahpaşa\'ya yürüme mesafesindedir. Bu üniversitede okuyan öğrenciler bu yurtta kalmak istemektedirler. Avcılar metrobüs durağına yakındır. Tek bloktan oluşmakta, erkek öğrenciler kalmaktadır. Odalar 4 ve 6 kişiliktir. Yeni binasıyla yeni bir yurttur. Bitişiğine kız yurdu olarak ayrı KYK Prof. Dr. Halil İnalcık Öğrenci Yurdu da yapılmıştır.',
      features: [
        'İstanbul Üniversitesi-Cerrahpaşa\'ya yürüme mesafesi',
        'Avcılar metrobüs durağına yakın',
        'Yeni bina',
        'Tek blok',
      ],
      roomTypes: ['4 Kişilik Oda', '6 Kişilik Oda'],
      distance: 'İstanbul Üniversitesi-Cerrahpaşa\'ya yürüme mesafesi',
      application:
        'Başvurular KYK\'nın internet sitesinden başvuru tarihleri açıldığında E-Devlet üzerinden yapılacaktır.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yurtlar</h1>
          <p className="text-gray-600">
            İstanbul Üniversitesi-Cerrahpaşa öğrencileri için yakın yurtlar ve konaklama seçenekleri
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {dorms.map((dorm) => (
            <div key={dorm.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{dorm.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {dorm.type}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          dorm.gender === 'Kız'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {dorm.gender}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {dorm.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{dorm.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* İletişim Bilgileri */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20 flex-shrink-0">Adres:</span>
                        <span className="text-gray-700">{dorm.address}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20 flex-shrink-0">Telefon:</span>
                        <a
                          href={`tel:${dorm.phone}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {dorm.phone}
                        </a>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20 flex-shrink-0">Mesafe:</span>
                        <span className="text-gray-700">{dorm.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Özellikler */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Özellikler</h3>
                    <ul className="space-y-2">
                      {dorm.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <span className="text-primary-600 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Oda Tipleri */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Oda Tipleri</h3>
                  <div className="flex flex-wrap gap-2">
                    {dorm.roomTypes.map((roomType, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                      >
                        {roomType}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Başvuru Bilgisi */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Başvuru</h3>
                  <p className="text-sm text-gray-700">{dorm.application}</p>
                  <a
                    href="https://www.kyk.gov.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    KYK Resmi Web Sitesi →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bilgilendirme */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">📌 Önemli Notlar</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • Yurt başvuruları genellikle yaz aylarında KYK (Kredi ve Yurtlar Kurumu) tarafından
              açılmaktadır.
            </li>
            <li>
              • Başvurular E-Devlet üzerinden yapılmaktadır. Başvuru tarihlerini KYK resmi web
              sitesinden takip ediniz.
            </li>
            <li>
              • Yurt kontenjanları sınırlıdır. Başvuru yaparken gerekli belgeleri hazır bulundurunuz.
            </li>
            <li>
              • Yurt ücretleri ve ödeme koşulları hakkında güncel bilgi için KYK ile iletişime
              geçiniz.
            </li>
            <li>
              • Özel yurtlar için doğrudan yurt yönetimi ile iletişime geçiniz.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DormsPage
