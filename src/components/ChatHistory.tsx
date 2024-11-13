import React from 'react'
import { useChatHistory } from '../hooks/useChatHistory'
import { formatDistanceToNow } from 'date-fns'

export function ChatHistory() {
  const { conversations, loadConversation } = useChatHistory()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Chat History</h2>
      
      <div className="space-y-4">
        {conversations.map(chat => (
          <div 
            key={chat.id}
            className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => loadConversation(chat.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{chat.title}</h3>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(chat.lastMessageAt))} ago
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {chat.lastMessage}
            </p>
            <div className="mt-2 flex gap-2">
              {chat.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}