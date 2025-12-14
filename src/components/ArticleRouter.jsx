import { useEffect, useState } from 'react'

/**
 * Хук для получения articleSlug из URL
 * Используется только на клиенте через useEffect, чтобы избежать ошибок во время SSG
 */
export function useArticleSlug(params, meta) {
  // Начальное значение из params или meta (доступно во время SSR)
  const [articleSlug, setArticleSlug] = useState(
    params?.slug || meta?.slug || null
  )

  useEffect(() => {
    // Получаем slug из URL только на клиенте
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.split('/')
      const slugFromPath = path ? path[path.length - 1] : undefined
      if (slugFromPath && slugFromPath !== 'articles') {
        setArticleSlug(slugFromPath)
      }
    }
  }, [])

  return articleSlug
}
