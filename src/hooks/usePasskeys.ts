import { useState, useCallback } from 'react'
import { startRegistration, startAuthentication } from '@simplewebauthn/browser'

export function usePasskeys() {
  const [error, setError] = useState<string | null>(null)

  const registerPasskey = useCallback(async () => {
    try {
      // Get registration options from server
      const resp = await fetch('/api/auth/passkey/register-options')
      const opts = await resp.json()

      // Create passkey
      const attResp = await startRegistration(opts)

      // Verify with server
      const verifyResp = await fetch('/api/auth/passkey/verify-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attResp)
      })

      if (!verifyResp.ok) {
        throw new Error('Failed to verify passkey')
      }

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [])

  const authenticateWithPasskey = useCallback(async () => {
    try {
      // Get authentication options from server
      const resp = await fetch('/api/auth/passkey/auth-options')
      const opts = await resp.json()

      // Authenticate with passkey
      const authResp = await startAuthentication(opts)

      // Verify with server
      const verifyResp = await fetch('/api/auth/passkey/verify-authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authResp)
      })

      if (!verifyResp.ok) {
        throw new Error('Failed to verify authentication')
      }

      const { token } = await verifyResp.json()
      return token
    } catch (err) {
      setError(err.message)
      return null
    }
  }, [])

  return {
    registerPasskey,
    authenticateWithPasskey,
    error
  }
}