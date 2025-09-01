import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
