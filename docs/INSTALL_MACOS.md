# macOS Installation Guide

## Prerequisites

- macOS 10.15 (Catalina) or later
- Terminal access
- Administrator privileges

## Installation Methods

### Method 1: Using Homebrew (Recommended)

1. **Install Homebrew**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js**
   ```bash
   brew install node@18
   echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

### Method 2: Using Installer

1. Download macOS Installer (.pkg) from [nodejs.org](https://nodejs.org)
2. Run the installer package
3. Follow installation prompts
4. Restart Terminal

## Project Setup

```bash
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

1. **Permission errors**
   ```bash
   sudo chown -R $USER /usr/local/lib/node_modules
   ```

2. **Path issues**
   ```bash
   echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **Port conflicts**
   - Change port in .env file
   - Check Activity Monitor for processes using port 3000

For additional help, visit our [GitHub Issues](https://github.com/yourusername/node-starter/issues)