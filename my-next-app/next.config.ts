import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // 1. Fix the Turbopack root inference error
  turbopack: {
root: process.cwd(),
  },

  // 2. Fix the deprecated 'images.domains' warning
  images: {
    // Remove the old 'domains' array:
    // domains: ['example.com', 'another-domain.com'], 
    
    // Replace it with 'remotePatterns':
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: 'example.com', // Replace with the actual domain you were using
        port: '',
        pathname: '/**', // This wildcard allows all paths on the specified domain
      },
      // Add more objects here if you had multiple domains
    ],
  },
};

export default nextConfig;