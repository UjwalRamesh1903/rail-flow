import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '../types'

export const DEMO_USERS: { name: string; password: string; email: string; phone: string }[] = [
  { name: 'Rohit Sharma', password: 'Hitman', email: 'rohit.sharma@irctc.in', phone: '9876543210' },
  { name: 'Tony Stark', password: 'Ironman', email: 'tony.stark@irctc.in', phone: '9876543211' },
  { name: 'Ujwal Ramesh', password: 'Guddu', email: 'ujwal.ramesh@irctc.in', phone: '9876543212' },
]

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (identifier: string, password: string) => boolean
  signup: (name: string, email: string, phone: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function findDemoUser(identifier: string, password: string) {
  const normalized = identifier.trim().toLowerCase()
  return DEMO_USERS.find(
    (u) =>
      u.password === password &&
      (u.name.toLowerCase() === normalized ||
        u.email.toLowerCase() === normalized ||
        u.name.toLowerCase().replace(/\s+/g, '') === normalized.replace(/\s+/g, ''))
  )
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('irctc-user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback((identifier: string, password: string) => {
    const match = findDemoUser(identifier, password)
    if (!match) return false

    const loggedIn: User = { name: match.name, email: match.email, phone: match.phone }
    setUser(loggedIn)
    localStorage.setItem('irctc-user', JSON.stringify(loggedIn))
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
