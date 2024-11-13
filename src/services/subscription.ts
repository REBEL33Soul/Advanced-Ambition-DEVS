import { z } from 'zod'
import { AuthConfig } from '../config/auth'
import { AppError } from '../utils/errors'
import { EmailService } from './email'

const SubscriptionPlanSchema = z.enum(['basic', 'pro', 'enterprise'])
const BillingPeriodSchema = z.enum(['monthly', 'yearly'])

export class SubscriptionService {
  private emailService = new EmailService()

  async createSubscription(userId: string, plan: z.infer<typeof SubscriptionPlanSchema>, period: z.infer<typeof BillingPeriodSchema>) {
    const planConfig = AuthConfig.subscription.plans[plan]
    if (!planConfig) throw new AppError('Invalid subscription plan', 400)

    // Create subscription record
    const subscription = await db.subscriptions.create({
      data: {
        userId,
        plan,
        period,
        price: planConfig.price[period],
        startDate: new Date(),
        endDate: this.calculateEndDate(period)
      }
    })

    // Send confirmation email
    await this.emailService.sendSubscriptionConfirmation(userId, subscription)

    return subscription
  }

  async checkTrialStatus(userId: string) {
    const user = await db.users.findUnique({ where: { id: userId } })
    if (!user) throw new AppError('User not found', 404)

    const trialEndDate = new Date(user.createdAt.getTime() + AuthConfig.subscription.trial.duration)
    return {
      isTrialActive: trialEndDate > new Date(),
      trialEndDate
    }
  }

  private calculateEndDate(period: z.infer<typeof BillingPeriodSchema>) {
    const now = new Date()
    if (period === 'monthly') {
      return new Date(now.setMonth(now.getMonth() + 1))
    }
    return new Date(now.setFullYear(now.getFullYear() + 1))
  }
}