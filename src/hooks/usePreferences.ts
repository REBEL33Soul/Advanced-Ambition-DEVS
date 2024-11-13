import { useState, useEffect } from 'react'
import { UserPreferencesSchema } from '../config/preferences'
import type { z } from 'zod'

type Preferences = z.infer<typeof UserPreferencesSchema>

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const stored = localStorage.getItem('user-preferences')
    if (stored) {
      try {
        return UserPreferencesSchema.parse(JSON.parse(stored))
      } catch {
        return UserPreferencesSchema.parse({})
      }
    }
    return UserPreferencesSchema.parse({})
  })

  useEffect(() => {
    localStorage.setItem('user-preferences', JSON.stringify(preferences))
  }, [preferences])

  const updatePreferences = (updates: Partial<Preferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...updates
    }))
  }

  return { preferences, updatePreferences }
}