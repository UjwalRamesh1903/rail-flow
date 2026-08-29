import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Home, CalendarDays, CircleDot, Train, ShieldCheck,
  ChevronDown, Globe, User, Menu, X, Utensils, Hotel, Package,
  Map, Info, HelpCircle,
} from 'lucide-react'
import { IRCTCLogo } from '../ui/IRCTCLogo'
import { LoginModal } from '../auth/LoginModal'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../context/LanguageContext'
import { LANGUAGES, translations } from '../../i18n/translations'
import type { TranslationKey } from '../../i18n/translations'
import { cn } from '../../utils/cn'

const navItems: { key: TranslationKey; icon: typeof Home; path: string }[] = [
  { key: 'nav.home', icon: Home, path: '/' },
  { key: 'nav.myBookings', icon: CalendarDays, path: '/my-bookings' },
  { key: 'nav.pnrStatus', icon: CircleDot, path: '/pnr-status' },
  { key: 'nav.trains', icon: Train, path: '/trains' },
  { key: 'nav.travelInfo', icon: ShieldCheck, path: '/travel-info' },
]

const moreItems: { key: TranslationKey; icon: typeof Package; path: string }[] = [
  { key: 'nav.tourPackages', icon: Package, path: '/offers' },
  { key: 'nav.retiringRooms', icon: Hotel, path: '/offers' },
  { key: 'nav.eCatering', icon: Utensils, path: '/travel-info' },
  { key: 'nav.stationInfo', icon: Map, path: '/station-info' },
  { key: 'nav.faqs', icon: HelpCircle, path: '/faq' },
  { key: 'nav.contactUs', icon: Info, path: '/contact' },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const { showToast } = useToast()
  const { t, language, setLanguage, languageLabel } = useLanguage()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  const moreRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header className="bg-[#0a0e17]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="shrink-0">
              <IRCTCLogo />
            </Link>

            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.path)
                      ? 'text-irctc-blue bg-irctc-blue-light/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {t(item.key)}
                </Link>
              ))}

              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    moreOpen ? 'text-irctc-blue bg-irctc-blue-light/40' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {t('nav.moreLabel')} <ChevronDown className={cn('w-4 h-4 transition-transform', moreOpen && 'rotate-180')} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-[#1a2332] rounded-xl shadow-xl border border-white/10 py-1 animate-slide-down">
                    {moreItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => { navigate(item.path); setMoreOpen(false) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {t(item.key)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-white/15 rounded-full text-sm text-gray-300 hover:border-irctc-blue transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden md:inline">{languageLabel}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 w-40 bg-[#1a2332] rounded-xl shadow-xl border border-white/10 py-1 animate-slide-down">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setLangOpen(false)
                          showToast(translations[lang.code]['lang.changed'], 'info')
                        }}
                        className={cn(
                          'w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/5 transition-colors',
                          language === lang.code && 'text-irctc-blue font-medium bg-irctc-blue-light/30'
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline text-sm font-medium text-gray-300">{user?.name}</span>
                  <button
                    onClick={() => { logout(); showToast(t('auth.logoutSuccess'), 'info') }}
                    className="text-sm text-gray-400 hover:text-white font-medium px-3 py-2"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="flex items-center gap-1.5 bg-irctc-blue text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-irctc-blue-dark transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('nav.loginSignup')}</span>
                  <span className="sm:hidden">{t('nav.login')}</span>
                </button>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden border-t border-white/10 bg-[#111827] animate-slide-down">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                    isActive(item.path) ? 'text-irctc-blue bg-irctc-blue-light/40' : 'text-gray-300'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {t(item.key)}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-2 mt-2">
                {moreItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300"
                  >
                    <item.icon className="w-4 h-4" />
                    {t(item.key)}
                  </button>
                ))}
              </div>
              <div className="border-t border-white/10 pt-2 mt-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); showToast(translations[lang.code]['lang.changed'], 'info') }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
                      language === lang.code ? 'text-irctc-blue bg-irctc-blue-light/40' : 'text-gray-300'
                    )}
                  >
                    <Globe className="w-4 h-4" />
                    {lang.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      <LoginModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
