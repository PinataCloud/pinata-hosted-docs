import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Pinata Docs',
      customCss: ['/src/styles.css'],
      social: {
        discord: 'https://discord.gg/pinata',
        twitter: 'https://twitter.com/PinataCloud',
        github: 'https://github.com/PinataCloud/pinata-hosted-docs',
      },
      sidebar: [
        {
          label: '🪅 Welcome to Pinata!',
          items: [
            { label: 'Introduction', link: '/' }
          ]
        },
        {
          label: '🚀 Start Here',
          items: [
            { label: "What Can I Learn Here?", link: '/start-here/' },
            { label: "Getting Started", link: '/start-here/getting-started/' },
            { label: "Why Pinata?", link: '/start-here/why-pinata/' },
          ]
        },
        {
          label: '🚪 Gateways', items: [
            { label: "What are Gateways?", link: '/gateways/' },
            { label: "The Public Pinata Gateway", link: '/gateways/the-public-pinata-gateway' },
            { label: "Dedicated Gateways", link: '/gateways/dedicated-gateways' },
            { label: "How do I use My Gateway?", link: '/gateways/how-do-i-use-my-gateway' },
            { label: "Open vs Restricted", link: '/gateways/open-vs-restricted' },
            { label: 'Image Optimizations', link: '/gateways/image-optimization' },
            { label: 'Rate Limits', link: '/gateways/rate-limits' },
            { label: 'Video Streaming', link: '/gateways/video-streaming' },
          ]
        }
      ],
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
