import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ru', 'kg'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})
