// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  // image: {
  //   service: imageService({
  //     placeholder: "blurhash",
  //   }),
  // },
  output: 'server',
  integrations: [tailwind(), svelte()],
  adapter: vercel()
});