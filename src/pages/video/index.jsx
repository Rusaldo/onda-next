import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import Link from 'next/link'
import Image from 'next/image'

export const videoList = [
  {
    id: '1',
    name: 'Г1алг1ай Исса Кодзоев',
    src: 'https://vkvideo.ru/video_ext.php?oid=1088826051&id=456239017&hd=3',
    thumbnailUrl:
      'https://sun9-18.userapi.com/impg/4qSMkDnM2wzEKuE8Jk6U1ciWHMo4o9GTQ3GCbw/TXdfVPZuCUI.jpg?size=800x450&quality=95&keep_aspect_ratio=1&background=000000&sign=4b1e6948c47fa13d88f01420e7434cdf&type=video_thumb',
    description:
      'Сюжет о романе Г1алг1ай Иссы Кодзоева, ГТРК Ингушетия, 01.12.2025, автор Хава Абадиева',
  },
]

function VideoCard({ video }) {
  const { id, name, src, thumbnailUrl, description } = video

  return (
    <Card as="article" className="h-full">
      <Link href={`/video/${id}`} className="z-10">
        <div className="relative w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <div className="aspect-video w-full">
            <Image
              className="h-full w-full object-cover"
              src={thumbnailUrl}
              alt={name}
              width={300}
              height={200}
            />
            {/* <img
              src={thumbnailUrl}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 z"
            /> */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                <svg
                  className="ml-1 h-8 w-8 text-zinc-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Card.Title href={`/video/${id}`}>
        <div className="mt-4">{name}</div>
      </Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Смотреть</Card.Cta>
    </Card>
  )
}

export default function Video() {
  return (
    <>
      <Head>
        <title>Видео - Муса Яндиев</title>
        <meta name="description" content="Видео - Муса Яндиев" />
      </Head>
      <SimpleLayout title="Видео">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videoList.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}
