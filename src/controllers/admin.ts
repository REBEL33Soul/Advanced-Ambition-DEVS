import { Request, Response } from 'express'
import { AdminService } from '../services/admin'

export class AdminController {
  private adminService = new AdminService()

  getUsers = async (req: Request, res: Response) => {
    const users = await this.adminService.getUsers(req.query)
    res.json(users)
  }

  getSubscriptions = async (req: Request, res: Response) => {
    const subscriptions = await this.adminService.getSubscriptions(req.query)
    res.json(subscriptions)
  }

  generateReports = async (req: Request, res: Response) => {
    const report = await this.adminService.generateReport(req.query.type as string)
    res.json(report)
  }

  updateDocs = async (req: Request, res: Response) => {
    await this.adminService.updateDocs(req.params.type, req.body)
    res.status(204).send()
  }

  createAnnouncement = async (req: Request, res: Response) => {
    const announcement = await this.adminService.createAnnouncement(req.body)
    res.status(201).json(announcement)
  }
}