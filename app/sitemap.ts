import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://sukanth19.vercel.app', lastModified: new Date() }]
}
