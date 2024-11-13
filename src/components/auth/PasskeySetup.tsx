import React, { useState } from 'react'
import { usePasskeys } from '../../hooks/usePasskeys'

export function PasskeySetup() {
  const { registerPasskey, error } = usePasskeys()
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async () => {
    setIsRegistering(true)
    try {
      const success = await registerPasskey()
      if (success) {
        // Show success message
      }
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Setup Passkey</h3>
      <p className="text-gray-600 mb-4">
        Passkeys provide a more secure way to sign in without passwords. They use biometric authentication or your device's screen lock.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleRegister}
        disabled={isRegistering}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
      >
        {isRegistering ? 'Setting up...' : 'Setup Passkey'}
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <h4 className="font-medium mb-2">Supported methods:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Face ID</li>
          <li>Touch ID</li>
          <li>Windows Hello</li>
          <li>Security Keys</li>
        </ul>
      </div>
    </div>
  )
}