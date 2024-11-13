const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class DependencyLocker {
  constructor() {
    this.lockFile = path.join(process.cwd(), 'dependency-lock.json');
    this.currentLock = this.readLockFile();
  }

  readLockFile() {
    try {
      return require(this.lockFile);
    } catch {
      return {};
    }
  }

  async lockDependencies() {
    const packages = this.findPackages();
    const newLock = {};

    for (const pkg of packages) {
      const hash = await this.calculateHash(pkg);
      newLock[pkg.name] = {
        version: pkg.version,
        hash,
        dependencies: pkg.dependencies || {},
        devDependencies: pkg.devDependencies || {}
      };
    }

    this.writeLockFile(newLock);
  }

  findPackages() {
    const packages = [];
    const workspaces = ['packages/*'];

    for (const workspace of workspaces) {
      const dirs = fs.readdirSync(path.join(process.cwd(), workspace.replace('/*', '')));
      for (const dir of dirs) {
        const pkgPath = path.join(process.cwd(), workspace.replace('/*', ''), dir, 'package.json');
        if (fs.existsSync(pkgPath)) {
          packages.push(require(pkgPath));
        }
      }
    }

    return packages;
  }

  async calculateHash(pkg) {
    const content = JSON.stringify(pkg);
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  writeLockFile(lock) {
    fs.writeFileSync(this.lockFile, JSON.stringify(lock, null, 2));
  }
}

const locker = new DependencyLocker();
locker.lockDependencies().catch(console.error);