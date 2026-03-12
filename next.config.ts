import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**', // <-- wajib
      },
      ...(process.env.NEXT_PUBLIC_IMAGE_HOST
        ? [
            {
              protocol: 'http' as const,
              hostname: process.env.NEXT_PUBLIC_IMAGE_HOST,
              pathname: '/**', // <-- wajib
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
