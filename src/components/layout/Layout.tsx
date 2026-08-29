import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { ToastContainer } from '../ui/ToastContainer'
import { useLanguage } from '../../context/LanguageContext'

export function Layout() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-[#111827] border-t border-white/10 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          <p>{t('footer.copyright')}</p>
          <p className="mt-1">{t('footer.disclaimer')}</p>
        </div>
      </footer>
      <ToastContainer />
    </div>
  )
}
