import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { setupTestDatabase } from '../utils/database'
import { generateTestToken } from '../utils/auth'

describe('API Integration Tests', () => {
  beforeAll(async () => {
    await setupTestDatabase()
  })

  describe('Project Management', () => {
    const token = generateTestToken('test-user')

    it('should create a new project', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Project',
          type: 'web',
          framework: 'react'
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
    })

    it('should list user projects', async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('Model Management', () => {
    it('should list available models', async () => {
      const response = await request(app)
        .get('/api/models')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('models')
    })

    it('should update model settings', async () => {
      const response = await request(app)
        .put('/api/models/settings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          autoSelect: true,
          preferredModels: {
            'CODE_GENERATION': 'gpt-4-turbo'
          }
        })

      expect(response.status).toBe(200)
    })
  })
})