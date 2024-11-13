import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/logger.js';

export function createServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);
  
  return app;
}