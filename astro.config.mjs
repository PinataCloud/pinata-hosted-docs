import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dracula-soft'
    },
  },
  integrations: [starlight({
    title: 'Pinata Docs',
    customCss: ['/src/styles.css', '@fontsource-variable/roboto-mono'],
    social: {
      discord: 'https://discord.gg/pinata',
      twitter: 'https://twitter.com/PinataCloud',
      github: 'https://github.com/PinataCloud/pinata-hosted-docs'
    },
    logo: {
      src: '/src/assets/pinnie.png'
    },
    sidebar: [{
      label: '🪅 Welcome to Pinata!',
      items: [{
        label: 'Introduction',
        link: '/'
      }]
    }, {
      label: '🚀 Start Here',
      items: [{
        label: "What Can I Learn Here?",
        link: '/start-here/'
      }, {
        label: "Getting Started",
        link: '/start-here/getting-started/'
      }, {
        label: "Why Pinata?",
        link: '/start-here/why-pinata/'
      }]
    }, {
      label: '📍 Pinata API',
      items: [{
        label: "Introduction to the Pinata API",
        link: '/pinata-api/introduction-to-the-pinata-api/'
      }, {
        label: "Authentication",
        link: '/pinata-api/introduction-to-the-pinata-api/authentication/'
      }, {
        label: "Pinning",
        items: [{
          label: "Pinning",
          link: '/pinata-api/pinning/'
        }, {
          label: "Pin File or Directory",
          link: '/pinata-api/pinning/pin-file-or-directory/'
        }, {
          label: "Pin JSON",
          link: '/pinata-api/pinning/pin-json/'
        }, {
          label: "Pin by CID",
          link: '/pinata-api/pinning/pin-by-cid/'
        }, {
          label: "Remove (Unpin) Files",
          link: '/pinata-api/pinning/remove-files-unpin/'
        }, {
          label: "Update Pinata Metadata",
          link: '/pinata-api/pinning/update-metadata/'
        },
        {
          label: 'Pinning Service API',
          link: '/pinata-api/pinning-services-api/'
        }]
      }, {
        label: "Data",
        items: [{
          label: "Query Files",
          link: '/pinata-api/data/query-files/'
        }, {
          label: "Data Usage",
          link: '/pinata-api/data/data-usage/'
        }]
      }, {
        label: "Users",
        items: [{
          label: "Generate Pinata API Key",
          link: '/pinata-api/users/generate-pinata-api-key'
        }, {
          label: "List Pinata API Keys",
          link: '/pinata-api/users/list-pinata-api-keys/'
        }, {
          label: "Revoke Pinata API Keys",
          link: '/pinata-api/users/revoke-pinata-api-key'
        }]
      }]
    }, {
      label: '🚪 Gateways',
      items: [{
        label: "What are Gateways?",
        link: '/gateways/'
      }, {
        label: "The Public Pinata Gateway",
        link: '/gateways/the-public-pinata-gateway'
      }, {
        label: "Dedicated Gateways",
        link: '/gateways/dedicated-gateways'
      }, {
        label: "How do I use My Gateway?",
        link: '/gateways/how-do-i-use-my-gateway'
      }, {
        label: "Open vs Restricted",
        link: '/gateways/open-vs-restricted'
      }, {
        label: 'Image Optimizations',
        link: '/gateways/image-optimization'
      }, {
        label: 'Rate Limits',
        link: '/gateways/rate-limits'
      }, {
        label: 'Video Streaming',
        link: '/gateways/video-streaming'
      }]
    }]
  }), react()],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
