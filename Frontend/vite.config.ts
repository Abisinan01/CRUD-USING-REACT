import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [react() ],
  server: {
    port: 4444,  
    strictPort: true  
  },
    build: {
    rollupOptions: {
      external: ['tailwindcss/version.js']
    }
  }
})
