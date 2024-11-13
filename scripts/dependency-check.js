const fs = require('fs');
const path = require('path');
const semver = require('semver');

class DependencyResolver {
  constructor() {
    this.dependencyGraph = new Map();
    this.resolvedVersions = new Map();
  }

  async checkDependencies() {
    const packagePath = path.join(process.cwd(), 'package.json');
    const pkg = require(packagePath);

    // Build dependency graph
    await this.buildGraph(pkg.dependencies || {});
    await this.buildGraph(pkg.devDependencies || {});

    // Resolve version conflicts
    this.resolveConflicts();

    // Update package.json with resolved versions
    this.updatePackageJson(packagePath);
  }

  async buildGraph(dependencies) {
    for (const [name, version] of Object.entries(dependencies)) {
      if (!this.dependencyGraph.has(name)) {
        this.dependencyGraph.set(name, new Set());
      }
      
      const cleanVersion = semver.clean(version.replace(/^\^|~/, ''));
      this.dependencyGraph.get(name).add(cleanVersion);
    }
  }

  resolveConflicts() {
    for (const [name, versions] of this.dependencyGraph.entries()) {
      const sortedVersions = Array.from(versions).sort(semver.rcompare);
      this.resolvedVersions.set(name, sortedVersions[0]);
    }
  }

  updatePackageJson(packagePath) {
    const pkg = require(packagePath);
    
    if (pkg.dependencies) {
      for (const [name, version] of Object.entries(pkg.dependencies)) {
        if (this.resolvedVersions.has(name)) {
          pkg.dependencies[name] = this.resolvedVersions.get(name);
        }
      }
    }

    if (pkg.devDependencies) {
      for (const [name, version] of Object.entries(pkg.devDependencies)) {
        if (this.resolvedVersions.has(name)) {
          pkg.devDependencies[name] = this.resolvedVersions.get(name);
        }
      }
    }

    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  }
}

const resolver = new DependencyResolver();
resolver.checkDependencies().catch(console.error);