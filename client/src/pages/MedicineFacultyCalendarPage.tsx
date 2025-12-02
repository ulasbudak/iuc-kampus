const MedicineFacultyCalendarPage = () => {
  const guzYariyili = [
    { event: 'Eğitim-Öğretim Başlangıcı', date: '29 Eylül 2025' },
    { event: 'Eğitim-Öğretim Bitişi', date: '16 Ocak 2026' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Başlangıç Tarihi', date: '17 Kasım 2025' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Bitiş Tarihi', date: '28 Kasım 2025' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Başlangıcı', date: '19 Ocak 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Bitiş Tarihi', date: '30 Ocak 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavlarının Başlangıcı', date: '9 Şubat 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavları Bitiş Tarihi', date: '14 Şubat 2026' },
  ]

  const baharYariyili = [
    { event: 'Eğitim-Öğretim Başlangıcı', date: '23 Şubat 2026' },
    { event: 'Eğitim-Öğretim Bitişi', date: '19 Haziran 2026' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Başlangıç Tarihi', date: '13 Nisan 2026' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Bitiş Tarihi', date: '24 Nisan 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Başlangıcı', date: '22 Haziran 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Bitiş Tarihi', date: '3 Temmuz 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavlarının Başlangıcı', date: '13 Temmuz 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavları Bitiş Tarihi', date: '18 Temmuz 2026' },
  ]

  const sinifBazliTakvim = [
    {
      sinif: '1., 2. ve 3. Sınıf',
      guz: {
        egitimBaslangic: '15 Eylül 2025',
        egitimBitis: '8 Ocak 2026',
        araSinavBaslangic: '17 Kasım 2025',
        araSinavBitis: '28 Kasım 2025',
        finalBaslangic: '19 Ocak 2026',
        finalBitis: '30 Ocak 2026',
        butunlemeBaslangic: '9 Şubat 2026',
        butunlemeBitis: '14 Şubat 2026',
      },
      bahar: {
        egitimBaslangic: '9 Şubat 2026',
        egitimBitis: '10 Haziran 2026',
        araSinavBaslangic: '13 Nisan 2026',
        araSinavBitis: '24 Nisan 2026',
        finalBaslangic: '22 Haziran 2026',
        finalBitis: '3 Temmuz 2026',
        butunlemeBaslangic: '13 Temmuz 2026',
        butunlemeBitis: '18 Temmuz 2026',
      },
    },
    {
      sinif: '4. ve 5. Sınıf (Yıllık)',
      yillik: {
        egitimBaslangic: '1 Eylül 2025',
        egitimBitis: '19 Haziran 2026',
        araSinavBaslangic: 'Belirlenecek',
        araSinavBitis: 'Belirlenecek',
        finalBaslangic: 'Belirlenecek',
        finalBitis: 'Belirlenecek',
        butunlemeBaslangic: 'Belirlenecek',
        butunlemeBitis: 'Belirlenecek',
      },
    },
    {
      sinif: '6. Sınıf (Yıllık)',
      yillik: {
        egitimBaslangic: '7 Temmuz 2025',
        egitimBitis: '3 Temmuz 2026',
        araSinavBaslangic: 'Belirlenecek',
        araSinavBitis: 'Belirlenecek',
        finalBaslangic: 'Belirlenecek',
        finalBitis: 'Belirlenecek',
        butunlemeBaslangic: 'Belirlenecek',
        butunlemeBitis: 'Belirlenecek',
      },
    },
  ]

  const kayitYenileme = [
    {
      sinif: '1., 2. ve 3. Sınıf',
      guz: {
        dersAlmaBaslangic: '8 Eylül 2025',
        dersAlmaBitis: '14 Eylül 2025',
        danismanOnayBitis: '15 Eylül 2025',
        odemeBaslangic: '8 Eylül 2025',
        odemeBitis: '19 Eylül 2025',
        dersEklemeBaslangic: '16 Eylül 2025',
        dersEklemeBitis: '19 Eylül 2025',
      },
      bahar: {
        dersAlmaBaslangic: '2 Şubat 2026',
        dersAlmaBitis: '8 Şubat 2026',
        danismanOnayBitis: '9 Şubat 2026',
        odemeBaslangic: '2 Şubat 2026',
        odemeBitis: '13 Şubat 2026',
        dersEklemeBaslangic: '10 Şubat 2026',
        dersEklemeBitis: '13 Şubat 2026',
      },
    },
  ]

  const renderTable = (items: { event: string; date: string }[]) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Etkinlik
            </th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700 w-48">
              Tarih
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 text-gray-800">{item.event}</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            2025-2026 Eğitim-Öğretim Yılı Cerrahpaşa Tıp Fakültesi Akademik Takvimi
          </h1>
          <p className="text-gray-600">İstanbul Üniversitesi-Cerrahpaşa</p>
        </div>

        <div className="space-y-8">
          {/* Bölüm 1: Güz ve Bahar Yarıyılı */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              GÜZ VE BAHAR YARIYILI EĞİTİM-ÖĞRETİM, YARIYIL SONU SINAVLARI
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">Güz Yarıyılı</h3>
                {renderTable(guzYariyili)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">Bahar Yarıyılı</h3>
                {renderTable(baharYariyili)}
              </div>
            </div>
          </div>

          {/* Bölüm 2: Sınıf Bazlı Takvim */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Sınıf Bazlı Eğitim-Öğretim Takvimi
            </h2>

            <div className="space-y-6">
              {sinifBazliTakvim.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-600 mb-4">{item.sinif}</h3>
                  {item.guz ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Güz Yarıyılı</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Eğitim Başlangıcı:</span>
                            <span className="font-medium">{item.guz.egitimBaslangic}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Eğitim Bitişi:</span>
                            <span className="font-medium">{item.guz.egitimBitis}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ara Sınav:</span>
                            <span className="font-medium">
                              {item.guz.araSinavBaslangic} - {item.guz.araSinavBitis}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Final:</span>
                            <span className="font-medium">
                              {item.guz.finalBaslangic} - {item.guz.finalBitis}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bütünleme:</span>
                            <span className="font-medium">
                              {item.guz.butunlemeBaslangic} - {item.guz.butunlemeBitis}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Bahar Yarıyılı</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Eğitim Başlangıcı:</span>
                            <span className="font-medium">{item.bahar.egitimBaslangic}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Eğitim Bitişi:</span>
                            <span className="font-medium">{item.bahar.egitimBitis}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ara Sınav:</span>
                            <span className="font-medium">
                              {item.bahar.araSinavBaslangic} - {item.bahar.araSinavBitis}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Final:</span>
                            <span className="font-medium">
                              {item.bahar.finalBaslangic} - {item.bahar.finalBitis}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bütünleme:</span>
                            <span className="font-medium">
                              {item.bahar.butunlemeBaslangic} - {item.bahar.butunlemeBitis}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Yıllık</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Eğitim Başlangıcı:</span>
                          <span className="font-medium">{item.yillik.egitimBaslangic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Eğitim Bitişi:</span>
                          <span className="font-medium">{item.yillik.egitimBitis}</span>
                        </div>
                        <div className="text-gray-500 text-xs mt-2">
                          Sınav tarihleri ders programları içinde yayınlanacaktır.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bölüm 3: Kayıt Yenileme */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Kayıt Yenileme Tarihleri
            </h2>

            <div className="space-y-6">
              {kayitYenileme.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-600 mb-4">{item.sinif}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Güz Yarıyılı</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ders Alma:</span>
                          <span className="font-medium">
                            {item.guz.dersAlmaBaslangic} - {item.guz.dersAlmaBitis}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Danışman Onay:</span>
                          <span className="font-medium">{item.guz.danismanOnayBitis}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ödeme:</span>
                          <span className="font-medium">
                            {item.guz.odemeBaslangic} - {item.guz.odemeBitis}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ders Ekleme/Bırakma:</span>
                          <span className="font-medium">
                            {item.guz.dersEklemeBaslangic} - {item.guz.dersEklemeBitis}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Bahar Yarıyılı</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ders Alma:</span>
                          <span className="font-medium">
                            {item.bahar.dersAlmaBaslangic} - {item.bahar.dersAlmaBitis}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Danışman Onay:</span>
                          <span className="font-medium">{item.bahar.danismanOnayBitis}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ödeme:</span>
                          <span className="font-medium">
                            {item.bahar.odemeBaslangic} - {item.bahar.odemeBitis}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ders Ekleme/Bırakma:</span>
                          <span className="font-medium">
                            {item.bahar.dersEklemeBaslangic} - {item.bahar.dersEklemeBitis}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Önemli Not */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">📌 Önemli Notlar</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • Ara sınav tarihleri ve sayıları ilgili birimlerin yetkili kurullarınca belirlenir.
            </li>
            <li>
              • Final ve bütünleme sınav tarihleri ders programları içinde yayınlanmıştır.
            </li>
            <li>
              • Kayıt yenileme işlemleri için ders alma ve danışman onayı zorunludur.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MedicineFacultyCalendarPage


