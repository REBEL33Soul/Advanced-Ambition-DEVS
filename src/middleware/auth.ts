import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthConfig } from '../config/auth'
import { AppError } from '../utils/errors'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    throw new AppError('Authentication required', 401)
  }

  try {
    const decoded = jwt.verify(token, AuthConfig.jwt.secret)
    req.user = decoded
    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    throw new AppError('Admin access required', 403)
  }
  next()
}