import { Router } from 'express'
import { healthRouter } from './health'
import { userRouter } from './user'

export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/users', userRouter)