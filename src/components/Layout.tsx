import { Outlet } from 'react-router-dom'
import Header from "@/components/Header"
import Footer from '@/components/Footer'

interface LayoutProps {
  darkMode: boolean
  toggleTheme: () => void
}

const Layout = ({ darkMode, toggleTheme }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-background text-text relative">

      {/* Hero Gradient Background - Fixed position to stay in background */}
      <div
        className="fixed inset-0 -z-10 opacity-15 dark:opacity-20 pointer-events-none"
        style={{ backgroundImage: 'var(--bg-hero-gradient)' }}
      />

      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  )
}

export default Layout
