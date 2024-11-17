import { getArticleViewsForAll } from '@/lib/redis'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { articlesSlugs } = req.body

    // Проверка, чтобы articlesSlugs был передан и был массивом
    if (!articlesSlugs || !Array.isArray(articlesSlugs)) {
      return res
        .status(400)
        .json({ message: 'articlesSlugs should be an array of articles slugs' })
    }

    const views = await getArticleViewsForAll(articlesSlugs)

    res.status(200).json(views)
  } catch (error) {
    console.error('Error fetching counters:', error)
    res.status(500).json({ message: 'Error fetching counters' })
  }
}
