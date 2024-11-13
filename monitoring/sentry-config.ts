import * as Sentry from '@sentry/react'

export function initializeSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ['localhost', 'app.advancedambition.dev']
      }),
      new Sentry.Replay()
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  })
}