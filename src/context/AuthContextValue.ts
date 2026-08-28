import { createContext } from 'react'
import type { User } from '../types'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, phone: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
