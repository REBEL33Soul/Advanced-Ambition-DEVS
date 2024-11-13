import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { transformSync } from 'esbuild'

// Minimal bundler fallback when main bundler fails
export class MinimalBundler {
  async bundle(entryPoint: string, outputPath: string) {
    try {
      const content = readFileSync(entryPoint, 'utf-8')
      
      const result = transformSync(content, {
        minify: true,
        sourcemap: true,
        loader: 'tsx',
        format: 'esm',
        target: 'es2020'
      })

      writeFileSync(outputPath, result.code)
      if (result.map) {
        writeFileSync(`${outputPath}.map`, result.map)
      }
      
      return true
    } catch (error) {
      console.error('Minimal bundler error:', error)
      return false
    }
  }
}