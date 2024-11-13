import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Ensure consistent dependency versions
const lockfileCheck = () => {
  const lockfile = resolve(process.cwd(), 'package-lock.json');
  if (!existsSync(lockfile)) {
    console.error('package-lock.json not found. Run npm install first.');
    process.exit(1);
  }
};

// Create necessary config files if they don't exist
const ensureConfigs = () => {
  const configs = [
    {
      path: '.nvmrc',
      content: 'v18.0.0'
    },
    {
      path: '.node-version',
      content: '18.0.0'
    }
  ];

  configs.forEach(({ path, content }) => {
    const filePath = resolve(process.cwd(), path);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, content);
    }
  });
};

// Run checks
lockfileCheck();
ensureConfigs();