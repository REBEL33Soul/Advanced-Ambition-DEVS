import { useState, useCallback } from 'react'
import { AuthConfig } from '../config/auth'

export function useSubscription() {
  const [currentPlan, setCurrentPlan] = useState(() => {
    // Get current plan from local storage
    const stored = localStorage.getItem('subscription')
    return stored ? JSON.parse(stored) : null
  })

  const [billingHistory, setBillingHistory] = useState([])

  const changePlan = useCallback(async (planId: string) => {
    try {
      const response = await fetch('/api/subscription/change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      })

      if (!response.ok) throw new Error('Failed to change plan')

      const newPlan = await response.json()
      setCurrentPlan(newPlan)
      localStorage.setItem('subscription', JSON.stringify(newPlan))

      return true
    } catch (error) {
      console.error('Failed to change plan:', error)
      return false
    }
  }, [])

  const cancelSubscription = useCallback(async () => {
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST'
      })

      if (!response.ok) throw new Error('Failed to cancel subscription')

      setCurrentPlan(null)
      localStorage.removeItem('subscription')

      return true
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
      return false
    }
  }, [])

  return {
    currentPlan,
    changePlan,
    cancelSubscription,
    billingHistory
  }
}