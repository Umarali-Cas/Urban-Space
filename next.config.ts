import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // добавляй сюда все домены, с которых будут подгружаться картинки
    domains: ['example.com', 'cdn.yourapp.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ]
  },
  // Рекомендуется для продакшна
  output: 'standalone',
  reactStrictMode: true,
}

export default nextConfig
