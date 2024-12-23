import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import Tag from '@/components/ui/Tag'
import { useEffect, useState } from 'react'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const incrementViews = async (articleSlug) => {
  try {
    await fetch('/api/views/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleSlug }),
    })
  } catch (error) {
    console.error('Failed to increment views:', error)
  }
}

export function ArticleLayout({ children, meta, isRssFeed = false, params }) {
  let router = useRouter()
  const path = router?.pathname?.split('/')

  const articleSlug = path ? path[path.length - 1] : undefined
  const [views, setViews] = useState(null)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/views/${articleSlug}`)
        const data = await res.json()
        setViews(data.views)
      } catch (error) {
        console.error('Failed to fetch views:', error)
      }
    }

    if (articleSlug) {
      fetchViews()
    }
  }, [articleSlug])

  useEffect(() => {
    // считаем что юзер просмотрел страницу только спустя некоторого времени проведенного на странице
    const timer = setTimeout(() => {
      incrementViews(articleSlug)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [articleSlug])

  if (isRssFeed) {
    return children
  }

  let metaText

  if (meta.publicationPlace) {
    metaText = `${meta.publicationPlace}`
  }

  // if (meta.publicationDate) {
  //   metaText += ` / ${meta.publicationDate}`
  // }

  return (
    <>
      <Head>
        <title>{`${meta.title} - Муса Яндиев`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <button
              type="button"
              onClick={() => router.push('/articles')}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                  {meta.title}
                </h1>

                {meta.tags?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {meta.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                )}

                {meta.publicationPlace && (
                  <div
                    className="mt-6 flex items-center text-base text-zinc-500 dark:text-zinc-500"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '6px',
                    }}
                  >
                    <span
                      className="w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
                      style={{ height: '80%' }}
                    />
                    <span className="ml-3">Опубликовано в: {metaText}</span>
                  </div>
                )}
              </header>
              <Prose className="mt-8">{children}</Prose>

              {process.env.NODE_ENV === 'development' && (
                <>
                  <hr className="mt-12 border-zinc-200 dark:border-zinc-700/80" />

                  <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                    Просмотров: <strong>{views}</strong>
                  </div>
                </>
              )}
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
