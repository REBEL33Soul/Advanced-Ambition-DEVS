import { useState, useCallback } from 'react'
import { useModelStore } from '../stores/models'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function useAI() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const { selectedModel, getBestModelForTask } = useModelStore()

  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsTyping(true)
      
      // Add user message
      setConversation(prev => [...prev, { role: 'user', content }])

      // Get best model for the task
      const model = await getBestModelForTask('CODE_GENERATION')

      // Send to API
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...conversation, { role: 'user', content }],
          model: model.id
        })
      })

      const data = await response.json()
      
      // Add AI response
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: data.message 
      }])
    } catch (error) {
      console.error('AI chat error:', error)
    } finally {
      setIsTyping(false)
    }
  }, [conversation, getBestModelForTask])

  return {
    conversation,
    isTyping,
    sendMessage
  }
}