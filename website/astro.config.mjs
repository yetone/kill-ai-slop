import { defineConfig } from 'astro/config';

// Kill AI Slop is a single, static, dependency-light content site.
// No integrations by design — the build artifact should be as lean as the
// aesthetic it argues for.
export default defineConfig({
  site: 'https://killaislop.com',
  build: {
    inlineStylesheets: 'auto',
  },
});
