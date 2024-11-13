import { z } from 'zod'

export const AdminSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(12),
  email: z.string().email(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']),
  permissions: z.array(z.string())
})

export const defaultAdmin = {
  username: 'superadmin',
  password: process.env.ADMIN_PASSWORD || 'ChangeThis!2024#',
  email: process.env.ADMIN_EMAIL || 'admin@advancedambition.dev',
  role: 'SUPER_ADMIN',
  permissions: ['ALL']
}