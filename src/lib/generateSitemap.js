import { writeFile } from 'fs/promises'

import { getAllArticles } from './getAllArticles'
import { getAllBooks } from './getAllBooks'
import { audioList } from '@/pages/audio/index'
import { videoList } from '@/pages/video/index'
import { SITE_URL } from '@/utils/constants'

function formatDate(date) {
  if (!date) return undefined
  return new Date(date).toISOString().split('T')[0]
}

function urlEntry(loc, { lastmod, changefreq = 'monthly', priority = '0.7' } = {}) {
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
  return `  <url>
    <loc>${loc}</loc>${lastmodTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export async function generateSitemap() {
  const articles = await getAllArticles()
  const books = await getAllBooks()
  const today = formatDate(new Date())

  const entries = [
    urlEntry(`${SITE_URL}/`, { lastmod: today, changefreq: 'weekly', priority: '1.0' }),
    urlEntry(`${SITE_URL}/articles/`, { changefreq: 'weekly', priority: '0.9' }),
    urlEntry(`${SITE_URL}/books/`, { changefreq: 'weekly', priority: '0.9' }),
    urlEntry(`${SITE_URL}/audio/`, { changefreq: 'monthly', priority: '0.8' }),
    urlEntry(`${SITE_URL}/video/`, { changefreq: 'monthly', priority: '0.8' }),
    urlEntry(`${SITE_URL}/contact/`, { changefreq: 'yearly', priority: '0.5' }),
    ...articles.map((article) =>
      urlEntry(`${SITE_URL}/articles/${article.slug}/`, {
        lastmod: formatDate(article.date),
        priority: '0.8',
      })
    ),
    ...books.map((book) =>
      urlEntry(`${SITE_URL}/books/${book.slug}/`, {
        lastmod: formatDate(book.date),
        priority: '0.8',
      })
    ),
    ...audioList.map((audio) =>
      urlEntry(`${SITE_URL}/audio/${audio.id}/`, { priority: '0.7' })
    ),
    ...videoList.map((video) =>
      urlEntry(`${SITE_URL}/video/${video.id}/`, { priority: '0.7' })
    ),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

  await writeFile('./public/sitemap.xml', sitemap, 'utf8')
}
