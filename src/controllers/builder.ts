import { Request, Response } from 'express'
import { BuilderService } from '../services/builder'
import { AppError } from '../utils/errors'

export class BuilderController {
  private builderService = new BuilderService()

  createProject = async (req: Request, res: Response) => {
    const project = await this.builderService.createProject(req.body)
    res.status(201).json(project)
  }

  getTemplates = async (req: Request, res: Response) => {
    const templates = await this.builderService.getTemplates()
    res.json(templates)
  }

  listProjects = async (req: Request, res: Response) => {
    const projects = await this.builderService.listProjects()
    res.json(projects)
  }

  getProject = async (req: Request, res: Response) => {
    const project = await this.builderService.getProject(req.params.id)
    if (!project) throw new AppError('Project not found', 404)
    res.json(project)
  }

  deleteProject = async (req: Request, res: Response) => {
    await this.builderService.deleteProject(req.params.id)
    res.status(204).send()
  }
}