# Linux Installation Guide

## Ubuntu/Debian Installation

1. **Install Node.js**
   ```bash
   # Add NodeSource repository
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

   # Install Node.js and npm
   sudo apt-get install -y nodejs

   # Install build tools
   sudo apt-get install -y build-essential
   ```

2. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

## Fedora Installation

1. **Install Node.js**
   ```bash
   sudo dnf install nodejs
   ```

2. **Install development tools**
   ```bash
   sudo dnf groupinstall "Development Tools"
   ```

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
   # Fix npm permissions
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
   source ~/.profile
   ```

2. **Port conflicts**
   - Change port in .env file
   - Check running processes: `sudo lsof -i :3000`

3. **Node.js version issues**
   ```bash
   # Using nvm (Node Version Manager)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

For additional help, visit our [GitHub Issues](https://github.com/yourusername/node-starter/issues)