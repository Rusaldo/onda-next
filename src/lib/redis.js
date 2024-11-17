import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function incrementArticleView(articleSlug) {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const views = await redis.incr(`article:${articleSlug}:views`)
  return views
}

export async function getArticleViews(articleSlug) {
  const views = await redis.get(`article:${articleSlug}:views`)
  return views ?? 0
}
