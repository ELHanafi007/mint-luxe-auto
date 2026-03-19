import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.ferrari.com',
      },
      {
        protocol: 'https',
        hostname: 'media.lamborghini.com',
      },
      {
        protocol: 'https',
        hostname: 'files.porsche.com',
      },
      {
        protocol: 'https',
        hostname: 'robbreport.com',
      },
      {
        protocol: 'https',
        hostname: 'www.motortrend.com',
      },
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com',
      }
    ],
  },
};

export default nextConfig;
