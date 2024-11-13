import * as esbuild from 'esbuild'

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      outfile: 'dist/index.js',
      platform: 'node',
      target: 'node18',
      format: 'esm',
      sourcemap: true,
      minify: process.env.NODE_ENV === 'production',
      plugins: [
        {
          name: 'external-modules',
          setup(build) {
            // Don't bundle node_modules
            build.onResolve({ filter: /^[^./]|^\.[^./]|^\.\.[^/]/ }, args => ({
              external: true
            }))
          }
        }
      ]
    })
    console.log('Build completed successfully')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

build()