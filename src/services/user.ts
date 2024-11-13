import { z } from 'zod'
import { db } from '../config/database'
import { AppError } from '../utils/errors'

const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['user', 'admin']).default('user'),
  createdAt: z.date().optional()
})

export type User = z.infer<typeof UserSchema>

export class UserService {
  async getAll() {
    return db.users.findMany()
  }

  async getById(id: string) {
    return db.users.findUnique({ where: { id } })
  }

  async create(data: Omit<User, 'id' | 'createdAt'>) {
    const validated = UserSchema.parse({
      ...data,
      createdAt: new Date()
    })
    return db.users.create({ data: validated })
  }

  async update(id: string, data: Partial<User>) {
    const user = await this.getById(id)
    if (!user) throw new AppError('User not found', 404)
    
    const validated = UserSchema.partial().parse(data)
    return db.users.update({
      where: { id },
      data: validated
    })
  }

  async delete(id: string) {
    const user = await this.getById(id)
    if (!user) throw new AppError('User not found', 404)
    
    await db.users.delete({ where: { id } })
  }
}