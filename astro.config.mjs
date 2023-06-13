import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Welcome to Pinata!',
          items: [
            { label: 'Introduction', link: '/'}
          ]
        },
        {
          label: 'Start Here',
          items: [
            { label: "What Can I Learn Here?", link: '/start-here/'},
            { label: "Getting Started", link: '/start-here/getting-started/'},
            { label: 'Features', items: [
              { label: "Gateways", items: [
                { label: "Gateways", link: '/start-here/features/gateways/gateways' },
                { label: "The Public Pinata Gateway", link: '/start-here/features/gateways/the-public-pinata-gateway' },
                { label: "Dedicated Gateways", link: '/start-here/features/gateways/dedicated-gateways' },
                { label: "How do I use My Gateway?", link: '/start-here/features/gateways/how-do-i-use-my-gateway' },
                { label: "Open vs Restricted", link: '/start-here/features/gateways/open-vs.-restricted' },
              ]},
              { label: 'Image Optimizations', link: '/start-here/features/image-optimization'},
              { label: 'Rate Limits', link: '/start-here/features/rate-limits'},
              { label: 'Video Streaming', link: '/start-here/features/video-streaming'},
            ]}
          ]
        },
      ],
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
