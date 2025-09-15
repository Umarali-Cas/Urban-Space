import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // добавляй сюда все домены, с которых будут подгружаться картинки
    domains: ['example.com', 'cdn.yourapp.com', 'api.urbanspace.sdinis.org'],
  },
  // Рекомендуется для продакшна
  output: 'standalone',
  reactStrictMode: true,
}

export default nextConfig
