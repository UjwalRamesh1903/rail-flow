import { useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { LoginModal } from './LoginModal'
import { Button } from '../ui/Button'

interface RequireAuthProps {
  children: ReactNode
  title?: string
}

export function RequireAuth({ children, title }: RequireAuthProps) {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) setAuthOpen(true)
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-irctc-blue-light/40 flex items-center justify-center mx-auto mb-5">
            <LogIn className="w-8 h-8 text-irctc-blue" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100 mb-2">
            {title || t('auth.loginRequiredTitle')}
          </h1>
          <p className="text-gray-400 mb-6">{t('auth.loginRequired')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setAuthOpen(true)} size="lg">
              {t('auth.loginBtn')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} size="lg">
              {t('nav.home')}
            </Button>
          </div>
        </div>
        <LoginModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          onSuccess={() => setAuthOpen(false)}
        />
      </>
    )
  }

  return <>{children}</>
}
