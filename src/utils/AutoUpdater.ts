import { app, autoUpdater, dialog } from 'electron'
import { version } from '../../package.json'

export class AutoUpdater {
  private static instance: AutoUpdater
  private updateCheckInterval: NodeJS.Timer | null = null
  private currentVersion: string = version

  private constructor() {
    this.setupAutoUpdater()
  }

  static getInstance(): AutoUpdater {
    if (!AutoUpdater.instance) {
      AutoUpdater.instance = new AutoUpdater()
    }
    return AutoUpdater.instance
  }

  private setupAutoUpdater() {
    const server = 'https://github.com/REBEL33Soul/Advanced-Ambition-DEVS'
    const url = `${server}/update/${process.platform}/${app.getVersion()}`
    
    autoUpdater.setFeedURL({ url })

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
      }

      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
      })
    })

    autoUpdater.on('error', (message) => {
      console.error('There was a problem updating the application')
      console.error(message)
    })
  }

  startUpdateCheck() {
    // Check for updates every hour
    this.updateCheckInterval = setInterval(() => {
      autoUpdater.checkForUpdates()
    }, 60 * 60 * 1000)
  }

  stopUpdateCheck() {
    if (this.updateCheckInterval) {
      clearInterval(this.updateCheckInterval)
      this.updateCheckInterval = null
    }
  }

  checkForUpdates() {
    autoUpdater.checkForUpdates()
  }
}