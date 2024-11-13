export const netlifyConfig = {
  production: {
    site_id: process.env.NETLIFY_SITE_ID,
    team_slug: 'advanced-ambition',
    deploy_settings: {
      skip_processing: true,
      edge_handlers: true,
      functions: {
        directory: 'netlify/functions',
        included_files: ['dist/**']
      }
    }
  },
  preview: {
    site_id: process.env.NETLIFY_PREVIEW_SITE_ID,
    deploy_settings: {
      skip_processing: false,
      edge_handlers: false
    }
  }
}