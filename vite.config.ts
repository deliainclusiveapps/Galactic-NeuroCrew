import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

function copyStaticDirectories() {
  return {
    name: 'copy-static-directories',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const filesToCopy = ['manifest.json', 'sw.js', 'README.md'];
      for (const file of filesToCopy) {
        const src = path.resolve(__dirname, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(distDir, file));
        }
      }
      const assetsSrc = path.resolve(__dirname, 'assets');
      const assetsDest = path.join(distDir, 'assets');
      if (fs.existsSync(assetsSrc)) {
        fs.cpSync(assetsSrc, assetsDest, { recursive: true });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [copyStaticDirectories()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
