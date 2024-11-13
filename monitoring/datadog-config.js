export const datadogConfig = {
  env: process.env.NODE_ENV,
  service: 'advanced-ambition-devs',
  version: process.env.npm_package_version,
  
  logs: {
    enabled: true,
    forwardErrorsToLogs: true
  },
  
  rum: {
    enabled: true,
    applicationId: process.env.DD_APPLICATION_ID,
    clientToken: process.env.DD_CLIENT_TOKEN,
    trackInteractions: true,
    trackResources: true,
    trackLongTasks: true
  },
  
  apm: {
    enabled: true,
    hostUrl: 'https://trace.agent.datadoghq.com',
    traceSampleRate: 1
  }
}