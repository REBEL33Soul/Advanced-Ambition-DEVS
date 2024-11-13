import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createServer } from '../src/server.js';

describe('Server', () => {
  const app = createServer();

  it('should respond to health check', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Node.js Server Running');
  });

  it('should handle JSON requests', async () => {
    const response = await request(app)
      .post('/api/test')
      .send({ test: true });
    expect(response.status).toBe(404);
  });

  it('should handle errors', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
  });
});