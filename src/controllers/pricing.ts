import { Request, Response } from 'express'
import { PricingService } from '../services/pricing'

export class PricingController {
  private pricingService = new PricingService()

  getPlans = async (req: Request, res: Response) => {
    const plans = await this.pricingService.getPlans()
    res.json(plans)
  }

  subscribe = async (req: Request, res: Response) => {
    const subscription = await this.pricingService.createSubscription(
      req.user.id,
      req.body.plan,
      req.body.period
    )
    res.status(201).json(subscription)
  }

  getVolumePricing = async (req: Request, res: Response) => {
    const pricing = await this.pricingService.getVolumePricing(
      req.query.apps as string
    )
    res.json(pricing)
  }
}