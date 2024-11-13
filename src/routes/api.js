import express from 'express';

export const apiRouter = express.Router();

apiRouter.get('/status', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'development',
    version: process.version
  });
});