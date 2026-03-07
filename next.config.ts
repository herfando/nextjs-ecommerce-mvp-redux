import type { NextConfig } from 'next';

const IMAGE_HOST = process.env.NEXT_PUBLIC_IMAGE_HOST;

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: IMAGE_HOST
      ? [
          {
            protocol: 'http', // atau https kalau backend pakai SSL
            hostname: IMAGE_HOST,
          },
        ]
      : [],
  },
};

export default nextConfig;
