import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx', 'resources/css/filament/admin/theme.css'],
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {
        include: ['pdfjs-dist'],
        exclude: ['pdfjs-dist/build/pdf.worker.min.js']
    },
    define: {
        global: 'globalThis',
    },
    worker: {
        format: 'es'
    }
});