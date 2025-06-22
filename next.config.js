/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@auth0/nextjs-auth0"],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "s.gravatar.com"],
    unoptimized: true,
  },
  env: {
    NEXTAUTH_SECRET: 'secret',
    NEXTAUTH_URL: "http://localhost:3000",
    AUTH0_CLIENT_ID: 'id',
    AUTH0_CLIENT_SECRET: 'secret',
    AUTH0_ISSUER: "https://--.auth0.com",


  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
