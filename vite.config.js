import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'; // Needed for alias resolution

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx','resources/css/app.css'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
      '@css': path.resolve(__dirname, 'resources/css'),
      '@Locales': path.resolve(__dirname, 'resources/js/locales'),
      '@Layout': path.resolve(__dirname, 'resources/js/layout'),
      '@Pages': path.resolve(__dirname, 'resources/js/Pages'),
      '@i18n': path.resolve(__dirname, 'resources/js/i18n'),
      '@src': path.resolve(__dirname, 'resources/js'),
      '@Lib': path.resolve(__dirname, 'resources/js/lib'),
    },
  },
});
