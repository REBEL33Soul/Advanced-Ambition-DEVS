import { Router } from 'express'
import { BuilderController } from '../controllers/builder'
import { validateProjectConfig } from '../middleware/validation'

export const builderRouter = Router()
const controller = new BuilderController()

builderRouter.post('/create', validateProjectConfig, controller.createProject)
builderRouter.get('/templates', controller.getTemplates)
builderRouter.get('/projects', controller.listProjects)
builderRouter.get('/projects/:id', controller.getProject)
builderRouter.delete('/projects/:id', controller.deleteProject)