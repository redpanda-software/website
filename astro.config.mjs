// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: process.env.CUSTOM_DOMAIN || 'https://redpanda.ch',
	integrations: [mdx(), sitemap()],
  redirects: {
    '/': '/blog'
  }	
});
