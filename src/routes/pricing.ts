import { Router } from 'express'
import { PricingController } from '../controllers/pricing'

export const pricingRouter = Router()
const controller = new PricingController()

pricingRouter.get('/plans', controller.getPlans)
pricingRouter.post('/subscribe', controller.subscribe)
pricingRouter.get('/volume-pricing', controller.getVolumePricing)