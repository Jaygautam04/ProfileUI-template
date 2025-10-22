/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for faster builds
  turbo: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
