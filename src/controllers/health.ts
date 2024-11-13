import { Request, Response } from 'express'
import { HealthService } from '../services/health'

export class HealthController {
  private healthService = new HealthService()

  getStatus = async (req: Request, res: Response) => {
    const health = await this.healthService.getStatus()
    res.json(health)
  }
}