import React, { useState } from 'react'
import { useAI } from '../hooks/useAI'
import { useModelStore } from '../stores/models'

export function AIAssistant() {
  const [message, setMessage] = useState('')
  const { sendMessage, isTyping, conversation } = useAI()
  const { selectedModel } = useModelStore()

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h3 className="font-semibold">AI Assistant</h3>
          <p className="text-sm text-gray-500">Using {selectedModel}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-primary-100 text-primary-900' : 'bg-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={(e) => {
          e.preventDefault()
          sendMessage(message)
          setMessage('')
        }}>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 p-2 border rounded"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}