import { generateRssFeed } from './generateRssFeed'
import { generateBooksRssFeed } from './generateBooksRssFeed'
import { generateSitemap } from './generateSitemap'

export async function generateSeoAssets() {
  await Promise.all([
    generateRssFeed(),
    generateBooksRssFeed(),
    generateSitemap(),
  ])
}
