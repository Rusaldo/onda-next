import { incrementArticleView } from '@/lib/redis'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const { articleSlug } = req.body

  if (!articleSlug) {
    return res.status(400).json({ error: 'Missing articleSlug' })
  }

  try {
    const newViewCount = await incrementArticleView(articleSlug)
    return res.status(200).json({ views: newViewCount })
  } catch (error) {
    return res.status(500).json({ error: 'Faled to increment views' })
  }
}
