# Windows Installation Guide

## Prerequisites

- Windows 10 or later
- PowerShell or Command Prompt
- Administrator privileges

## Step-by-Step Installation

1. **Install Node.js**
   - Download the Windows Installer (.msi) from [nodejs.org](https://nodejs.org)
   - Choose LTS version (18.x.x or later)
   - Run the installer
   - Follow installation wizard
   - Ensure "Add to PATH" is checked
   - Restart your computer after installation

2. **Verify Installation**
   Open PowerShell or Command Prompt and run:
   ```powershell
   node --version
   npm --version
   ```

3. **Install Git (Optional)**
   - Download from [git-scm.com](https://git-scm.com)
   - Run installer with default settings
   - Select "Use Git from Windows Command Prompt"

4. **Clone and Setup Project**
   ```powershell
   # Clone repository
   git clone https://github.com/yourusername/node-starter.git
   cd node-starter

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

## Troubleshooting

### Common Issues

1. **'node' is not recognized**
   - Reinstall Node.js and ensure "Add to PATH" is selected
   - Restart PowerShell/Command Prompt
   - Restart computer

2. **Permission errors**
   - Run PowerShell/Command Prompt as Administrator
   - Check Windows Defender settings
   - Verify user account permissions

3. **Port conflicts**
   - Change port in .env file
   - Check Task Manager for processes using port 3000

For additional help, visit our [GitHub Issues](https://github.com/yourusername/node-starter/issues)