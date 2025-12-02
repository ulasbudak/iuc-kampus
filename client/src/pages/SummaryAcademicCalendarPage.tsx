const SummaryAcademicCalendarPage = () => {
  const guzYariyili = [
    { event: 'Eğitim-Öğretim Başlangıcı', date: '29 Eylül 2025' },
    { event: 'Eğitim-Öğretim Bitişi', date: '16 Ocak 2026' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Başlangıç Tarihi', date: '17 Kasım 2025' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Bitiş Tarihi', date: '28 Kasım 2025' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Başlangıcı', date: '19 Ocak 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Bitiş Tarihi', date: '30 Ocak 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavlarının Başlangıcı', date: '9 Şubat 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavları Bitiş Tarihi', date: '14 Şubat 2026' },
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Başlangıcı', date: '29 Eylül 2025' },
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Bitişi', date: '9 Ocak 2026' },
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
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Başlangıcı', date: '16 Şubat 2026' },
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Bitişi', date: '5 Haziran 2026' },
  ]

  const yksKayit = [
    { event: 'E-Devlet Kapısı Üzerinden Kayıt Yapacaklar için Kayıt Tarihi Başlangıcı', date: '1 Eylül 2025' },
    { event: 'E-Devlet Kapısı Üzerinden Kayıt Yapacaklar için Kayıt Tarihi Bitişi', date: '3 Eylül 2025' },
    { event: 'Şahsen Başvuru Yapacaklar için Kayıt Tarihi Başlangıcı', date: '1 Eylül 2025' },
    { event: 'Şahsen Başvuru Yapacaklar için Kayıt Tarihi Bitişi', date: '5 Eylül 2025' },
  ]

  const uluslararasiKayit = [
    { event: 'Kayıt Başlangıcı', date: '4 Ağustos 2025' },
    { event: 'Kayıt Tarihi için Son Gün', date: '13 Ağustos 2025' },
    { event: 'Türkçe Yeterlilik Sınavı', date: '12 Eylül 2025' },
    { event: 'Zorunlu Hazırlık Sınıfı Öngörülen Bölümlere/Programlara Başvuranların Yeterlilik Sınavı', date: '16 Eylül 2025' },
  ]

  const yeterlilikSinavlari = [
    { event: 'Yabancı Uyruklu Öğrenci Türkçe Yeterlilik Sınavı (Güz Dönemi)', date: '12 Eylül 2025' },
    { event: 'Yabancı Dil Yeterlilik ve Seviye Belirleme Sınavı (Yabancı Dil Zorunlu Hazırlık Yeterlilik Sınavı) Güz Dönemi', date: '16 Eylül 2025' },
    { event: 'Zorunlu / Kredili Yabancı Dil Yeterlilik Sınavı', date: '19 Eylül 2025' },
  ]

  const renderCalendarTable = (items: { event: string; date: string }[]) => (
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
            2025-2026 Eğitim-Öğretim Yılı Ön Lisans-Lisans Özet Akademik Takvim
          </h1>
          <p className="text-gray-600">İstanbul Üniversitesi-Cerrahpaşa</p>
        </div>

        <div className="space-y-8">
          {/* Bölüm 1: Güz ve Bahar Yarıyılı */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              1- GÜZ VE BAHAR YARIYILI EĞİTİM-ÖĞRETİM, YARIYIL SONU SINAVLARI, SINAV SONUÇLARI
              İLAN TARİHLERİ
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">Güz Yarıyılı</h3>
                {renderCalendarTable(guzYariyili)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">Bahar Yarıyılı</h3>
                {renderCalendarTable(baharYariyili)}
              </div>
            </div>
          </div>

          {/* Bölüm 2: Yeni Öğrencilerin Kayıtları */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              2. YENİ ÖĞRENCİLERİN KAYITLARI İLE YETERLİLİK SINAVLARI
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  YKS ile Kayıt Hakkı Kazananların Kayıt Tarihleri
                </h3>
                {renderCalendarTable(yksKayit)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  Uluslararası Öğrenci Kontenjanlarına Başvuru Sonucu Kayıt Hakkı Kazananların
                  Kayıt Tarihleri
                </h3>
                {renderCalendarTable(uluslararasiKayit)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  Yeterlilik Sınavları
                </h3>
                {renderCalendarTable(yeterlilikSinavlari)}
              </div>
            </div>
          </div>
        </div>

        {/* Önemli Not */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">⚠️ Önemli Not</h3>
          <p className="text-sm text-red-800">
            <strong>NOT:</strong> Cerrahpaşa Tıp Fakültesi, Diş Hekimliği Fakültesi, Florence
            Nightingale Hemşirelik Fakültesi, Veteriner Fakültesi ile Eczacılık Fakültesinin
            Takvimleri ayrı olarak belirlenir.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SummaryAcademicCalendarPage


