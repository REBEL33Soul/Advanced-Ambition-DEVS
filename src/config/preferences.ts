import { z } from 'zod'

export const UserPreferencesSchema = z.object({
  interactionMode: z.enum(['autonomous', 'interactive']).default('interactive'),
  autoSave: z.boolean().default(true),
  autoDeploy: z.boolean().default(false),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  notifications: z.object({
    buildComplete: z.boolean().default(true),
    deployComplete: z.boolean().default(true),
    errors: z.boolean().default(true),
    updates: z.boolean().default(true)
  }).default({}),
  defaultProjectSettings: z.object({
    framework: z.string().optional(),
    type: z.string().optional(),
    aiAssistance: z.boolean().default(true)
  }).default({})
})