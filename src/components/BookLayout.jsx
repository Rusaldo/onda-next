import Head from 'next/head'
import { useRouter } from 'next/router'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import Link from 'next/link'
import Image from 'next/image'
import ChevronRightIcon from './icons/ChevronRightIcon'

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

export function BookLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter()

  if (isRssFeed) {
    return children
  }

  return (
    <>
      <Head>
        <title>{`${meta.title} - Муса Яндиев`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <Link
              type="button"
              href="/books"
              aria-label="Вернуться к списку всех книг"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Link>
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                  {meta.title}
                </h1>

                {meta.bookInfo && (
                  <div
                    className="mt-6 flex items-center text-base text-zinc-400 dark:text-zinc-500"
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
                    <span className="ml-3">{meta.bookInfo}</span>
                  </div>
                )}
                {/* <time
                  dateTime={meta.date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(meta.date)}</span>
                </time> */}
              </header>
              <Image
                className="my-8 rounded-3xl"
                src={meta.coverUrl}
                width={200}
                height={300}
                alt=""
              />
              <Prose className="mt-8">{children}</Prose>

              <Link
                href="/contact"
                className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
              >
                По вопросам приобретения книг
                <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
              </Link>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
