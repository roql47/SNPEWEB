import { createContext, useContext, useState, useEffect } from 'react'

const AdminAuthContext = createContext(null)

const ADMIN_KEY = 'snpe_admin_token'
const ADMIN_ID = import.meta.env.VITE_ADMIN_ID || 'admin'
const ADMIN_PW = import.meta.env.VITE_ADMIN_PW || 'snpe2026!'

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.expiry > Date.now()) {
          setAdmin(parsed)
        } else {
          localStorage.removeItem(ADMIN_KEY)
        }
      } catch {
        localStorage.removeItem(ADMIN_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = (id, pw) => {
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      const token = {
        id,
        loggedInAt: Date.now(),
        expiry: Date.now() + 24 * 60 * 60 * 1000,
      }
      localStorage.setItem(ADMIN_KEY, JSON.stringify(token))
      setAdmin(token)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem(ADMIN_KEY)
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
