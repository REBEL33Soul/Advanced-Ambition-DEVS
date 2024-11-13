import { useState, useEffect } from 'react'
import { AuthConfig } from '../config/auth'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('auth_token')
    if (token) {
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const signInWithProvider = async (provider: 'github' | 'google' | 'apple') => {
    try {
      const response = await fetch('/api/auth/' + provider)
      const data = await response.json()
      
      if (data.token) {
        localStorage.setItem('auth_token', data.token)
        setUser(data.user)
      }
    } catch (error) {
      console.error('Authentication failed:', error)
    }
  }

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      
      if (data.valid) {
        setUser(data.user)
      } else {
        localStorage.removeItem('auth_token')
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('auth_token')
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  return {
    user,
    loading,
    signInWithProvider,
    signOut
  }
}