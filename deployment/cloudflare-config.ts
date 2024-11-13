export const cloudflareConfig = {
  production: {
    zone_id: process.env.CF_ZONE_ID,
    account_id: process.env.CF_ACCOUNT_ID,
    routes: [
      { pattern: 'app.advancedambition.dev/*', zone_name: 'advancedambition.dev' }
    ],
    kv_namespaces: ['SESSIONS', 'CACHE'],
    durable_objects: {
      bindings: [{ name: 'COLLABORATOR', class_name: 'Collaborator' }]
    }
  },
  staging: {
    zone_id: process.env.CF_STAGING_ZONE_ID,
    account_id: process.env.CF_ACCOUNT_ID,
    routes: [
      { pattern: 'staging.app.advancedambition.dev/*', zone_name: 'advancedambition.dev' }
    ],
    kv_namespaces: ['STAGING_SESSIONS', 'STAGING_CACHE'],
    durable_objects: {
      bindings: [{ name: 'COLLABORATOR', class_name: 'CollaboratorStaging' }]
    }
  }
}