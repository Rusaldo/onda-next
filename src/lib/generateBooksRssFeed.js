import ReactDOMServer from 'react-dom/server'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'

import { getAllBooks } from './getAllBooks'
import { SITE_URL } from '@/utils/constants'

export async function generateBooksRssFeed() {
  let books = await getAllBooks()
  let siteUrl = SITE_URL
  let author = {
    name: 'Муса Яндиев',
  }

  let feed = new Feed({
    title: `${author.name} — Книги`,
    description: 'Книги автора Муса Яндиев',
    author,
    id: `${siteUrl}/books/`,
    link: `${siteUrl}/books/`,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/books.xml`,
      json: `${siteUrl}/rss/books.json`,
    },
  })

  for (let book of books) {
    let url = `${siteUrl}/books/${book.slug}/`
    let html = ReactDOMServer.renderToStaticMarkup(
      <book.component isRssFeed />
    )

    feed.addItem({
      title: book.title,
      id: url,
      link: url,
      description: book.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(book.date),
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/books.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/books.json', feed.json1(), 'utf8'),
  ])
}
