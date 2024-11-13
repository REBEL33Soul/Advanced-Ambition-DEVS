import { execSync } from 'child_process'
import { resolve } from 'path'
import { writeFileSync, mkdirSync } from 'fs'

// Ensure build directories exist
mkdirSync('dist/desktop', { recursive: true })
mkdirSync('dist/mobile', { recursive: true })

// Build for all platforms
async function buildAll() {
  console.log('Building for all platforms...')

  try {
    // Desktop builds
    console.log('Building desktop apps...')
    execSync('npm run build:desktop', { stdio: 'inherit' })

    // Mobile builds
    console.log('Building mobile apps...')
    execSync('npm run build:ios', { stdio: 'inherit' })
    execSync('npm run build:android', { stdio: 'inherit' })

    // Generate download page
    generateDownloadPage()

    console.log('All builds completed successfully!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

function generateDownloadPage() {
  const downloads = {
    desktop: {
      mac: {
        url: 'dist/desktop/Advanced Ambition DEVS.dmg',
        label: 'Download for macOS'
      },
      win: {
        url: 'dist/desktop/Advanced Ambition DEVS Setup.exe',
        label: 'Download for Windows'
      },
      linux: {
        url: 'dist/desktop/advanced-ambition-devs.AppImage',
        label: 'Download for Linux'
      }
    },
    mobile: {
      ios: {
        url: 'dist/mobile/advanced-ambition-devs.ipa',
        label: 'Download for iOS'
      },
      android: {
        url: 'dist/mobile/advanced-ambition-devs.apk',
        label: 'Download for Android'
      }
    }
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Advanced Ambition DEVS - Downloads</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    .download-section {
      margin: 2rem 0;
    }
    .download-button {
      display: inline-block;
      padding: 1rem 2rem;
      margin: 0.5rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .download-button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <h1>Advanced Ambition DEVS - Downloads</h1>
  
  <div class="download-section">
    <h2>Desktop Applications</h2>
    <a href="${downloads.desktop.mac.url}" class="download-button">${downloads.desktop.mac.label}</a>
    <a href="${downloads.desktop.win.url}" class="download-button">${downloads.desktop.win.label}</a>
    <a href="${downloads.desktop.linux.url}" class="download-button">${downloads.desktop.linux.label}</a>
  </div>

  <div class="download-section">
    <h2>Mobile Applications</h2>
    <a href="${downloads.mobile.ios.url}" class="download-button">${downloads.mobile.ios.label}</a>
    <a href="${downloads.mobile.android.url}" class="download-button">${downloads.mobile.android.label}</a>
  </div>

  <div class="download-section">
    <h2>System Requirements</h2>
    <h3>Desktop</h3>
    <ul>
      <li>macOS 10.13 or later</li>
      <li>Windows 10 or later</li>
      <li>Linux: Ubuntu 18.04 or later, Fedora 28 or later</li>
    </ul>
    
    <h3>Mobile</h3>
    <ul>
      <li>iOS 13.0 or later</li>
      <li>Android 8.0 or later</li>
    </ul>
  </div>

  <div class="download-section">
    <h2>Installation Instructions</h2>
    <h3>macOS</h3>
    <ol>
      <li>Download the .dmg file</li>
      <li>Open the .dmg file</li>
      <li>Drag the app to Applications folder</li>
    </ol>

    <h3>Windows</h3>
    <ol>
      <li>Download the Setup.exe</li>
      <li>Run the installer</li>
      <li>Follow the installation wizard</li>
    </ol>

    <h3>Linux</h3>
    <ol>
      <li>Download the .AppImage file</li>
      <li>Make it executable: chmod +x advanced-ambition-devs.AppImage</li>
      <li>Run the application</li>
    </ol>
  </div>
</body>
</html>
  `

  writeFileSync('dist/downloads.html', html)
  console.log('Download page generated: dist/downloads.html')
}

buildAll()