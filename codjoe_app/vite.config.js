import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Permet de faire correspondre les erreurs de production au code source
    // (relevé par Lighthouse : "mappages source manquants pour les fichiers JS volumineux").
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
  },
})
