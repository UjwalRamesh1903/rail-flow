import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, phone: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('irctc-user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback((email: string, _password: string) => {
    const mockUser: User = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      phone: '9876543210',
    }
    setUser(mockUser)
    localStorage.setItem('irctc-user', JSON.stringify(mockUser))
    return true
  }, [])

  const signup = useCallback((name: string, email: string, phone: string, _password: string) => {
    const newUser: User = { name, email, phone }
    setUser(newUser)
    localStorage.setItem('irctc-user', JSON.stringify(newUser))
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('irctc-user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
