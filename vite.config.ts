import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/paystack': {
        target: 'https://paystack-integration-ldwp.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/paystack/, ''),
      },
    },
  },
})
