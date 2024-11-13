import React, { useState } from 'react'
import { useModelStore } from '../../stores/models'

export function APIKeyManager() {
  const { apiKeys, addApiKey } = useModelStore()
  const [newKey, setNewKey] = useState({ provider: '', key: '' })

  const providers = [
    { id: 'openai', name: 'OpenAI' },
    { id: 'anthropic', name: 'Anthropic' },
    { id: 'google', name: 'Google AI' },
    { id: 'mistral', name: 'Mistral' },
    { id: 'groq', name: 'Groq' },
    { id: 'deepseek', name: 'DeepSeek' },
    { id: 'xai', name: 'xAI' }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">API Keys</h3>
      
      <div className="space-y-4">
        {providers.map(provider => (
          <div key={provider.id} className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                {provider.name}
              </label>
              <input
                type="password"
                value={apiKeys[provider.id] || ''}
                placeholder={`Enter ${provider.name} API Key`}
                onChange={(e) => addApiKey(provider.id, e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </div>
            <button 
              className="mt-6 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              onClick={() => addApiKey(provider.id, newKey.key)}
            >
              Save
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <h4 className="font-medium mb-2">Need API Keys?</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Get your API keys from:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><a href="https://platform.openai.com/api-keys" className="text-primary-600 hover:underline">OpenAI</a></li>
            <li><a href="https://console.anthropic.com/account/keys" className="text-primary-600 hover:underline">Anthropic</a></li>
            <li><a href="https://makersuite.google.com/app/apikey" className="text-primary-600 hover:underline">Google AI</a></li>
            <li><a href="https://console.mistral.ai/api-keys" className="text-primary-600 hover:underline">Mistral AI</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}