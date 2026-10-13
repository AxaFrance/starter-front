import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  css: {
    postcss: './config/postcss.config.js',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './config/setupTest.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
