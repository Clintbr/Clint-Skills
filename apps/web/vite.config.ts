import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@claude-skills/core': path.resolve(__dirname, '../../packages/skill-core/src/index.ts')
    }
  },
  server: {
    port: 3000
  }
});

