import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Giảm watcher + RAM khi dev (tránh quét video lớn trong public/)
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

export default nextConfig;
