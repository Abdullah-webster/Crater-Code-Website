/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Always unoptimized for static export
    unoptimized: true,
  },
  // Static export configuration
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Enable compression
  compress: true,
  // Optimize production builds
  swcMinify: true,
  
  // Fix webpack cache issues
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig
