import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  subscriptionType: z.enum(['FREE', 'BASIC', 'PRO', 'ENTERPRISE']),
  subscriptionStatus: z.enum(['ACTIVE', 'EXPIRED', 'CANCELLED']),
  subscriptionEndDate: z.date(),
  createdAt: z.date(),
  lastLogin: z.date(),
  preferences: z.object({
    emailNotifications: z.boolean(),
    newsletterSubscribed: z.boolean(),
    productUpdates: z.boolean()
  }),
  biometricEnabled: z.boolean().default(false)
})

export const DocumentSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  category: z.enum(['USER_GUIDE', 'API_DOCS', 'LEGAL', 'CHANGELOG']),
  version: z.string(),
  lastUpdated: z.date(),
  publishedBy: z.string()
})

export type User = z.infer<typeof UserSchema>
export type Document = z.infer<typeof DocumentSchema>