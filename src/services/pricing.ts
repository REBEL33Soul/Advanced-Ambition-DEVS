import { z } from 'zod'
import { AuthConfig } from '../config/auth'
import { AppError } from '../utils/errors'

const VolumePricingSchema = z.object({
  appsPerMonth: z.number(),
  basePrice: z.number(),
  pricePerApp: z.number(),
  discount: z.number().optional()
})

export class PricingService {
  async getPlans() {
    return AuthConfig.subscription.plans
  }

  async createSubscription(userId: string, plan: string, period: string) {
    const planConfig = AuthConfig.subscription.plans[plan]
    if (!planConfig) {
      throw new AppError('Invalid plan selected', 400)
    }

    // Calculate price based on period
    const price = period === 'yearly' 
      ? planConfig.price.yearly 
      : planConfig.price.monthly

    // Create subscription record
    const subscription = await db.subscriptions.create({
      data: {
        userId,
        plan,
        period,
        price,
        startDate: new Date(),
        endDate: this.calculateEndDate(period)
      }
    })

    return subscription
  }

  async getVolumePricing(appsPerMonth: string) {
    const apps = parseInt(appsPerMonth, 10)
    
    if (isNaN(apps)) {
      throw new AppError('Invalid number of apps', 400)
    }

    // Calculate volume pricing
    let pricing = {
      appsPerMonth: apps,
      basePrice: 0,
      pricePerApp: 0,
      discount: 0
    }

    if (apps <= 5) {
      pricing.basePrice = 29.99
      pricing.pricePerApp = 5
    } else if (apps <= 20) {
      pricing.basePrice = 49.99
      pricing.pricePerApp = 4
      pricing.discount = 20
    } else {
      pricing.basePrice = 99.99
      pricing.pricePerApp = 3
      pricing.discount = 40
    }

    return VolumePricingSchema.parse(pricing)
  }

  private calculateEndDate(period: string): Date {
    const now = new Date()
    if (period === 'yearly') {
      return new Date(now.setFullYear(now.getFullYear() + 1))
    }
    return new Date(now.setMonth(now.getMonth() + 1))
  }
}