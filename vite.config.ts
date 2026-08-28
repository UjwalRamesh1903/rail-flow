import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/rail-flow/',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 43123,
  },
})
