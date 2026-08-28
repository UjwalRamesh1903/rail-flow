import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Home, Ticket, CalendarDays, CircleDot, Train, ShieldCheck,
  ChevronDown, Globe, User, Menu, X, Utensils, Hotel, Package,
  Map, Info, HelpCircle,
} from 'lucide-react'
import { IRCTCLogo } from '../ui/IRCTCLogo'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/useAuth'
import { useToast } from '../../context/useToast'
import { cn } from '../../utils/cn'

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Book Ticket', icon: Ticket, path: '/book-ticket' },
  { label: 'My Bookings', icon: CalendarDays, path: '/my-bookings' },
  { label: 'PNR Status', icon: CircleDot, path: '/pnr-status' },
  { label: 'Trains', icon: Train, path: '/trains' },
  { label: 'Travel Info', icon: ShieldCheck, path: '/travel-info' },
]

const moreItems = [
  { label: 'Tour Packages', icon: Package, path: '/offers' },
  { label: 'Retiring Rooms', icon: Hotel, path: '/offers' },
  { label: 'E-Catering', icon: Utensils, path: '/travel-info' },
  { label: 'Station Info', icon: Map, path: '/station-info' },
  { label: 'FAQs', icon: HelpCircle, path: '/faq' },
  { label: 'Contact Us', icon: Info, path: '/contact' },
]

const languages = ['English', 'हिन्दी', 'தமிழ்', 'বাংলা', 'मराठी', 'ગુજરાતી']

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, login, signup, logout } = useAuth()
  const { showToast } = useToast()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [selectedLang, setSelectedLang] = useState('English')

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

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (authMode === 'login') {
      const email = fd.get('email') as string
      const password = fd.get('password') as string
      if (!email || !password) { showToast('Please fill all fields', 'error'); return }
      login(email, password)
      showToast('Logged in successfully!', 'success')
    } else {
      const name = fd.get('name') as string
      const email = fd.get('email') as string
      const phone = fd.get('phone') as string
      const password = fd.get('password') as string
      if (!name || !email || !phone || !password) { showToast('Please fill all fields', 'error'); return }
      signup(name, email, phone, password)
      showToast('Account created successfully!', 'success')
    }
    setAuthOpen(false)
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="shrink-0">
              <IRCTCLogo />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.path)
                      ? 'text-irctc-blue bg-irctc-blue-light/50'
                      : 'text-gray-600 hover:text-irctc-blue hover:bg-gray-50'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}

              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    moreOpen ? 'text-irctc-blue bg-irctc-blue-light/50' : 'text-gray-600 hover:text-irctc-blue hover:bg-gray-50'
                  )}
                >
                  More <ChevronDown className={cn('w-4 h-4 transition-transform', moreOpen && 'rotate-180')} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 animate-slide-down">
                    {moreItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { navigate(item.path); setMoreOpen(false) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-irctc-blue-light/50 hover:text-irctc-blue transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-irctc-blue transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden md:inline">{selectedLang}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 animate-slide-down">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setSelectedLang(lang); setLangOpen(false); showToast(`Language changed to ${lang}`, 'info') }}
                        className={cn(
                          'w-full px-4 py-2 text-sm text-left hover:bg-irctc-blue-light/50 transition-colors',
                          selectedLang === lang && 'text-irctc-blue font-medium bg-irctc-blue-light/30'
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name}</span>
                  <button
                    onClick={() => { logout(); showToast('Logged out successfully', 'info') }}
                    className="text-sm text-gray-600 hover:text-irctc-blue font-medium px-3 py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthMode('login'); setAuthOpen(true) }}
                  className="flex items-center gap-1.5 bg-irctc-blue text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-irctc-blue-dark transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login / Signup</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-gray-100 bg-white animate-slide-down">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                    isActive(item.path) ? 'text-irctc-blue bg-irctc-blue-light/50' : 'text-gray-600'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-2 mt-2">
                {moreItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { setMobileOpen(false); navigate(item.path) }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <Modal isOpen={authOpen} onClose={() => setAuthOpen(false)} title={authMode === 'login' ? 'Login' : 'Sign Up'} size="sm">
        <form onSubmit={handleAuth} className="p-6 space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="name" type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" placeholder="Enter your name" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" placeholder="Enter your email" />
          </div>
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input name="phone" type="tel" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" placeholder="Enter phone number" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" type="password" required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" placeholder="Enter password" />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {authMode === 'login' ? 'Login' : 'Create Account'}
          </Button>
          <p className="text-center text-sm text-gray-500">
            {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-irctc-blue font-semibold hover:underline"
            >
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      </Modal>
    </>
  )
}
