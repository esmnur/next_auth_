/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@auth0/nextjs-auth0'],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 's.gravatar.com'],
    unoptimized: true,
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'secret-key',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || 'demo-client-id',
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET || 'demo-client-secret',
    AUTH0_ISSUER: process.env.AUTH0_ISSUER || 'https://demo.auth0.com',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
