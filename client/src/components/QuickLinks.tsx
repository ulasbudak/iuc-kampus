import { Link } from 'react-router-dom'

const QuickLinks = () => {
  const links = [
    { icon: '🍽️', label: 'Yemekhane', to: '/cafeteria' },
    { icon: '🚌', label: 'Ring Saatleri', to: '/ring-schedule' },
    { icon: '📅', label: 'Akademik Takvim', to: '/academic-calendar' },
    { icon: '🚗', label: 'Otopark Tarifesi', to: '/parking' },
    { icon: '📊', label: 'İUC Taban Puanları', to: '/base-scores' },
    { icon: '🏠', label: 'Yurtlar', to: '/dorms' },
    { icon: '📚', label: 'Kurslar', to: '/courses' },
    { icon: '📱', label: 'WhatsApp Grubu', to: '/whatsapp' },
    { icon: '📞', label: 'İletişim', to: '/contact' },
  ]

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <span className="text-2xl mb-1">{link.icon}</span>
              <span className="text-xs text-gray-700 font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickLinks




