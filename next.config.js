/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com'],
    unoptimized: true, // Disable Next.js optimization
  },
};

module.exports = nextConfig;
