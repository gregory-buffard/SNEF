/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  webpack(config) {
    config.experiments = {...config.experiments, topLevelAwait: true}
    return config
  },
  experimental: {
    appDir: true,
  },
  
}

module.exports = nextConfig
