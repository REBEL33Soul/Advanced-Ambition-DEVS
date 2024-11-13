import { z } from 'zod'
import { version } from '../../package.json'

const VersionInfoSchema = z.object({
  version: z.string(),
  releaseDate: z.string(),
  downloads: z.object({
    mac: z.object({
      url: z.string(),
      sha256: z.string(),
      size: z.number()
    }),
    windows: z.object({
      url: z.string(),
      sha256: z.string(),
      size: z.number()
    }),
    linux: z.object({
      url: z.string(),
      sha256: z.string(),
      size: z.number()
    }),
    ios: z.object({
      url: z.string(),
      sha256: z.string(),
      size: z.number()
    }),
    android: z.object({
      url: z.string(),
      sha256: z.string(),
      size: z.number()
    })
  }),
  releaseNotes: z.string(),
  minVersion: z.string().optional(),
  cloudflare: z.object({
    cdn: z.string(),
    zone: z.string(),
    worker: z.string()
  })
})

export class UpdateService {
  private static instance: UpdateService
  private currentVersion: string = version
  private readonly CLOUDFLARE_CDN = 'https://cdn.advancedambition.dev'
  private readonly UPDATE_WORKER = 'https://update.advancedambition.dev'

  private constructor() {}

  static getInstance(): UpdateService {
    if (!UpdateService.instance) {
      UpdateService.instance = new UpdateService()
    }
    return UpdateService.instance
  }

  async checkForUpdates(): Promise<{
    hasUpdate: boolean;
    version?: string;
    notes?: string;
    size?: number;
  }> {
    try {
      const response = await fetch(`${this.UPDATE_WORKER}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentVersion: this.currentVersion,
          platform: this.getPlatform(),
          arch: process.arch
        })
      })

      const data = await response.json()
      const versionInfo = VersionInfoSchema.parse(data)
      
      const hasUpdate = this.compareVersions(versionInfo.version, this.currentVersion) > 0
      const platform = this.getPlatform()
      
      return {
        hasUpdate,
        version: versionInfo.version,
        notes: versionInfo.releaseNotes,
        size: versionInfo.downloads[platform]?.size
      }
    } catch (error) {
      console.error('Failed to check for updates:', error)
      return { hasUpdate: false }
    }
  }

  async getDownloadUrl(): Promise<{
    url: string;
    sha256: string;
    size: number;
  } | null> {
    try {
      const response = await fetch(`${this.UPDATE_WORKER}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentVersion: this.currentVersion,
          platform: this.getPlatform(),
          arch: process.arch
        })
      })

      const data = await response.json()
      const versionInfo = VersionInfoSchema.parse(data)
      
      const platform = this.getPlatform()
      const download = versionInfo.downloads[platform]
      
      if (!download) return null

      // Use Cloudflare CDN URL
      const cdnUrl = `${this.CLOUDFLARE_CDN}/releases/${versionInfo.version}/${platform}/${download.url.split('/').pop()}`
      
      return {
        url: cdnUrl,
        sha256: download.sha256,
        size: download.size
      }
    } catch (error) {
      console.error('Failed to get download URL:', error)
      return null
    }
  }

  async downloadUpdate(onProgress: (progress: number) => void): Promise<boolean> {
    const download = await this.getDownloadUrl()
    if (!download) return false

    try {
      const response = await fetch(download.url)
      const reader = response.body?.getReader()
      const contentLength = download.size

      if (!reader) return false

      let receivedLength = 0
      const chunks: Uint8Array[] = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        chunks.push(value)
        receivedLength += value.length
        onProgress((receivedLength / contentLength) * 100)
      }

      // Verify checksum
      const blob = new Blob(chunks)
      const arrayBuffer = await blob.arrayBuffer()
      const checksum = await this.calculateSha256(arrayBuffer)

      if (checksum !== download.sha256) {
        throw new Error('Checksum verification failed')
      }

      return true
    } catch (error) {
      console.error('Failed to download update:', error)
      return false
    }
  }

  private getPlatform(): string {
    if (process.platform === 'darwin') return 'mac'
    if (process.platform === 'win32') return 'windows'
    if (process.platform === 'linux') return 'linux'
    if (process.platform === 'ios') return 'ios'
    if (process.platform === 'android') return 'android'
    return 'windows'
  }

  private compareVersions(a: string, b: string): number {
    const partsA = a.split('.').map(Number)
    const partsB = b.split('.').map(Number)
    
    for (let i = 0; i < 3; i++) {
      if (partsA[i] > partsB[i]) return 1
      if (partsA[i] < partsB[i]) return -1
    }
    
    return 0
  }

  private async calculateSha256(data: ArrayBuffer): Promise<string> {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
}