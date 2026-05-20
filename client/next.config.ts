import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const tunnelOrigin = process.env.DEV_TUNNEL_HOST?.trim();

const nextConfig: NextConfig = {
  // Required when accessing `pnpm dev` via Cloudflare Tunnel / custom dev hostname
  allowedDevOrigins: [
    'dev.taxitaithanhdat.com',
    '*.trycloudflare.com',
    ...(tunnelOrigin ? [tunnelOrigin] : []),
  ],
  images: {
    remotePatterns: [],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/public/videos/**',
        ],
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
