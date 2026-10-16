import { Card } from '@/components/Card'
import Link from 'next/link'

const seeAllClassName =
  'group mt-12 inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-50 py-2 px-3 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'

export function HomeAudio({ audios }) {
  function handlePlay(audioId) {
    const players = document.querySelectorAll('[data-selector^="home-audio-"]')

    players.forEach((player) => {
      if (player.dataset.selector !== `home-audio-${audioId}`) {
        player.pause()
      }
    })
  }

  return (
    <div>
      <h2 className="mb-12 flex text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Аудио
      </h2>
      <div className="flex flex-col gap-12">
        {audios.map((audio) => (
          <AudioItem
            key={audio.id}
            audio={audio}
            onPlay={() => handlePlay(audio.id)}
          />
        ))}
      </div>
      <Link className={seeAllClassName} href="/audio">
        Все аудио
      </Link>
    </div>
  )
}

function AudioItem({ audio, onPlay }) {
  return (
    <Card as="article">
      <Card.Title>
        <Link
          href={`/audio/${audio.id}`}
          className="transition hover:text-teal-500"
        >
          {audio.name}
        </Link>
      </Card.Title>
      <div className="relative z-10 mt-4 w-full">
        <audio
          className="w-full"
          data-selector={`home-audio-${audio.id}`}
          controls
          controlsList="nodownload"
          onPlay={onPlay}
        >
          <source src={audio.src} type="audio/mpeg" />
          Ваш браузер не поддерживает воспроизведение аудио
        </audio>
      </div>
    </Card>
  )
}
