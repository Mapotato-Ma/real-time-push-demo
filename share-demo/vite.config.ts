import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9080',
        changeOrigin: true
      },
      '/cameraBrowser/message': {
        target: 'http://192.168.40.142:8500',
        changeOrigin: true
      },
      '/hello': {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true
      }
    }
  },
  define: {
    'process.env': {},
    'global.setImmediate': {}
  }
});
