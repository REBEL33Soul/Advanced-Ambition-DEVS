import { z } from 'zod'

export const AuthConfig = {
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  },
  subscription: {
    trial: {
      duration: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      features: ['all']
    },
    plans: {
      basic: {
        price: {
          monthly: 29.99,
          yearly: 299.99 // ~2 months free
        },
        features: [
          'unlimited-projects',
          'all-models',
          'priority-support'
        ]
      },
      pro: {
        price: {
          monthly: 49.99,
          yearly: 499.99
        },
        features: [
          'unlimited-projects',
          'all-models',
          'priority-support',
          'custom-models',
          'team-collaboration'
        ]
      },
      enterprise: {
        price: 'custom',
        features: [
          'unlimited-everything',
          'dedicated-support',
          'custom-development',
          'on-premise-deployment'
        ]
      }
    }
  }
}