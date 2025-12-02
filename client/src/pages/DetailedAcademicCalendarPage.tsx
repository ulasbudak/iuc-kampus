const DetailedAcademicCalendarPage = () => {
  // Bu veriler https://cdn.iuc.edu.tr/FileHandler2.ashx?f=411.1.1f-on-lisans-lisans-ayrintili-takvim.pdf
  // adresindeki PDF'ten alınacaktır. PDF parsing başarısız olduğu için şablon yapı oluşturulmuştur.

  const guzYariyili = [
    { event: 'Eğitim-Öğretim Başlangıcı', date: '29 Eylül 2025', note: '' },
    { event: 'Eğitim-Öğretim Bitişi', date: '16 Ocak 2026', note: '' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Başlangıç Tarihi', date: '17 Kasım 2025', note: '' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Bitiş Tarihi', date: '28 Kasım 2025', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Başlangıcı', date: '19 Ocak 2026', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Bitiş Tarihi', date: '30 Ocak 2026', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavlarının Başlangıcı', date: '9 Şubat 2026', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavları Bitiş Tarihi', date: '14 Şubat 2026', note: '' },
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Başlangıcı', date: '29 Eylül 2025', note: '' },
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Bitişi', date: '9 Ocak 2026', note: '' },
  ]

  const baharYariyili = [
    { event: 'Eğitim-Öğretim Başlangıcı', date: '23 Şubat 2026', note: '' },
    { event: 'Eğitim-Öğretim Bitişi', date: '19 Haziran 2026', note: '' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Başlangıç Tarihi', date: '13 Nisan 2026', note: '' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Bitiş Tarihi', date: '24 Nisan 2026', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Başlangıcı', date: '22 Haziran 2026', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Bitiş Tarihi', date: '3 Temmuz 2026', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavlarının Başlangıcı', date: '13 Temmuz 2026', note: '' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavları Bitiş Tarihi', date: '18 Temmuz 2026', note: '' },
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Başlangıcı', date: '16 Şubat 2026', note: '' },
    { event: 'Yabancı Diller Yüksekokulu Hazırlık Eğitimi Bitişi', date: '5 Haziran 2026', note: '' },
  ]

  const renderDetailedTable = (items: { event: string; date: string; note: string }[]) => (
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
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Açıklama
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
              <td className="border border-gray-300 px-4 py-3 text-gray-600 text-sm">
                {item.note || '-'}
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
            2025-2026 Eğitim-Öğretim Yılı Ön Lisans-Lisans Sınav Takvimi
          </h1>
          <p className="text-gray-600">İstanbul Üniversitesi-Cerrahpaşa</p>
          <div className="mt-4">
            <a
              href="https://cdn.iuc.edu.tr/FileHandler2.ashx?f=411.1.1f-on-lisans-lisans-ayrintili-takvim.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline text-sm"
            >
              📄 Orijinal PDF'i görüntüle
            </a>
          </div>
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
                {renderDetailedTable(guzYariyili)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">Bahar Yarıyılı</h3>
                {renderDetailedTable(baharYariyili)}
              </div>
            </div>
          </div>

          {/* Ek Detaylar Bölümü - PDF'ten eklenebilir */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Ek Detaylar ve Özel Durumlar
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Not:</strong> Ayrıntılı akademik takvim bilgileri PDF formatında mevcuttur.
                Tüm detaylar için yukarıdaki PDF linkini kullanabilirsiniz.
              </p>
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

export default DetailedAcademicCalendarPage

