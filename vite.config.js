import { defineConfig } from 'vite';
export default defineConfig({ build: { rollupOptions: { input: ['index.html', 'Week 1/index.html', 'Week 2/index.html', 'Week 2/ray-plane.html', 'Week 3/index.html'] } } });
