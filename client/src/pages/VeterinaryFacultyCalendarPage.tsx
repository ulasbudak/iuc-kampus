const VeterinaryFacultyCalendarPage = () => {
  const guzYariyili = [
    { event: 'Eğitim-Öğretim Başlangıcı', date: '29 Eylül 2025' },
    { event: 'Eğitim-Öğretim Bitişi', date: '16 Ocak 2026' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Başlangıç Tarihi', date: '17 Kasım 2025' },
    { event: 'Yarıyıl/Yıl İçi Etkinlikleri (Ara Sınav) Bitiş Tarihi', date: '28 Kasım 2025' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Başlangıcı', date: '16 Ocak 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bitirme Sınavları Bitiş Tarihi', date: '19 Ocak 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavlarının Başlangıcı', date: '7 Şubat 2026' },
    { event: 'Yarıyıl/Yıl Sonu Bütünleme Sınavları Bitiş Tarihi', date: '15 Şubat 2026' },
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

  const yillikDersler = [
    { event: 'Eğitim-Öğretim Başlangıcı', date: '29 Eylül 2025' },
    { event: 'Eğitim-Öğretim Bitişi', date: '19 Haziran 2026' },
    { event: 'Ara Tatil', date: '16-20 Şubat 2026' },
    { event: 'Yıl İçi Etkinlikleri (Ara Sınav I) Başlangıç Tarihi', date: '17 Kasım 2025' },
    { event: 'Yıl İçi Etkinlikleri (Ara Sınav I) Bitiş Tarihi', date: '28 Kasım 2025' },
    { event: 'Yıl İçi Etkinlikleri (Ara Sınav II) Başlangıç Tarihi', date: '13 Nisan 2026' },
    { event: 'Yıl İçi Etkinlikleri (Ara Sınav II) Bitiş Tarihi', date: '24 Nisan 2026' },
    { event: 'Yıl Sonu Bitirme Sınavları Başlangıcı', date: '22 Haziran 2026' },
    { event: 'Yıl Sonu Bitirme Sınavları Bitiş Tarihi', date: '3 Temmuz 2026' },
    { event: 'Yıl Sonu Bütünleme Sınavlarının Başlangıcı', date: '13 Temmuz 2026' },
    { event: 'Yıl Sonu Bütünleme Sınavları Bitiş Tarihi', date: '18 Temmuz 2026' },
  ]

  const yeniOgrenciKayit = [
    { event: 'E-Devlet Kapısı Üzerinden Kayıt Başlangıcı', date: '1 Eylül 2025' },
    { event: 'E-Devlet Kapısı Üzerinden Kayıt Bitişi', date: '3 Eylül 2025' },
    { event: 'Şahsen Başvuru Başlangıcı', date: '1 Eylül 2025' },
    { event: 'Şahsen Başvuru Bitişi', date: '5 Eylül 2025' },
  ]

  const yeterlilikSinavlari = [
    { event: 'Yabancı Uyruklu Öğrenci Türkçe Yeterlilik Sınavı (Güz Dönemi)', date: '12 Eylül 2025' },
    { event: 'Yabancı Dil Zorunlu Hazırlık Yeterlilik Sınavı (Güz Dönemi)', date: '16 Eylül 2025' },
    { event: 'Zorunlu / Kredili Yabancı Dil Yeterlilik Sınavı', date: '19 Eylül 2025' },
  ]

  const uluslararasiKayit = [
    { event: 'Kayıt Başlangıcı', date: '4 Ağustos 2025' },
    { event: 'Kayıt Bitişi', date: '13 Ağustos 2025' },
    { event: 'Türkçe Yeterlilik Sınavı', date: '12 Eylül 2025' },
    { event: 'Zorunlu Hazırlık Sınıfı Öngörülen Bölümlere/Programlara Başvuranların Yeterlilik Sınavı', date: '16 Eylül 2025' },
  ]

  const kayitYenileme = [
    {
      donem: 'Güz Yarıyılı / Yıllık Dersler',
      dersAlmaBaslangic: '25 Ağustos 2025',
      dersAlmaBitis: '28 Eylül 2025',
      danismanOnayBitis: '29 Eylül 2025',
      odemeBaslangic: '25 Ağustos 2025',
      odemeBitis: '3 Ekim 2025',
      dersEklemeBaslangic: '29 Eylül 2025',
      dersEklemeBitis: '3 Ekim 2025',
    },
    {
      donem: 'Bahar Yarıyılı',
      dersAlmaBaslangic: '23 Şubat 2026',
      dersAlmaBitis: '1 Mart 2026',
      danismanOnayBitis: '2 Mart 2026',
      odemeBaslangic: '23 Şubat 2026',
      odemeBitis: '6 Mart 2026',
      dersEklemeBaslangic: '2 Mart 2026',
      dersEklemeBitis: '6 Mart 2026',
    },
  ]

  const yatayGecis = [
    { event: 'Kurum İçi ve Kurumlar Arası Yatay Geçiş Başvurularının Başlangıcı', date: '21 Temmuz 2025' },
    { event: 'Kurum İçi ve Kurumlar Arası Yatay Geçiş Başvuruları İçin Son Gün', date: '25 Temmuz 2025 (Saat 16:30)' },
    { event: 'Yabancı Uyruklu Öğrencilerin Türkçe Yeterlilik Sınavı', date: '29 Temmuz 2025' },
    { event: 'Zorunlu Hazırlık Sınıfı Öngörülen Bölümlere/Programlara Başvuranların Yeterlilik Sınavı', date: '31 Temmuz 2025' },
    { event: 'Başvuruların Değerlendirilmesinin Sonuçlandırılması İçin Son Gün', date: '12 Ağustos 2025' },
    { event: 'Sonuçların İlanı', date: '14 Ağustos 2025' },
    { event: 'Kayıt Hakkı Kazanan Adayların Kayıt Başlangıcı', date: '18 Ağustos 2025' },
    { event: 'Kayıt Hakkı Kazanan Adayların Kayıt Bitişi', date: '22 Ağustos 2025' },
    { event: 'Boş Kontenjanların İlanı', date: '26 Ağustos 2025' },
    { event: 'Yedeklerin Başvuru Başlangıcı', date: '28 Ağustos 2025' },
    { event: 'Yedeklerin Başvuru Bitişi', date: '29 Ağustos 2025' },
    { event: 'Yedekten Kayıt Hakkı Kazananların İlanı', date: '1 Eylül 2025' },
    { event: 'Yedekten Kayıt Hakkı Kazananların Kayıt Başlangıcı', date: '2 Eylül 2025' },
    { event: 'Yedekten Kayıt Hakkı Kazananların Kayıt Bitişi', date: '5 Eylül 2025' },
  ]

  const merkeziYerlesmeYatayGecis = [
    { event: 'Başvuruların Başlangıcı', date: '1 Ağustos 2025' },
    { event: 'Başvurular İçin Son Gün', date: '15 Ağustos 2025' },
    { event: 'Zorunlu Hazırlık Sınıfı Öngörülen Bölümlere/Programlara Başvuranların Yeterlilik Sınavı', date: '19 Ağustos 2025' },
    { event: 'Başvuruların Değerlendirilmesinin Sonuçlandırılması İçin Son Gün', date: '26 Ağustos 2025' },
    { event: 'Sonuçların İlanı', date: '29 Ağustos 2025' },
    { event: 'Kayıt Hakkı Kazanan Adayların Kayıt Başlangıcı', date: '2 Eylül 2025' },
    { event: 'Kayıt Hakkı Kazanan Adayların Kayıt Bitişi', date: '5 Eylül 2025' },
  ]

  const yabanciDilHazirlik = [
    { event: 'Yabancı Dil Hazırlık Eğitimi Başlangıcı (Güz)', date: '29 Eylül 2025' },
    { event: 'Yabancı Dil Hazırlık Eğitimi Bitişi (Güz)', date: '9 Ocak 2026' },
    { event: 'Güz Dönemi Bitirme Sınavı (Yazılı)', date: '12 Ocak 2026' },
    { event: 'Güz Dönemi Bitirme Sınavı (Konuşma)', date: '13-14 Ocak 2026' },
    { event: 'Bütünleme Sınavı (Güz)', date: '20 Ocak 2026' },
    { event: 'Ara Dönem Yeterlilik Sınavı', date: '23 Ocak 2026' },
    { event: 'Yabancı Dil Hazırlık Eğitimi Başlangıcı (Bahar)', date: '16 Şubat 2026' },
    { event: 'Yabancı Dil Hazırlık Eğitimi Bitişi (Bahar)', date: '5 Haziran 2026' },
    { event: 'Bahar Dönemi Bitirme Sınavı (Yazılı)', date: '8 Haziran 2026' },
    { event: 'Bahar Dönemi Bitirme Sınavı (Konuşma)', date: '9-10 Haziran 2026' },
    { event: 'Bütünleme Sınavı (Bahar)', date: '16 Haziran 2026' },
    { event: 'Yıl Sonu Yeterlilik Sınavı', date: '19 Haziran 2026' },
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
            2025-2026 Eğitim-Öğretim Yılı Veteriner Fakültesi Akademik Takvimi
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

          {/* Bölüm 2: Yıllık Dersler */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              YILLIK EĞİTİM-ÖĞRETİM, YIL SONU SINAVLARI
            </h2>
            {renderTable(yillikDersler)}
          </div>

          {/* Bölüm 3: Yeni Öğrenci Kayıtları */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              YENİ ÖĞRENCİLERİN KAYITLARI İLE YETERLİLİK SINAVLARI
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  YKS ile Kayıt Hakkı Kazananların Kayıt Tarihleri
                </h3>
                {renderTable(yeniOgrenciKayit)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  Uluslararası Öğrenci Kontenjanlarına Başvuru Sonucu Kayıt Hakkı Kazananların
                  Kayıt Tarihleri
                </h3>
                {renderTable(uluslararasiKayit)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  Yeterlilik Sınavları
                </h3>
                {renderTable(yeterlilikSinavlari)}
              </div>
            </div>
          </div>

          {/* Bölüm 4: Yatay Geçiş */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              YATAY GEÇİŞ BAŞVURULARI
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  Kurum İçi ve Kurumlar Arası Yatay Geçiş
                </h3>
                {renderTable(yatayGecis)}
                <p className="mt-4 text-sm text-gray-600 italic">
                  * Bahar Yarıyılında Kurumlar Arası Yatay Geçiş Sadece Ön Lisans Programlarına
                  Yapılmaktadır.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-4">
                  Ek Madde-1 Kapsamında Merkezi Yerleştirme Puanı ile Yatay Geçiş
                </h3>
                {renderTable(merkeziYerlesmeYatayGecis)}
              </div>
            </div>
          </div>

          {/* Bölüm 5: Kayıt Yenileme */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              KAYIT YENİLEME TARİHLERİ
            </h2>

            <div className="space-y-6">
              {kayitYenileme.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-600 mb-4">{item.donem}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ders Alma:</span>
                      <span className="font-medium">
                        {item.dersAlmaBaslangic} - {item.dersAlmaBitis}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Danışman Onay:</span>
                      <span className="font-medium">{item.danismanOnayBitis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ödeme:</span>
                      <span className="font-medium">
                        {item.odemeBaslangic} - {item.odemeBitis}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ders Ekleme/Bırakma:</span>
                      <span className="font-medium">
                        {item.dersEklemeBaslangic} - {item.dersEklemeBitis}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bölüm 6: Yabancı Dil Hazırlık Eğitimi */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              YABANCI DİLLER YÜKSEKOKULU - YABANCI DİL HAZIRLIK EĞİTİMİ
            </h2>
            {renderTable(yabanciDilHazirlik)}
          </div>

          {/* Bölüm 7: Çift Anadal ve Yandal */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              ÇİFT ANADAL VE YANDAL PROGRAMLARI
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                Çift Anadal ve Yandal Programları için başvuru tarihleri İstanbul
                Üniversitesi-Cerrahpaşa 2025-2026 Eğitim-Öğretim Yılı Akademik Takviminde
                belirlenen süreler içinde yapılmaktadır.
              </p>
            </div>
          </div>
        </div>

        {/* Önemli Notlar */}
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
            <li>
              • Yeni kayıt öğrencilerinin ders muafiyet talepleri ilk kayıtlarını takip eden 10 iş
              günü içinde bildirilmelidir.
            </li>
            <li>
              • Veteriner Fakültesi yıllık ders programı uygulamaktadır.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VeterinaryFacultyCalendarPage


