import { defineConfig } from 'vite';

// Vite configuration with proxy
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Forward requests from /api to backend
    },
  },
});
