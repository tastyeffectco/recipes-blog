import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://your-site.pages.dev',
  cacheDir: './cache', // Changes .astro cache folder to cache
  build: {
    format: 'file',
    assets: 'assets' // Changes _astro folder in build output to assets
  }
}); 