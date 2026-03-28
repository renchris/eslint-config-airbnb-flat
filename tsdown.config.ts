import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  platform: 'node',
  dts: { resolve: true },
  outDir: 'dist',
  clean: true,
  hash: false,
})
