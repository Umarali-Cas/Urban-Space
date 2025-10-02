/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    // добавляй сюда все домены, с которых будут подгружаться картинки
    domains: ['example.com', 'cdn.yourapp.com', 'api.urbanspace.sdinis.org', 'urbanspaceblob.blob.core.windows.net'],
  },
  // Рекомендуется для продакшна
  output: 'standalone',
  reactStrictMode: true,
}

const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts')

module.exports = withNextIntl(nextConfig)
