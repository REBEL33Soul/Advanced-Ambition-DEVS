import { describe, it, expect } from 'vitest'
import express from 'express'
import request from 'supertest'
import { router } from '../routes'

const app = express()
app.use('/api', router)

describe('Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/api/health')
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status', 'ok')
    expect(response.body).toHaveProperty('timestamp')
  })
})