import glob from 'fast-glob'
import * as path from 'path'

async function importArticle(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, b) => {
    // two undefined values should be treated as equal ( 0 )
    if (typeof a.order === 'undefined' && typeof b.order === 'undefined')
      return 0
    // if a is undefined and b isn't a should have a lower index in the array
    else if (typeof a.order === 'undefined') return 1
    // if b is undefined and a isn't a should have a higher index in the array
    else if (typeof b.order === 'undefined') return -1
    // if both numbers are defined compare as normal
    else return a.order - b.order
  })
}
