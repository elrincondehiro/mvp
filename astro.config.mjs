// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';


import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind({
    applyBaseStyles:false,
  }), svelte(), react()],
  adapter: vercel()
});