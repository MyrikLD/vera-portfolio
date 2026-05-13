// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://vera.myrik.xyz',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [keystatic(), react()],
  security: {
    allowedDomains: [{ hostname: 'vera.myrik.xyz', protocol: 'https' }],
  },
});
