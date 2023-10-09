import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://johanlozano.me",
  output: 'hybrid',
  adapter: vercel(),
  redirects: {
    '/posts': '/#blog'
  }
});