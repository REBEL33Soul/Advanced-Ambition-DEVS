import { execSync } from 'child_process';
import { resolve } from 'path';
import { mkdirSync } from 'fs';

// Ensure build directories exist
mkdirSync('dist/installers', { recursive: true });

async function buildInstallers() {
  console.log('Building installers for all platforms...');

  try {
    // Build application first
    execSync('npm run build', { stdio: 'inherit' });

    // Build for all platforms
    console.log('\nBuilding installers...');
    execSync('npm run build:all', { stdio: 'inherit' });

    console.log('\nInstallers built successfully!');
    console.log('\nInstallers can be found in dist/installers/');
  } catch (error) {
    console.error('Failed to build installers:', error);
    process.exit(1);
  }
}

buildInstallers().catch(console.error);