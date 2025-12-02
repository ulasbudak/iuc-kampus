import { useState } from 'react'

interface ProgramData {
  fakulte: string
  program: string
  puanTuru: string
  yil: number
  kontenjan: number
  yerlesen: number | string
  tabanPuan: number | string
  sira: number | string
}

const BaseScoresPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const [selectedPuanTuru, setSelectedPuanTuru] = useState<string>('Tümü')
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Örnek veri - gerçek verilerle doldurulabilir
  const programs: ProgramData[] = [
    // 2 Yıllık Programlar (TYT)
    {
      fakulte: 'Sosyal Bilimler Meslek Yüksekokulu',
      program: 'Turizm ve Otel İşletmeciliği (Uzaktan Öğretim)',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 100,
      yerlesen: 103,
      tabanPuan: 282.93718,
      sira: 1069840,
    },
    {
      fakulte: 'Sosyal Bilimler Meslek Yüksekokulu',
      program: 'Pazarlama (Uzaktan Öğretim)',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 100,
      yerlesen: 103,
      tabanPuan: 281.58966,
      sira: 1088164,
    },
    {
      fakulte: 'Sosyal Bilimler Meslek Yüksekokulu',
      program: 'Emlak Yönetimi (Uzaktan Öğretim)',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 200,
      yerlesen: 205,
      tabanPuan: 265.63554,
      sira: 1314118,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Grafik Tasarımı (KKTC Uyruklu)',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 2,
      yerlesen: 1,
      tabanPuan: 'Dolmadı',
      sira: 'Dolmadı',
    },
    {
      fakulte: 'Sağlık Hizmetleri Meslek Yüksekokulu',
      program: 'Tıbbi Laboratuvar Teknikleri',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 50,
      tabanPuan: 351.70563,
      sira: 387036,
    },
    {
      fakulte: 'Sağlık Hizmetleri Meslek Yüksekokulu',
      program: 'Tıbbi Dokümantasyon ve Sekreterlik',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 30,
      yerlesen: 30,
      tabanPuan: 350.08682,
      sira: 397246,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Grafik Tasarımı',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 40,
      tabanPuan: 348.70253,
      sira: 406317,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Elektrik',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 60,
      tabanPuan: 346.18568,
      sira: 423070,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Otomotiv Teknolojisi',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 30,
      yerlesen: 30,
      tabanPuan: 341.89275,
      sira: 452895,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Elektronik Teknolojisi',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 60,
      tabanPuan: 339.57975,
      sira: 469685,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Kontrol ve Otomasyon Teknolojisi',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 60,
      tabanPuan: 339.19977,
      sira: 472577,
    },
    {
      fakulte: 'Sosyal Bilimler Meslek Yüksekokulu',
      program: 'Dış Ticaret',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 40,
      tabanPuan: 338.042,
      sira: 481255,
    },
    {
      fakulte: 'Sağlık Hizmetleri Meslek Yüksekokulu',
      program: 'Radyoterapi',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 40,
      tabanPuan: 337.32067,
      sira: 486659,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Bilgisayar Programcılığı',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 60,
      tabanPuan: 379.36717,
      sira: 243442,
    },
    {
      fakulte: 'Sağlık Hizmetleri Meslek Yüksekokulu',
      program: 'Tıbbi Görüntüleme Teknikleri',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 40,
      tabanPuan: 360.25753,
      sira: 336798,
    },
    {
      fakulte: 'Sağlık Hizmetleri Meslek Yüksekokulu',
      program: 'Ağız ve Diş Sağlığı',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 40,
      tabanPuan: 358.06745,
      sira: 349128,
    },
    {
      fakulte: 'Teknik Bilimler Meslek Yüksekokulu',
      program: 'Makine',
      puanTuru: 'TYT',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 60,
      tabanPuan: 351.94653,
      sira: 385598,
    },
    // 4 Yıllık Programlar (SAY)
    {
      fakulte: 'Mühendislik Fakültesi',
      program: 'Bilgisayar Mühendisliği',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 95,
      yerlesen: 98,
      tabanPuan: 455.65788,
      sira: 41051,
    },
    {
      fakulte: 'Mühendislik Fakültesi',
      program: 'Endüstri Mühendisliği',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 75,
      yerlesen: 77,
      tabanPuan: 449.24401,
      sira: 46877,
    },
    {
      fakulte: 'Mühendislik Fakültesi',
      program: 'Elektrik-Elektronik Mühendisliği',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 62,
      tabanPuan: 449.02391,
      sira: 47099,
    },
    {
      fakulte: 'Mühendislik Fakültesi',
      program: 'Makine Mühendisliği',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 62,
      tabanPuan: 441.2362,
      sira: 54297,
    },
    {
      fakulte: 'Mühendislik Fakültesi',
      program: 'Kimya Mühendisliği',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 432.98531,
      sira: 62394,
    },
    {
      fakulte: 'Florence Nightingale Hemşirelik Fakültesi',
      program: 'Hemşirelik',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 200,
      yerlesen: 205,
      tabanPuan: 404.36348,
      sira: 93598,
    },
    {
      fakulte: 'Mühendislik Fakültesi',
      program: 'İnşaat Mühendisliği',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 70,
      yerlesen: 72,
      tabanPuan: 392.38044,
      sira: 108366,
    },
    {
      fakulte: 'Mühendislik Fakültesi',
      program: 'Çevre Mühendisliği',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 361.31917,
      sira: 153638,
    },
    // 4 Yıllık Programlar (EA)
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Rehberlik ve Psikolojik Danışmanlık',
      puanTuru: 'EA',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 41,
      tabanPuan: 371.2199,
      sira: 74441,
    },
    {
      fakulte: 'Sağlık Bilimleri Fakültesi',
      program: 'Sağlık Yönetimi',
      puanTuru: 'EA',
      yil: 2025,
      kontenjan: 60,
      yerlesen: 62,
      tabanPuan: 325.36003,
      sira: 212245,
    },
    {
      fakulte: 'Sağlık Bilimleri Fakültesi',
      program: 'Sosyal Hizmet',
      puanTuru: 'EA',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 313.94582,
      sira: 266275,
    },
    {
      fakulte: 'Spor Bilimleri Fakültesi',
      program: 'Spor Yöneticiliği',
      puanTuru: 'EA',
      yil: 2025,
      kontenjan: 44,
      yerlesen: 46,
      tabanPuan: 308.64777,
      sira: 295212,
    },
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Sınıf Öğretmenliği',
      puanTuru: 'EA',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 371.28203,
      sira: 74295,
    },
    // 4 Yıllık Programlar (SÖZ)
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Özel Eğitim Öğretmenliği',
      puanTuru: 'SÖZ',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 411.86026,
      sira: 4602,
    },
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Okul Öncesi Öğretmenliği',
      puanTuru: 'SÖZ',
      yil: 2025,
      kontenjan: 42,
      yerlesen: 44,
      tabanPuan: 389.26573,
      sira: 12939,
    },
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Türkçe Öğretmenliği',
      puanTuru: 'SÖZ',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 372.38081,
      sira: 25841,
    },
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Sosyal Bilgiler Öğretmenliği',
      puanTuru: 'SÖZ',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 41,
      tabanPuan: 359.63594,
      sira: 41493,
    },
    // 4 Yıllık Programlar (DİL)
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'İngilizce Öğretmenliği (İngilizce)',
      puanTuru: 'DİL',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 444.43702,
      sira: 7678,
    },
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Almanca Öğretmenliği (Almanca)',
      puanTuru: 'DİL',
      yil: 2025,
      kontenjan: 50,
      yerlesen: 52,
      tabanPuan: 401.08912,
      sira: 21199,
    },
    {
      fakulte: 'Hasan Ali Yücel Eğitim Fakültesi',
      program: 'Fransızca Öğretmenliği (Fransızca)',
      puanTuru: 'DİL',
      yil: 2025,
      kontenjan: 30,
      yerlesen: 31,
      tabanPuan: 400.93727,
      sira: 21252,
    },
    // 5 Yıllık Programlar (SAY)
    {
      fakulte: 'Veteriner Fakültesi',
      program: 'Veteriner',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 70,
      yerlesen: 72,
      tabanPuan: 424.86345,
      sira: 70808,
    },
    {
      fakulte: 'Diş Hekimliği Fakültesi',
      program: 'Diş Hekimliği (İngilizce)',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 30,
      yerlesen: 31,
      tabanPuan: 476.21615,
      sira: 24907,
    },
    {
      fakulte: 'Eczacılık Fakültesi',
      program: 'Eczacılık (İngilizce)',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 40,
      yerlesen: 41,
      tabanPuan: 455.20117,
      sira: 41457,
    },
    // 6 Yıllık Programlar (SAY)
    {
      fakulte: 'Cerrahpaşa Tıp Fakültesi',
      program: 'Tıp (İngilizce)',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 65,
      yerlesen: 67,
      tabanPuan: 533.46922,
      sira: 1391,
    },
    {
      fakulte: 'Cerrahpaşa Tıp Fakültesi',
      program: 'Tıp',
      puanTuru: 'SAY',
      yil: 2025,
      kontenjan: 270,
      yerlesen: 277,
      tabanPuan: 524.0682,
      sira: 3082,
    },
  ]

  const years = [2025, 2024, 2023, 2022]
  const puanTurleri = ['Tümü', 'TYT', 'SAY', 'EA', 'SÖZ', 'DİL']

  const filteredPrograms = programs.filter((program) => {
    const matchesYear = program.yil === selectedYear
    const matchesPuanTuru =
      selectedPuanTuru === 'Tümü' || program.puanTuru === selectedPuanTuru
    const matchesSearch =
      searchTerm === '' ||
      program.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.fakulte.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesYear && matchesPuanTuru && matchesSearch
  })

  const formatNumber = (num: number | string): string => {
    if (typeof num === 'string') return num
    if (num >= 1000) {
      return num.toLocaleString('tr-TR')
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">İUC Taban Puanları</h1>
          <p className="text-gray-600">
            İstanbul Üniversitesi-Cerrahpaşa 2022-2025 Yılları Taban Puanları ve Başarı Sıralamaları
          </p>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Yıl Filtresi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yıl</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Puan Türü Filtresi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Puan Türü</label>
              <select
                value={selectedPuanTuru}
                onChange={(e) => setSelectedPuanTuru(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {puanTurleri.map((tur) => (
                  <option key={tur} value={tur}>
                    {tur}
                  </option>
                ))}
              </select>
            </div>

            {/* Arama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program veya Fakülte Ara
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Arama yapın..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Sonuçlar */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Fakülte/Yüksekokul
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Program
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                    Puan Türü
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                    Kontenjan
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                    Yerleşen
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                    Taban Puan
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                    Başarı Sırası
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((program, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800 text-sm">
                        {program.fakulte}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800 font-medium">
                        {program.program}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">
                          {program.puanTuru}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                        {program.kontenjan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                        {program.yerlesen}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-700 font-medium">
                        {typeof program.tabanPuan === 'number'
                          ? program.tabanPuan.toFixed(5)
                          : program.tabanPuan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                        {typeof program.sira === 'number' ? formatNumber(program.sira) : program.sira}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      Seçilen kriterlere uygun program bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bilgilendirme */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">📌 Önemli Notlar</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • Taban puanlar ve başarı sıralamaları ÖSYM tarafından açıklanan resmi verilerdir.
            </li>
            <li>
              • "Dolmadı" ifadesi, o yıl için kontenjanın dolmadığını gösterir.
            </li>
            <li>
              • Puan türleri: TYT (Temel Yeterlilik Testi), SAY (Sayısal), EA (Eşit Ağırlık), SÖZ
              (Sözel), DİL (Dil).
            </li>
            <li>
              • Taban puanlar her yıl değişebilir. Güncel bilgiler için ÖSYM'nin resmi
              açıklamalarını takip ediniz.
            </li>
            <li>
              • Bu sayfadaki veriler bilgilendirme amaçlıdır. Kesin bilgiler için ilgili fakülte
              veya birimlerle iletişime geçiniz.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BaseScoresPage


