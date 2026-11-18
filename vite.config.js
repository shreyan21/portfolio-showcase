import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths work for both username.github.io and /repository/ sites.
  base: './',
  build: { target: 'es2022', sourcemap: false },
});
