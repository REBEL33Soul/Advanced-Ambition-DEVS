import { Router } from 'express'
import { HealthController } from '../controllers/health'

export const healthRouter = Router()
const healthController = new HealthController()

healthRouter.get('/', healthController.getStatus)