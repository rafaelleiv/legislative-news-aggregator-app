import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // ppr: 'incremental',
    after: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // Match all domains
      },
    ],
  },
  // devIndicators: {
  //   appIsrStatus: true,
  //   buildActivity: true,
  //   buildActivityPosition: 'bottom-right',
  // },
};

export default nextConfig;
