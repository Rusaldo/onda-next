import Head from 'next/head'

import { SITE_URL } from '@/utils/constants'

const SITE_NAME = 'Муса Яндиев'
const DEFAULT_IMAGE = `${SITE_URL}/apple-touch-icon.png`
const DEFAULT_DESCRIPTION =
  'Муса Яндиев. Ингушский язык. Г1алг1ай мотт. Статьи, книги, аудио и видео.'

function absoluteUrl(path) {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function buildJsonLd({ type, title, description, url, image, datePublished, contentUrl, embedUrl }) {
  const author = { '@type': 'Person', name: SITE_NAME }

  switch (type) {
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url,
        datePublished,
        author,
        publisher: author,
        image,
      }
    case 'book':
      return {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: title,
        description,
        url,
        author,
        image,
      }
    case 'audio':
      return {
        '@context': 'https://schema.org',
        '@type': 'AudioObject',
        name: title,
        description,
        url,
        contentUrl,
        author,
      }
    case 'video':
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: title,
        description,
        url,
        embedUrl,
        thumbnailUrl: image,
        author,
      }
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        description,
        url: SITE_URL,
      }
  }
}

export function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
  type = 'website',
  datePublished,
  contentUrl,
  embedUrl,
  noSuffix = false,
}) {
  const pageTitle = noSuffix ? title : `${title} - ${SITE_NAME}`
  const canonicalUrl = absoluteUrl(path)
  const ogImage = absoluteUrl(image || DEFAULT_IMAGE)
  const jsonLd = buildJsonLd({
    type,
    title,
    description,
    url: canonicalUrl,
    image: ogImage,
    datePublished,
    contentUrl: contentUrl ? absoluteUrl(contentUrl) : undefined,
    embedUrl,
  })

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ru_RU" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}
