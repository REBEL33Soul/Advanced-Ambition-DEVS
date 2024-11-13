import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk'

export function initializeGrafana() {
  initializeFaro({
    url: process.env.GRAFANA_CLOUD_URL,
    apiKey: process.env.GRAFANA_API_KEY,
    app: {
      name: 'Advanced Ambition DEVS',
      version: process.env.npm_package_version,
      environment: process.env.NODE_ENV
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: true,
        captureNetworkRequests: true,
        captureErrors: true
      })
    ],
    sessionTracking: {
      enabled: true,
      persistent: true
    },
    metricConfiguration: {
      flush: {
        maxSize: 50,
        intervalMs: 5000
      }
    }
  })
}