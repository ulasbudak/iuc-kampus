import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import UserMenu from './UserMenu'

const Navigation = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Anasayfa' },
    { path: '/news', label: 'Haber' },
    { path: '/events', label: 'Etkinlik' },
    { path: '/announcements', label: 'İlan' },
    { path: '/qa', label: 'Soru-Cevap' },
    { path: '/scholarships', label: 'Burs' },
    { path: '/careers', label: 'Kariyer' },
    { path: '/notes', label: 'Ders Notu' },
    { path: '/courses', label: 'Kurslar' },
    { path: '/dorms', label: 'Yurt' },
    { path: '/competitions', label: 'Yarışmalar' },
    { path: '/club-activities', label: 'Kulüp Faaliyetleri' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-2">
          <div className="flex items-center">
            <Link to="/" className="flex items-center -ml-[150px]">
              <img 
                src="/logo.png" 
                alt="IUC Kampüs Logo" 
                className="h-9 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-4 flex items-center space-x-2">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t mt-2">
              {isAuthenticated ? (
                <div className="px-3 py-2">
                  <UserMenu />
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700 text-center"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation


