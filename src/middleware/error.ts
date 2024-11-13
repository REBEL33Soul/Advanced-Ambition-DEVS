import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors
    })
  }

  console.error('Unhandled Error:', err)
  res.status(500).json({
    error: 'Internal Server Error'
  })

  next()
}