/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['puppeteer-core'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('puppeteer-core');
    }
    return config;
  },
}

module.exports = nextConfig