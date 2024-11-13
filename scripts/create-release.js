import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

async function createRelease() {
  try {
    const version = process.env.npm_package_version;
    console.log(`Creating release v${version}...`);

    // Build all installers
    console.log('\nBuilding installers...');
    execSync('npm run build:all', { stdio: 'inherit' });

    // Create GitHub release
    console.log('\nCreating GitHub release...');
    const releaseNotes = `
# Advanced Ambition DEVS v${version}

## Features
- Multi-model AI integration
- Self-healing dependency system
- Cross-platform support
- Modern UI
- Secure authentication
- Project management
- Deployment automation
- Real-time collaboration

## Installation
Download the appropriate installer for your platform and follow the installation instructions.

## System Requirements
- Windows 10+ / macOS 10.15+ / Ubuntu 20.04+
- 4GB RAM minimum
- 2GB free disk space
    `;

    writeFileSync('RELEASE_NOTES.md', releaseNotes);

    execSync('gh release create v1.0.0 dist/installers/* --title "v1.0.0" --notes-file RELEASE_NOTES.md', { stdio: 'inherit' });

    console.log('\nRelease created successfully!');
  } catch (error) {
    console.error('Failed to create release:', error);
    process.exit(1);
  }
}

createRelease().catch(console.error);