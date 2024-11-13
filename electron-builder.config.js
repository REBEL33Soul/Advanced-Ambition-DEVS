import { resolve } from 'path';

/**
 * @type {import('electron-builder').Configuration}
 */
export default {
  appId: "com.advancedambition.devs",
  productName: "Advanced Ambition DEVS",
  directories: {
    output: "dist/installers",
    buildResources: "build"
  },
  files: [
    "dist/**/*",
    "package.json"
  ],
  mac: {
    category: "public.app-category.developer-tools",
    target: [
      { target: "dmg", arch: ["x64", "arm64"] },
      { target: "zip", arch: ["x64", "arm64"] }
    ],
    icon: "build/icons/icon.icns",
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: "build/entitlements.mac.plist",
    entitlementsInherit: "build/entitlements.mac.plist",
    artifactName: "${productName}-${arch}.${ext}"
  },
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64"]
      },
      {
        target: "portable",
        arch: ["x64"]
      }
    ],
    icon: "build/icons/icon.ico",
    artifactName: "${productName}-Setup.${ext}"
  },
  linux: {
    target: ["AppImage", "deb"],
    category: "Development",
    icon: "build/icons",
    artifactName: "${productName}.${ext}"
  },
  publish: {
    provider: "github",
    owner: "REBEL33Soul",
    repo: "advanced-ambition-devs",
    releaseType: "release"
  },
  afterSign: "scripts/notarize.js"
}