import { getArticleViews } from '@/lib/redis'

export default async function handler(req, res) {
  const { articleSlug } = req.query

  if (!articleSlug || typeof articleSlug !== 'string') {
    return res.status(400).json({ error: 'Invalid articleSlug' })
  }

  try {
    const views = await getArticleViews(articleSlug)
    return res.status(200).json({ views })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch views' })
  }
}
