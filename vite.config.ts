import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/spec-weni/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
});
