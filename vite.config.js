import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/LookingGlassWebXRPolyfill.js'),
      name: 'Looking Glass WebXR',
      // the proper extensions will be added
      fileName: '@lookingglass/webxr'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@lookingglass/webxr-polyfill', 'HoloPlayCore'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@lookingglass/webxr-polyfill': '@lookingglass/webxr-polyfill',
          'HoloPlayCore': 'holoplay-core'
        }
      }
    }
  }
})