import { VersionInfoSchema } from '../src/services/UpdateService'

export interface Env {
  RELEASES: KVNamespace
  AUTH_TOKEN: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url)
      
      // Handle CORS
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
      }

      // Verify auth token
      const authHeader = request.headers.get('Authorization')
      if (authHeader !== `Bearer ${env.AUTH_TOKEN}`) {
        return new Response('Unauthorized', { status: 401 })
      }

      switch (url.pathname) {
        case '/check':
          return await handleCheckUpdate(request, env)
        case '/download':
          return await handleDownload(request, env)
        default:
          return new Response('Not Found', { status: 404 })
      }
    } catch (error) {
      console.error('Worker error:', error)
      return new Response('Internal Error', { status: 500 })
    }
  }
}

async function handleCheckUpdate(request: Request, env: Env): Promise<Response> {
  const { currentVersion, platform, arch } = await request.json()

  // Get latest version info from KV
  const versionInfo = await env.RELEASES.get('latest', 'json')
  if (!versionInfo) {
    return new Response('No updates available', { status: 404 })
  }

  // Validate version info
  const validated = VersionInfoSchema.parse(versionInfo)

  // Check if update is available for platform
  const platformDownload = validated.downloads[platform]
  if (!platformDownload) {
    return new Response('No update available for platform', { status: 404 })
  }

  return new Response(JSON.stringify(validated), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

async function handleDownload(request: Request, env: Env): Promise<Response> {
  const { currentVersion, platform, arch } = await request.json()

  // Get latest version info
  const versionInfo = await env.RELEASES.get('latest', 'json')
  if (!versionInfo) {
    return new Response('No updates available', { status: 404 })
  }

  // Validate version info
  const validated = VersionInfoSchema.parse(versionInfo)

  // Get download info for platform
  const download = validated.downloads[platform]
  if (!download) {
    return new Response('No download available for platform', { status: 404 })
  }

  return new Response(JSON.stringify({
    ...validated,
    download
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}