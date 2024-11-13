import { Router } from 'express'
import { AdminController } from '../controllers/admin'
import { adminMiddleware } from '../middleware/auth'

export const adminRouter = Router()
const controller = new AdminController()

adminRouter.use(adminMiddleware)

adminRouter.get('/users', controller.getUsers)
adminRouter.get('/subscriptions', controller.getSubscriptions)
adminRouter.get('/reports', controller.generateReports)
adminRouter.put('/docs/:type', controller.updateDocs)
adminRouter.post('/announcements', controller.createAnnouncement)