import { Router } from 'express'
import { apiRouter } from './api'
import { builderRouter } from './builder'
import { requestLogger } from '../middleware/logger'

export const router = Router()

router.use(requestLogger)
router.use('/api', apiRouter)
router.use('/builder', builderRouter)