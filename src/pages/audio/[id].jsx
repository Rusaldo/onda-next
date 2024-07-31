import Head from 'next/head'
import { useParams } from 'next/navigation'
import { SimpleLayout } from '@/components/SimpleLayout'
import { audioList } from '.'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

function AudioCard({ audio, onPlay }) {
  const { id, name, src } = audio

  return (
    <Card.Description>
      <audio
        data-selector={`audio-item-${id}`}
        controls
        controlsList="nodownload"
        onPlay={onPlay}
      >
        <source src={src} type="audio/mpeg" />
        Ваш браузер не поддерживает воспроизведение аудио
      </audio>
    </Card.Description>
  )
}

export default function Audio({ params }) {
  const router = useRouter()
  const { id } = router.query

  const audioObject = audioList.find((audio) => audio.id === String(id))

  if (!audioObject) {
    return <></>
  }

  const title = `Аудио - Муса Яндиев - ${audioObject.name}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>

      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <Link
              type="button"
              href="/audio"
              aria-label="Вернуться ко всем аудио"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Link>
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                  {title}
                </h1>
              </header>

              <div className="mt-16 sm:mt-20">
                <AudioCard audio={audioObject} />
              </div>
            </article>
          </div>
        </div>
      </Container>

      {/* <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
            {title}
          </h1>
        </header>
      </Container> */}
    </>
  )
}
