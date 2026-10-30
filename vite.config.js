import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                dashboard: 'index.html',
                week01: 'labs/week-01/index.html',
                week02: 'labs/week-02/index.html',
                rayPlane: 'labs/week-02/ray-plane.html',
                week03: 'labs/week-03/index.html',
                week04: 'labs/week-04/index.html',
            },
        },
    },
});
