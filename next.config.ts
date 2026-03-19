import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'media.ferrari.com' },
      { protocol: 'https', hostname: 'media.lamborghini.com' },
      { protocol: 'https', hostname: 'files.porsche.com' },
      { protocol: 'https', hostname: 'robbreport.com' },
      { protocol: 'https', hostname: 'www.motortrend.com' },
      { protocol: 'https', hostname: 'hips.hearstapps.com' },
      { protocol: 'https', hostname: 'www.carlogos.org' },
      { protocol: 'https', hostname: 'interestingengineering.com' },
      { protocol: 'https', hostname: 'www.autoguide.com' },
      { protocol: 'https', hostname: 'www.news24.com' },
      { protocol: 'https', hostname: 'auto.zol.com.cn' },
      { protocol: 'https', hostname: 'www.supercars.net' },
      { protocol: 'https', hostname: 'www.carwale.com' },
      { protocol: 'https', hostname: 'www.drive.com.au' },
      { protocol: 'https', hostname: 'www.ferrari.com' },
      { protocol: 'https', hostname: 'www.lamborghini.com' },
      { protocol: 'https', hostname: 'www.porsche.com' },
      { protocol: 'https', hostname: 'www.mercedes-amg.com' },
      { protocol: 'https', hostname: 'www.astonmartin.com' },
      { protocol: 'https', hostname: 'www.bentleymotors.com' },
      { protocol: 'https', hostname: 'www.rolls-roycemotorcars.com' },
      { protocol: 'https', hostname: 'www.brabus.com' },
      { protocol: 'https', hostname: 'www.mansory.com' }
    ],
  },
};

export default nextConfig;
