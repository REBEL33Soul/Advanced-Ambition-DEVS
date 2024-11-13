import { Request, Response } from 'express'
import { UserService } from '../services/user'
import { AppError } from '../utils/errors'

export class UserController {
  private userService = new UserService()

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAll()
    res.json(users)
  }

  getUserById = async (req: Request, res: Response) => {
    const user = await this.userService.getById(req.params.id)
    if (!user) throw new AppError('User not found', 404)
    res.json(user)
  }

  createUser = async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body)
    res.status(201).json(user)
  }

  updateUser = async (req: Request, res: Response) => {
    const user = await this.userService.update(req.params.id, req.body)
    res.json(user)
  }

  deleteUser = async (req: Request, res: Response) => {
    await this.userService.delete(req.params.id)
    res.status(204).send()
  }
}