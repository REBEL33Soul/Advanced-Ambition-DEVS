import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { SocialLogin } from './SocialLogin'
import { APIKeyManager } from './APIKeyManager'

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Welcome to Advanced Ambition DEVS</h2>
        
        {!user ? (
          <div className="space-y-4">
            <SocialLogin />
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
            
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              <button className="w-full bg-primary-600 text-white p-2 rounded">
                Sign In
              </button>
            </form>
          </div>
        ) : (
          <APIKeyManager />
        )}
      </div>
    </div>
  )
}