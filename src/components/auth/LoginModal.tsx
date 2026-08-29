import { useState, useEffect } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  initialMode?: 'login' | 'signup'
}

export function LoginModal({ isOpen, onClose, onSuccess, initialMode = 'login' }: LoginModalProps) {
  const { login, signup } = useAuth()
  const { t } = useLanguage()
  const { showToast } = useToast()
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode)

  useEffect(() => {
    if (isOpen) setAuthMode(initialMode)
  }, [isOpen, initialMode])

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    if (authMode === 'login') {
      const identifier = fd.get('identifier') as string
      const password = fd.get('password') as string
      if (!identifier || !password) {
        showToast(t('auth.fillAll'), 'error')
        return
      }
      const ok = login(identifier, password)
      if (!ok) {
        showToast(t('auth.invalidCredentials'), 'error')
        return
      }
      showToast(t('auth.loginSuccess'), 'success')
      onClose()
      onSuccess?.()
    } else {
      const name = fd.get('name') as string
      const email = fd.get('email') as string
      const phone = fd.get('phone') as string
      const password = fd.get('password') as string
      if (!name || !email || !phone || !password) {
        showToast(t('auth.fillAll'), 'error')
        return
      }
      signup(name, email, phone, password)
      showToast(t('auth.signupSuccess'), 'success')
      onClose()
      onSuccess?.()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={authMode === 'login' ? t('auth.login') : t('auth.signup')}
      size="sm"
    >
      <form onSubmit={handleAuth} className="space-y-4">
        {authMode === 'signup' ? (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('auth.fullName')}</label>
            <input
              name="name"
              type="text"
              className="surface-input w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('auth.nameOrEmail')}</label>
            <input
              name="identifier"
              type="text"
              required
              className="surface-input w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
              placeholder={t('auth.nameOrEmailPlaceholder')}
            />
          </div>
        )}
        {authMode === 'signup' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t('auth.email')}</label>
              <input
                name="email"
                type="email"
                required
                className="surface-input w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t('auth.phone')}</label>
              <input
                name="phone"
                type="tel"
                className="surface-input w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">{t('auth.password')}</label>
          <input
            name="password"
            type="password"
            required
            className="surface-input w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
          />
        </div>
        {authMode === 'login' && (
          <p className="text-xs text-gray-500 leading-relaxed">{t('auth.demoHint')}</p>
        )}
        <Button type="submit" className="w-full" size="lg">
          {authMode === 'login' ? t('auth.loginBtn') : t('auth.createAccount')}
        </Button>
        <p className="text-center text-sm text-gray-400">
          {authMode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button
            type="button"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-irctc-blue font-semibold hover:underline"
          >
            {authMode === 'login' ? t('auth.signUp') : t('auth.loginBtn')}
          </button>
        </p>
      </form>
    </Modal>
  )
}
