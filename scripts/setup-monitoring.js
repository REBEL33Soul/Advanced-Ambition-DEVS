import { datadogConfig } from '../monitoring/datadog-config'
import { init } from '@datadog/browser-rum'
import { logger } from '@datadog/browser-logs'

export function setupMonitoring() {
  // Initialize RUM
  init({
    ...datadogConfig.rum,
    site: 'datadoghq.com',
    service: datadogConfig.service,
    env: datadogConfig.env,
    version: datadogConfig.version,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input'
  })

  // Initialize Logs
  logger.init({
    ...datadogConfig.logs,
    site: 'datadoghq.com',
    service: datadogConfig.service,
    env: datadogConfig.env,
    version: datadogConfig.version,
    forwardErrorsToLogs: true,
    sampleRate: 100
  })

  // Set up error tracking
  window.addEventListener('unhandledrejection', event => {
    logger.error('Unhandled Promise Rejection', { error: event.reason })
  })

  window.addEventListener('error', event => {
    logger.error('Uncaught Error', { error: event.error })
  })
}