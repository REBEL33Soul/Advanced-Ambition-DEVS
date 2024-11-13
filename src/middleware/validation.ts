import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const ProjectTypeSchema = z.enum(['web', 'mobile', 'desktop', 'api'])
const FrameworkSchema = z.enum(['react', 'vue', 'angular', 'express', 'electron', 'nativescript'])

const ProjectConfigSchema = z.object({
  name: z.string().min(2),
  type: ProjectTypeSchema,
  framework: FrameworkSchema,
  description: z.string(),
  version: z.string().default('1.0.0'),
  features: z.array(z.string()),
  dependencies: z.record(z.string()).optional(),
  aiAssistance: z.boolean().default(true),
  electron: z.object({
    window: z.object({
      width: z.number().default(800),
      height: z.number().default(600),
      frame: z.boolean().default(true),
      transparent: z.boolean().default(false)
    }),
    features: z.array(z.enum([
      'file-handling',
      'ipc-communication',
      'system-tray',
      'auto-updater',
      'native-menus',
      'window-management'
    ])),
    build: z.object({
      appId: z.string().optional(),
      productName: z.string().optional(),
      mac: z.object({
        category: z.string().optional()
      }).optional(),
      win: z.object({
        target: z.array(z.string()).optional()
      }).optional()
    })
  }).optional()
})

export const validateProjectConfig = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = ProjectConfigSchema.parse(req.body)
    next()
  } catch (error) {
    next(error)
  }
}