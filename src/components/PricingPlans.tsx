import React from 'react'
import { AuthConfig } from '../config/auth'

export function PricingPlans() {
  const { plans } = AuthConfig.subscription

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start with a 7-day free trial. No credit card required.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Basic Plan */}
          <div className="relative bg-white rounded-2xl shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900">Basic</h3>
              <p className="mt-4 text-gray-500">Perfect for individual developers</p>
              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    ${plans.basic.price.monthly}
                  </span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  or ${plans.basic.price.yearly}/year (save ~17%)
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                {plans.basic.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-gray-700 capitalize">
                      {feature.replace(/-/g, ' ')}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white rounded-2xl shadow-xl border-2 border-primary-500">
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 text-gray-500">For professional developers and small teams</p>
              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    ${plans.pro.price.monthly}
                  </span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  or ${plans.pro.price.yearly}/year (save ~17%)
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                {plans.pro.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-gray-700 capitalize">
                      {feature.replace(/-/g, ' ')}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="relative bg-white rounded-2xl shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900">Enterprise</h3>
              <p className="mt-4 text-gray-500">Custom solutions for large organizations</p>
              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    Custom
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Contact us for custom pricing
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                {plans.enterprise.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-gray-700 capitalize">
                      {feature.replace(/-/g, ' ')}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Volume Pricing Available
          </h3>
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                App Creation Limits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <div className="font-bold text-xl text-primary-600">Basic</div>
                  <div className="mt-2">5 apps/month</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <div className="font-bold text-xl text-primary-600">Pro</div>
                  <div className="mt-2">20 apps/month</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <div className="font-bold text-xl text-primary-600">Enterprise</div>
                  <div className="mt-2">Unlimited</div>
                </div>
              </div>
              <p className="mt-6 text-gray-600 text-center">
                Need more? Contact us for custom volume pricing tailored to your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h3>
          <dl className="mt-8 max-w-3xl mx-auto space-y-6">
            <div>
              <dt className="text-lg font-semibold text-gray-900">
                What's included in the free trial?
              </dt>
              <dd className="mt-2 text-gray-600">
                All features of the Pro plan are available during your 7-day trial period.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900">
                Can I switch plans later?
              </dt>
              <dd className="mt-2 text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900">
                What payment methods do you accept?
              </dt>
              <dd className="mt-2 text-gray-600">
                We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}