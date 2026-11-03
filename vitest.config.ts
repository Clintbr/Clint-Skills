import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'packages/**/*.test.ts']
  },
  resolve: {
    alias: {
      '@claude-skills/core': path.resolve(__dirname, './packages/skill-core/src/index.ts')
    }
  }
});

