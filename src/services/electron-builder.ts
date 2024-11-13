import { z } from 'zod'
import { AppError } from '../utils/errors'
import { promises as fs } from 'fs'
import path from 'path'

const ElectronConfigSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  version: z.string().default('1.0.0'),
  main: z.string().default('main.js'),
  features: z.array(z.enum([
    'file-handling',
    'ipc-communication',
    'system-tray',
    'auto-updater',
    'native-menus',
    'window-management'
  ])).default([]),
  window: z.object({
    width: z.number().default(800),
    height: z.number().default(600),
    frame: z.boolean().default(true),
    transparent: z.boolean().default(false)
  }).default({}),
  build: z.object({
    appId: z.string().optional(),
    productName: z.string().optional(),
    mac: z.object({
      category: z.string().optional()
    }).optional(),
    win: z.object({
      target: z.array(z.string()).optional()
    }).optional()
  }).default({})
})

export type ElectronConfig = z.infer<typeof ElectronConfigSchema>

export class ElectronBuilderService {
  private readonly templatesDir = path.join(process.cwd(), 'templates', 'electron')

  async createElectronApp(config: ElectronConfig) {
    const validated = ElectronConfigSchema.parse(config)
    const projectDir = path.join(process.cwd(), 'projects', validated.name)

    await fs.mkdir(projectDir, { recursive: true })
    await this.generateElectronProject(projectDir, validated)

    return {
      projectId: Math.random().toString(36).slice(2),
      config: validated,
      path: projectDir
    }
  }

  private async generateElectronProject(projectDir: string, config: ElectronConfig) {
    // Generate package.json
    await this.createPackageJson(projectDir, config)

    // Generate main process file
    await this.createMainProcess(projectDir, config)

    // Generate preload script
    await this.createPreload(projectDir)

    // Generate renderer process files
    await this.createRenderer(projectDir, config)

    // Add selected features
    await this.addFeatures(projectDir, config.features)

    // Create build configuration
    await this.createBuildConfig(projectDir, config)
  }

  private async createPackageJson(projectDir: string, config: ElectronConfig) {
    const packageJson = {
      name: config.name,
      version: config.version,
      description: config.description,
      main: config.main,
      scripts: {
        start: 'electron .',
        build: 'electron-builder',
        'build:mac': 'electron-builder --mac',
        'build:win': 'electron-builder --win',
        'build:linux': 'electron-builder --linux'
      },
      dependencies: {
        electron: '^25.3.1'
      },
      devDependencies: {
        'electron-builder': '^24.6.3',
        typescript: '^5.3.3',
        '@types/node': '^20.10.5'
      },
      build: config.build
    }

    await fs.writeFile(
      path.join(projectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    )
  }

  private async createMainProcess(projectDir: string, config: ElectronConfig) {
    const mainContent = `
import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: ${config.window.width},
    height: ${config.window.height},
    frame: ${config.window.frame},
    transparent: ${config.window.transparent},
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile('index.html')
  ${config.features.includes('window-management') ? 'enableWindowManagement(mainWindow)' : ''}
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

${config.features.includes('ipc-communication') ? `
// IPC Communication
ipcMain.handle('ping', () => 'pong')
` : ''}

${config.features.includes('system-tray') ? `
// System Tray
import { Tray, Menu } from 'electron'
let tray = null
app.whenReady().then(() => {
  tray = new Tray('icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => createWindow() },
    { label: 'Quit', click: () => app.quit() }
  ])
  tray.setContextMenu(contextMenu)
})
` : ''}
`

    await fs.writeFile(
      path.join(projectDir, 'main.ts'),
      mainContent
    )
  }

  private async createPreload(projectDir: string) {
    const preloadContent = `
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping')
})
`

    await fs.writeFile(
      path.join(projectDir, 'preload.ts'),
      preloadContent
    )
  }

  private async createRenderer(projectDir: string, config: ElectronConfig) {
    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${config.name}</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div id="app">
      <h1>${config.name}</h1>
      <div id="content"></div>
    </div>
    <script src="renderer.js"></script>
  </body>
</html>
`

    const rendererContent = `
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content')
  
  // Test IPC communication
  window.electronAPI.ping().then(response => {
    content.textContent = 'IPC Test: ' + response
  })
})
`

    const stylesContent = `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: #f5f5f5;
}

#app {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-top: 0;
  color: #333;
}
`

    await fs.writeFile(path.join(projectDir, 'index.html'), htmlContent)
    await fs.writeFile(path.join(projectDir, 'renderer.js'), rendererContent)
    await fs.writeFile(path.join(projectDir, 'styles.css'), stylesContent)
  }

  private async addFeatures(projectDir: string, features: string[]) {
    for (const feature of features) {
      const featurePath = path.join(this.templatesDir, 'features', feature)
      try {
        await fs.access(featurePath)
        // Copy feature files
        const files = await fs.readdir(featurePath)
        for (const file of files) {
          const content = await fs.readFile(path.join(featurePath, file), 'utf-8')
          await fs.writeFile(path.join(projectDir, file), content)
        }
      } catch (error) {
        throw new AppError(`Feature ${feature} not found`, 404)
      }
    }
  }

  private async createBuildConfig(projectDir: string, config: ElectronConfig) {
    const electronBuilderConfig = {
      appId: config.build.appId || `com.electron.${config.name}`,
      productName: config.build.productName || config.name,
      directories: {
        output: 'dist'
      },
      files: [
        'dist/**/*',
        'package.json'
      ],
      mac: {
        category: config.build.mac?.category || 'public.app-category.developer-tools'
      },
      win: {
        target: config.build.win?.target || ['nsis', 'portable']
      },
      linux: {
        target: ['AppImage', 'deb']
      }
    }

    await fs.writeFile(
      path.join(projectDir, 'electron-builder.json'),
      JSON.stringify(electronBuilderConfig, null, 2)
    )
  }
}