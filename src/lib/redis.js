/**
 * Используется API счётчика просмотров (см. src/backup-api-views/).
 * При статическом экспорте API отключены, этот модуль не вызывается.
 */
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function incrementArticleView(articleSlug) {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const views = await redis.incr(
    ['pageviews', 'articles', articleSlug].join(':')
  )
  return views
}

export async function getArticleViews(articleSlug) {
  const views = await redis.get(
    ['pageviews', 'articles', articleSlug].join(':')
  )
  return views ?? 0
}

export async function getArticleViewsForAll(articlesSlugs) {
  const keys = articlesSlugs.map((slug) =>
    ['pageviews', 'articles', slug].join(':')
  )
  const views = await redis.mget(...keys)
  const viewsWithSlugs = articlesSlugs.map((slug, index) => {
    return {
      slug,
      counter: views[index] ?? 0,
    }
  })
  return viewsWithSlugs
}
