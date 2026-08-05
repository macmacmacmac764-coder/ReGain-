Import { defineConfig } from 'vite'
Import react from '@vitejs/plugin-react'

Export default defineConfig({
  Plugins: [react()],
  Server: {
    Host: true,
    Port: 5173,
  },
  Build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
