import { format } from 'date-fns'
import tr from 'date-fns/locale/tr'

interface MenuItem {
  date: string
  items: string[]
  calories: number
}

const CafeteriaPage = () => {
  const menus: MenuItem[] = [
    { date: '2025-12-01', items: ['Düğün Çorbası', 'Etsiz Kuru Fasulye', 'Tavuklu Pirinç Pilavı', 'Karışık Turşu'], calories: 1006 },
    { date: '2025-12-02', items: ['Sebze Çorbası', 'Tas Kebabı', 'Şehriyeli Bulgur Pilavı', 'Ayran'], calories: 1075 },
    { date: '2025-12-03', items: ['Mercimek Çorbası', 'Kadınbudu Köfte (Püre Garnili)', 'Zeytinyağlı Taze Fasulye', 'Cevizli Baklava'], calories: 1194 },
    { date: '2025-12-04', items: ['Tarhana Çorbası', 'Fırın Piliç But (Patates Garnili)', 'Cevizli Erişte', 'Mevsim Salata'], calories: 1053 },
    { date: '2025-12-05', items: ['Tel Şehriye Çorbası', 'Etli Bezelye Yemeği', 'Pirinç Pilavı', 'Mandalina'], calories: 1043 },
    { date: '2025-12-08', items: ['Prenses Çorbası', 'Etsiz Kış Türlüsü', 'Bolonez Soslu Makarna', 'Muz'], calories: 1028 },
    { date: '2025-12-09', items: ['Mercimek Çorbası', 'Kıymalı Biber Dolması (Yoğurt Garnili)', 'Peynirli Su Böreği', 'Supangle'], calories: 1114 },
    { date: '2025-12-10', items: ['Kremalı Mantar Çorbası', 'Dana Kızartma', 'Arpa Şehriyeli Pirinç Pilavı', 'Mevsim Salata'], calories: 1087 },
    { date: '2025-12-11', items: ['Yayla Çorbası', 'Kuru Köfte (Patates Garnili)', 'Zeytinyağlı Barbunya', 'Portakal'], calories: 1035 },
    { date: '2025-12-12', items: ['Ezogelin Çorbası', 'Fırında Somon (Patates Garnili)', 'Akdeniz Salatası', 'Cevizli Balkabağı Tatlısı'], calories: 1146 },
    { date: '2025-12-15', items: ['Düğün Çorbası', 'Etli Nohut Yemeği', 'Pirinç Pilavı', 'Havuç Tarator'], calories: 1031 },
    { date: '2025-12-16', items: ['Mercimek Çorbası', 'Çıtır Tavuk (Patates Garnili)', 'Yoğurtlu Ispanak', 'Cevizli Tel Kadayıf'], calories: 1202 },
    { date: '2025-12-17', items: ['Tarhana Çorbası', 'Etsiz Taze Fasulye', 'Kıymalı Kol Böreği', 'Ayran'], calories: 1070 },
    { date: '2025-12-18', items: ['Toyga Çorbası', 'Çoban Kavurma', 'Arpa Şehriyeli Pirinç Pilavı', 'Mevsim Salata'], calories: 1087 },
    { date: '2025-12-19', items: ['Kaşarlı Domates Çorbası', 'Çiftlik Köfte', 'Peynirli Makarna', 'Muz'], calories: 1085 },
    { date: '2025-12-22', items: ['Şehriyeli Tavuksuyu Çorbası', 'Etsiz Yeşil Mercimek', 'Bolonez Soslu Makarna', 'Yoğurt'], calories: 1064 },
    { date: '2025-12-23', items: ['Kremalı Mantar Çorbası', 'Rosto Köfte (Püre Garnili)', 'Şehriyeli Bulgur Pilavı', 'Bademli Keşkül'], calories: 1171 },
    { date: '2025-12-24', items: ['Mercimek Çorbası', 'Kıymalı Ispanak (Yoğurt Garnili)', 'Peynirli Su Böreği', 'Mandalina'], calories: 1080 },
    { date: '2025-12-25', items: ['Kaşarlı Domates Çorbası', 'Piliç Roti (Patates Garnili)', 'Pirinç Pilavı', 'Akdeniz Salatası'], calories: 1025 },
    { date: '2025-12-26', items: ['Yoğurt Çorbası', 'Şehriyeli Güveç', 'Zeytinyağlı Kereviz', 'Fındıklı Şekerpare'], calories: 1217 },
    { date: '2025-12-29', items: ['Mercimek Çorbası', 'Etli Bezelye', 'Bulgur Pilavı', 'Portakal'], calories: 1043 },
    { date: '2025-12-30', items: ['Sebze Çorbası', 'Mantarlı Et Sote', 'Pirinç Pilavı', 'Mevsim Salata'], calories: 1053 },
    { date: '2025-12-31', items: ['Tarhana Çorbası', 'Tavuk Külbastı (Patates Garnili)', 'Soslu Makarna', 'Sütlaç'], calories: 1170 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🍽️ Yemekhane Menüsü</h1>
          <p className="text-gray-600">Aralık 2025 Yemekhane Menüsü</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <div
              key={menu.date}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-primary-600 mb-1">
                  {format(new Date(menu.date), 'd MMMM yyyy', { locale: tr })}
                </h3>
                <div className="text-sm text-gray-500">
                  {format(new Date(menu.date), 'EEEE', { locale: tr })}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {menu.items.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Toplam Kalori</span>
                  <span className="text-lg font-bold text-primary-600">
                    {menu.calories} Kalori
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">📌 Notlar</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Menü hafta içi günler için geçerlidir.</li>
            <li>• Kalori değerleri yaklaşık değerlerdir.</li>
            <li>• Menü değişikliklerinden yemekhane yönetimi sorumludur.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CafeteriaPage


