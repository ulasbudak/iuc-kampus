import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import QuickLinks from './QuickLinks'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <QuickLinks />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout


