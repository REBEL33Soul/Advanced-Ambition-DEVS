import { z } from 'zod'

const HealthSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.number(),
  version: z.string()
})

export class HealthService {
  async getStatus() {
    return HealthSchema.parse({
      status: 'ok',
      timestamp: Date.now(),
      version: process.env.npm_package_version || '1.0.0'
    })
  }
}