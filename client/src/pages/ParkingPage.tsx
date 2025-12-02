const ParkingPage = () => {
  const geciciParkUcretleri = [
    { sure: '0 - 30 Dakika', ucret: 'ÜCRETSİZ' },
    { sure: '30 Dakika - 1 Saat', ucret: '100 TL' },
    { sure: '1 - 3 Saat', ucret: '150 TL' },
    { sure: '3 - 6 Saat', ucret: '200 TL' },
    { sure: '6 - 12 Saat', ucret: '250 TL' },
    { sure: '12 - 24 Saat', ucret: '300 TL' },
  ]

  const teknokentFirmalari = [
    { araçSayisi: '1 - 9 Araç', aylik: '1.500 TL', altiAylik: '7.500 TL' },
    { araçSayisi: '10 - 19 Araç', aylik: '1.350 TL', altiAylik: '6.750 TL' },
    { araçSayisi: '20 Araç ve Üzeri', aylik: '1.200 TL', altiAylik: '6.000 TL' },
  ]

  const ogrenciAbonelik = [
    { sure: 'Aylık', ucret: '350 TL' },
    { sure: '6 Aylık', ucret: '1.750 TL' },
    { sure: '1 Yıllık', ucret: '3.500 TL' },
  ]

  const digerAboneler = [
    { sure: 'Aylık', ucret: '2.750 TL' },
    { sure: '6 Aylık', ucret: '13.750 TL' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Avcılar Yerleşkesi Batı Otopark Ücretleri</h1>
          <p className="text-gray-600">İstanbul Üniversitesi-Cerrahpaşa</p>
        </div>

        <div className="space-y-8">
          {/* Geçici Süreli Park Ücretleri */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              1. Geçici Süreli Park Ücretleri
            </h2>
            <p className="text-gray-700 mb-4">
              Abonelik yapmadan kısa süreli park eden araçlar için Tablo 1'de belirtilen ücretler
              uygulanmaktadır.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                      Süre
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                      Ücret
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {geciciParkUcretleri.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">
                        {item.sure}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                        {item.ucret}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600 italic">
              * Hafta içi geçici süreli park ücretleri
            </p>
          </div>

          {/* Abonelik Ücretleri */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              2. Abonelik Ücretleri
            </h2>
            <p className="text-gray-700 mb-6">
              Araç sahipleri, aşağıda belirtilen ücretleri ödeyerek Avcılar Yerleşkesi otoparklarına
              abone olabilirler.
            </p>

            {/* Teknokent Firmaları */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-600 mb-4">
                İstanbul Teknokent A.Ş. Firma ve Çalışanları İçin Avcılar Otopark Abonelik Ücretleri
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Teknokent Firmaları Bünyesindeki Araç Sayısı
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Aylık
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        6 Aylık
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teknokentFirmalari.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">
                          {item.araçSayisi}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                          {item.aylik}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                          {item.altiAylik}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Not:</strong> İstanbul Teknokent A.Ş. ve TTO İstanbul Proje Geliştirme ve
                  Yatırım A.Ş. yönetim ve çalışanları ile Start-Up şirket çalışanlarına ait araçlar
                  ücretlendirilmez.
                </p>
              </div>
            </div>

            {/* Personel Servisleri */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-600 mb-4">
                Personel Servisleri İçin Avcılar Otopark Abonelik Ücretleri
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Servis Aracı
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Ücret
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">
                        0-30 Dakika
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                        Ücretsiz
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Not:</strong> Abonelik yapmamış, plakası kayıtlı personel servis araçları
                  otoparkları 60 dakika ücretsiz kullanabilir.
                </p>
              </div>
            </div>

            {/* Öğrenci Abonelik */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-600 mb-4">
                İÜC ve İÜ Öğrencileri (Önlisans, Lisans, Yüksek Lisans, Doktora) Avcılar Otopark
                Abonelik Ücretleri
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Abonelik Süresi
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Otomobil
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ogrenciAbonelik.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">
                          {item.sure}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                          {item.ucret}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Diğer Aboneler */}
            <div>
              <h3 className="text-lg font-semibold text-primary-600 mb-4">
                Diğer Aboneler İçin Avcılar Yerleşkesi Aylık Otopark Abonelik Ücretleri
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Abonelik Süresi
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Otomobil
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {digerAboneler.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">
                          {item.sure}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                          {item.ucret}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Önemli Notlar */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">📌 Önemli Notlar</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Otopark ücretleri güncel olarak belirtilmiştir.</li>
            <li>• Ücretler değişiklik gösterebilir, güncel bilgi için ilgili birimlerle iletişime geçiniz.</li>
            <li>• Öğrenci abonelikleri için öğrenci belgesi gereklidir.</li>
            <li>• Abonelik işlemleri için ilgili birimlerle iletişime geçiniz.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ParkingPage


