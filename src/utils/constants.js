/** URL сайта для RSS и канонических ссылок. Можно задать здесь или через .env (NEXT_PUBLIC_SITE_URL). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://musayandiev.ru'

export const mainNavList = [
  {
    name: 'Статьи',
    slug: 'articles',
  },
  {
    name: 'Книги',
    slug: 'books',
  },
  {
    name: 'Аудио',
    slug: 'audio',
  },
  {
    name: 'Видео',
    slug: 'video',
  },
  {
    name: 'Контакты',
    slug: 'contact',
  },
]
