import React from 'react'
import { useSubscription } from '../../hooks/useSubscription'
import { AuthConfig } from '../../config/auth'

export function SubscriptionManager() {
  const { 
    currentPlan, 
    changePlan, 
    cancelSubscription, 
    billingHistory 
  } = useSubscription()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Subscription</h2>
          <p className="text-gray-600">Manage your subscription and billing</p>
        </div>
        {currentPlan && (
          <div className="text-right">
            <p className="font-medium">Current Plan: {currentPlan.name}</p>
            <p className="text-sm text-gray-500">
              Next billing date: {new Date(currentPlan.nextBilling).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Plan Selection */}
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(AuthConfig.subscription.plans).map(([key, plan]) => (
            <div 
              key={key}
              className={`p-4 border rounded-lg ${
                currentPlan?.name === key ? 'border-primary-500 bg-primary-50' : ''
              }`}
            >
              <h3 className="font-semibold capitalize">{key}</h3>
              <p className="text-2xl font-bold mt-2">
                ${typeof plan.price === 'object' ? plan.price.monthly : 'Custom'}
                {typeof plan.price === 'object' && (
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                )}
              </p>
              <ul className="mt-4 space-y-2">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature.replace(/-/g, ' ')}
                  </li>
                ))}
              </ul>
              {currentPlan?.name !== key && (
                <button
                  onClick={() => changePlan(key)}
                  className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                >
                  Switch to {key}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Cancel Subscription */}
        {currentPlan && (
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Cancel Subscription</h3>
            <p className="text-gray-600 mb-4">
              Your subscription will remain active until the end of your current billing period.
            </p>
            <button
              onClick={cancelSubscription}
              className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              Cancel Subscription
            </button>
          </div>
        )}

        {/* Billing History */}
        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Billing History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map(bill => (
                  <tr key={bill.id} className="border-b">
                    <td className="py-2">{new Date(bill.date).toLocaleDateString()}</td>
                    <td>{bill.description}</td>
                    <td>${bill.amount}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-sm ${
                        bill.status === 'paid' ? 'bg-green-100 text-green-800' :
                        bill.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td>
                      <a 
                        href={bill.invoiceUrl}
                        className="text-primary-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}