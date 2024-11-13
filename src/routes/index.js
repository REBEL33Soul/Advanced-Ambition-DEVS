import express from 'express';
import { healthRouter } from './health.js';
import { apiRouter } from './api.js';

export const router = express.Router();

router.use('/health', healthRouter);
router.use('/api', apiRouter);

router.get('/', (req, res) => {
  res.json({ message: 'Node.js Server Running' });
});