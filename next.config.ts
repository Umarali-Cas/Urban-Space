import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
domains: ['example.com'], // сюда добавь все внешние хосты картинок
},
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // любые запросы с /api/*
        destination: "http://localhost:8000/:path*", // прокси на backend
      },
    ]
  },
}

export default nextConfig
