import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ru', 'en']

  const routes = [
    '',
    'articles',
    'crowdfunding',
    'crowdsourcing',
    'forums',
    'ideas',
    'login',
    'profile',
    'register',
  ]

  const baseUrl = 'https://urban-space.org'

  const urls: MetadataRoute.Sitemap = []

  locales.forEach((lng) => {
    routes.forEach((route) => {
      urls.push({
        url: `${baseUrl}/${lng}/${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return urls
}
