import glob from 'fast-glob'
import * as path from 'path'

async function importBook(bookFilename) {
  let { meta, default: component } = await import(
    `../pages/books/${bookFilename}`
  )
  return {
    slug: bookFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllBooks() {
  let bookFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/books'),
  })

  let books = await Promise.all(bookFilenames.map(importBook))

  return books.sort((a, b) => new Date(b.date) - new Date(a.date))
}
