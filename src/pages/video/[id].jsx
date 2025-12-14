import Head from 'next/head'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { videoList } from '@/pages/video'

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

function VideoPlayer({ videoSrc }) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={videoSrc}
          width="1280"
          height="720"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}

export default function Video() {
  const router = useRouter()
  const { id } = router.query

  const videoObject = videoList.find((video) => video.id === String(id))

  if (!videoObject) {
    return <></>
  }

  const title = `Видео - Муса Яндиев - ${videoObject.name}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={videoObject.description || title} />
      </Head>

      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <Link
              type="button"
              href="/video"
              aria-label="Вернуться ко всем видео"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Link>
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                  {videoObject.name}
                </h1>
                {videoObject.description && (
                  <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {videoObject.description}
                  </p>
                )}
              </header>

              <div className="mt-16 sm:mt-20">
                <VideoPlayer videoSrc={videoObject.src} />
              </div>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
