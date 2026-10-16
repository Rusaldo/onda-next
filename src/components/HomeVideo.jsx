import { Card } from '@/components/Card'
import Image from 'next/image'
import Link from 'next/link'

const seeAllClassName =
  'group mt-12 inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-50 py-2 px-3 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'

export function HomeVideo({ videos }) {
  return (
    <div>
      <h2 className="mb-12 flex text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Видео
      </h2>
      <div className="flex flex-col gap-12">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
      <Link className={seeAllClassName} href="/video">
        Все видео
      </Link>
    </div>
  )
}

function VideoItem({ video }) {
  return (
    <Card as="article">
      <Link href={`/video/${video.id}`} className="z-10 w-full">
        <div className="relative w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <div className="aspect-video w-full">
            <Image
              className="h-full w-full object-cover"
              src={video.thumbnailUrl}
              alt={video.name}
              width={300}
              height={200}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                <svg
                  className="ml-0.5 h-6 w-6 text-zinc-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Card.Title href={`/video/${video.id}`}>
        <div className="mt-4">{video.name}</div>
      </Card.Title>
      <Card.Cta>Смотреть</Card.Cta>
    </Card>
  )
}
