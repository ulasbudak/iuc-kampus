// Yarışma verileri ve yardımcı fonksiyonlar

export interface Competition {
  id: number
  title: string
  subtitle: string
  shortDescription: string
  organizer: string
  deadline: string
  link: string
  email?: string
  details: {
    description: string
    schedule?: Array<{ title: string; date: string }>
    prizes?: Array<{ rank: string; amount: string }>
    themes?: string[]
    seminars?: Array<{ date: string; title: string; time: string }>
    requirements?: string[]
  }
}

// Türkçe tarih string'ini Date objesine çevir
const parseTurkishDate = (dateStr: string): Date | null => {
  const months: { [key: string]: number } = {
    'ocak': 0, 'şubat': 1, 'mart': 2, 'nisan': 3, 'mayıs': 4, 'haziran': 5,
    'temmuz': 6, 'ağustos': 7, 'eylül': 8, 'ekim': 9, 'kasım': 10, 'aralık': 11
  }

  const parts = dateStr.toLowerCase().trim().split(' ')
  if (parts.length < 2) return null

  const day = parseInt(parts[0])
  const monthName = parts[1]
  const year = parts[2] ? parseInt(parts[2]) : new Date().getFullYear()

  const month = months[monthName]
  if (month === undefined || isNaN(day) || isNaN(year)) return null

  return new Date(year, month, day)
}

// Aktif yarışma sayısını hesapla
export const getActiveCompetitionsCount = (competitions: Competition[]): number => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return competitions.filter((competition) => {
    const deadline = parseTurkishDate(competition.deadline)
    if (!deadline) return false
    deadline.setHours(23, 59, 59, 999)
    return deadline >= today
  }).length
}

// Yarışma verileri
export const competitions: Competition[] = [
  {
    id: 1,
    title: 'Yarının Teknoloji Liderleri',
    subtitle: 'Genç Zihinler, Dönüştüren Fikirler',
    shortDescription:
      'Üniversite öğrencilerinin yenilikçi teknoloji projelerini hayata geçirecekleri bir yarışma. Türkiye genelinde lisans öğrencilerine açık.',
    organizer: 'Turkcell',
    deadline: '15 Şubat 2026',
    link: 'https://www.turkcell.com.tr/yarininteknolojiliderleri/',
    email: 'teknolojilideri@turkcell.com.tr',
    details: {
      description:
        'Yarının Teknoloji Liderleri, üniversite öğrencilerinin yenilikçi teknoloji projelerini hayata geçirecekleri bir yarışmadır. Gençlerin yarını şekillendiren projelerini keşfetmelerini ve bu fikirleri hayata geçirerek teknoloji ekosistemine ve topluma katkı sunmalarını destekliyoruz. Yarışma, Türkiye\'nin dört bir yanındaki lisans öğrencilerine açıktır.',
      schedule: [
        { title: 'Başvuruların Açılması', date: '1 Kasım 2025' },
        { title: 'Başvuru Dönemi', date: '1 Kasım 2025 - 15 Şubat 2026' },
        { title: 'Değerlendirme Dönemi', date: '15 Şubat 2026 - 15 Mayıs 2026' },
        { title: 'Final', date: '23-26 Mayıs 2026' },
        { title: 'Ödül Töreni', date: '29 Mayıs 2026' },
      ],
      prizes: [
        { rank: 'Birincilik', amount: '1.000.000 TL' },
        { rank: 'İkincilik', amount: '800.000 TL' },
        { rank: 'Üçüncülük', amount: '600.000 TL' },
        { rank: 'Jüri Özel Ödülü (3 adet)', amount: '300.000 TL' },
      ],
      themes: [
        'Yeni Nesil Mobil İletişim (5G/6G)',
        'Bulut Bilişim ve Edge Computing',
        'IoT, Akıllı Cihazlar ve Şehir Teknolojileri',
        'Siber Güvenlik ve Dijital Koruma',
        'Finansal ve Ticari Dijital Dönüşüm',
        'Büyük Veri ve Veri Analizi',
        'Yapay Zeka ve Makine Öğrenimi',
        'Çevre Dostu ve Sürdürülebilir Teknolojiler',
        'Dijital Eğlence ve Oyun Dünyası',
        'Dijital Sağlık ve Dijital Eğitim Teknolojileri',
        'Herkes İçin Erişilebilirlik ve Kapsayıcılık',
      ],
      seminars: [
        { date: '28.11.2025', title: 'Yarının Teknoloji Liderleri 2026: Yol Haritası ve Yeni Dönem', time: '20:00' },
        { date: '08.12.2025', title: 'Yarının Teknoloji Liderleri: 5G ile Geleceğe Bağlan', time: '20:00' },
        { date: '12.12.2025', title: 'Yarının Teknoloji Liderleri: Turkcell\'de Yapay Zeka', time: '20:00' },
        { date: '16.12.2025', title: 'Decode the Team - Farklı Zihinlerle Ortak Başarı', time: '19:00' },
        { date: '29.12.2025', title: 'Drive the Future - Geleceği Şekillendiren Teknoloji Trendleri', time: '19:00' },
      ],
      requirements: [
        'Türkiye\'deki üniversitelerde örgün öğretim gören lisans öğrencileri katılabilir',
        'Yarışmaya katılım tamamen ücretsizdir',
        'Bireysel olarak veya maksimum 3 kişiden oluşan ekip halinde başvurulabilir',
        'Her katılımcı, farklı proje temalarında olmak kaydıyla 3 farklı proje ile yarışmaya katılım sağlayabilir',
        'Daha önce farklı bir mecrada yayımlanmış projelerle başvuru yapılamaz',
      ],
    },
  },
  // Diğer yarışmalar buraya eklenecek
]

