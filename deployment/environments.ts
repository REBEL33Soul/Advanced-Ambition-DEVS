import { z } from 'zod'

export const EnvironmentConfig = {
  production: {
    url: 'https://app.advancedambition.dev',
    api: 'https://api.advancedambition.dev',
    websocket: 'wss://ws.advancedambition.dev',
    cdn: 'https://cdn.advancedambition.dev',
    monitoring: {
      sentry: true,
      datadog: true,
      grafana: true
    },
    scaling: {
      minInstances: 2,
      maxInstances: 10,
      targetCPUUtilization: 70
    }
  },
  staging: {
    url: 'https://staging.app.advancedambition.dev',
    api: 'https://staging-api.advancedambition.dev',
    websocket: 'wss://staging-ws.advancedambition.dev',
    cdn: 'https://staging-cdn.advancedambition.dev',
    monitoring: {
      sentry: true,
      datadog: true,
      grafana: true
    },
    scaling: {
      minInstances: 1,
      maxInstances: 5,
      targetCPUUtilization: 80
    }
  },
  development: {
    url: 'http://localhost:3000',
    api: 'http://localhost:4000',
    websocket: 'ws://localhost:4000',
    cdn: 'http://localhost:5000',
    monitoring: {
      sentry: false,
      datadog: false,
      grafana: true
    },
    scaling: {
      minInstances: 1,
      maxInstances: 1,
      targetCPUUtilization: 100
    }
  },
  preview: {
    url: 'https://preview.app.advancedambition.dev',
    api: 'https://preview-api.advancedambition.dev',
    websocket: 'wss://preview-ws.advancedambition.dev',
    cdn: 'https://preview-cdn.advancedambition.dev',
    monitoring: {
      sentry: true,
      datadog: true,
      grafana: true
    },
    scaling: {
      minInstances: 1,
      maxInstances: 3,
      targetCPUUtilization: 85
    }
  }
}

export const DeploymentConfig = {
  cloudflare: {
    workers: {
      production: {
        name: 'advanced-ambition-prod',
        routes: ['app.advancedambition.dev/*'],
        kvNamespaces: ['PROD_KV'],
        durableObjects: ['COLLABORATOR']
      },
      staging: {
        name: 'advanced-ambition-staging',
        routes: ['staging.app.advancedambition.dev/*'],
        kvNamespaces: ['STAGING_KV'],
        durableObjects: ['COLLABORATOR_STAGING']
      }
    }
  },
  netlify: {
    sites: {
      production: {
        name: 'advanced-ambition',
        branch: 'main',
        buildCommand: 'npm run build',
        publishDirectory: 'dist'
      },
      preview: {
        name: 'advanced-ambition-preview',
        branch: 'develop',
        buildCommand: 'npm run build:preview',
        publishDirectory: 'dist'
      }
    }
  }
}