# Detailed Installation Guide

## Prerequisites

Before installing this project, ensure you have the following prerequisites installed on your system:

### Required Software

- Node.js (v18.0.0 or higher)
- npm (v7.0.0 or higher)
- Git

## Platform-Specific Installation

### Windows

1. **Install Node.js**
   - Download the Windows Installer from [nodejs.org](https://nodejs.org)
   - Choose the LTS version (18.x.x)
   - Run the installer (node-v18.x.x-x64.msi)
   - Follow the installation wizard
   - Ensure "Add to PATH" is selected

2. **Verify Installation**
   ```powershell
   node --version
   npm --version
   ```

3. **Install Git**
   - Download Git from [git-scm.com](https://git-scm.com)
   - Run the installer
   - Use default settings

### macOS

1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node@18
   
   # Add Node.js to PATH
   echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
   ```

2. **Using Installer**
   - Download macOS Installer from [nodejs.org](https://nodejs.org)
   - Run the .pkg installer
   - Follow installation prompts

3. **Install Git**
   ```bash
   brew install git
   ```

### Linux

#### Ubuntu/Debian

1. **Install Node.js**
   ```bash
   # Add NodeSource repository
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   
   # Install Node.js
   sudo apt-get install -y nodejs
   
   # Install build tools
   sudo apt-get install -y build-essential
   ```

2. **Install Git**
   ```bash
   sudo apt-get install git
   ```

#### Fedora

1. **Install Node.js**
   ```bash
   sudo dnf install nodejs
   ```

2. **Install Git**
   ```bash
   sudo dnf install git
   ```

## Project Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/node-starter.git
   cd node-starter
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit environment variables as needed
   nano .env
   ```

4. **Verify Installation**
   ```bash
   # Run tests
   npm test
   
   # Start development server
   npm run dev
   ```

## Troubleshooting

### Common Issues

1. **Node.js Command Not Found**
   - Ensure Node.js is properly installed
   - Check if Node.js is added to PATH
   - Try restarting your terminal

2. **Permission Errors**
   - On Unix systems, try using sudo
   - On Windows, run terminal as Administrator

3. **Port Already in Use**
   - Change the port in .env file
   - Check for other running services on port 3000

### Getting Help

- Check the [GitHub Issues](https://github.com/yourusername/node-starter/issues)
- Join our [Discord Community](https://discord.gg/yourdiscord)
- Read the [Documentation](https://docs.yourproject.com)