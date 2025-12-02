import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="IUC Kampüs Logo" 
                className="h-18 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              İstanbul Üniversitesi-Cerrahpaşa öğrenci ve mezun platformu.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white">
                  Haber & Duyurular
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white">
                  Etkinlikler
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-gray-400 hover:text-white">
                  İlanlar
                </Link>
              </li>
              <li>
                <Link to="/qa" className="text-gray-400 hover:text-white">
                  Soru-Cevap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Bilgiler</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Akademik Takvim</li>
              <li>Yemekhane Menüsü</li>
              <li>Otopark Bilgileri</li>
              <li>Ring Saatleri</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@iuckampus.com</li>
              <li>İstanbul Üniversitesi-Cerrahpaşa</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2025 İUC Kampüs. Tüm hakları saklıdır.</p>
          <p className="mt-2">
            İstanbul Üniversitesi-Cerrahpaşa öğrencileri ve mezunları tarafından yönetilmektedir.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


