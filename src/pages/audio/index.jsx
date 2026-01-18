import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'

export const audioList = [
  {
    id: '7',
    name: 'Борзи Iаьхари. Муталиев Хаджибикар',
    src: '/audio/Яндиев Муса - Борзи Iаьхари.mp3',
  },
  {
    id: '1',
    name: 'Джамалда',
    src: '/audio/Яндиев Муса - Джамалда.mp3',
  },
  {
    id: '2',
    name: 'Лоамчу баьхаб вай дай хьалха',
    src: '/audio/Яндиев Муса - Лоамчу баьхаб вай дай хьалха.mp3',
  },
  {
    id: '3',
    name: 'Ма хета, новкъостий, ма хета',
    src: '/audio/Яндиев Муса - Ма хета, новкъостий, ма хета.mp3',
  },
  {
    id: '4',
    name: 'ХIанад ва-те гIалгIачоа ший мотт ца безалга',
    src: '/audio/Яндиев Муса - ХIанад ва-те гIалгIачоа ший мотт ца безалга.mp3',
  },
  {
    id: '5',
    name: 'Ц1увза хьа бокъо яц',
    src: '/audio/Яндиев Муса - Ц1увза хьа бокъо яц.mp3',
  },
  {
    id: '6',
    name: 'Эса Марш',
    src: '/audio/Яндиев Муса - Эса Марш.mp3',
  },
]

function AudioCard({ audio, onPlay }) {
  const { id, name, src } = audio

  return (
    <div>
      <a href={`/audio/${id}`}>
        <h3 className="text-xl font-semibold tracking-tight text-zinc-800 transition hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-500">
          {name}
        </h3>
      </a>
      <Card.Description>
        <audio data-selector={`audio-item-${id}`} controls onPlay={onPlay}>
          <source
            src={src}
            type="audio/mpeg"
            controls
            controlsList="nodownload"
          />
          Ваш браузер не поддерживает воспроизведение аудио
        </audio>
      </Card.Description>
    </div>
  )
}

export default function Audio() {
  function handlePlay(audioId) {
    const audios = document.querySelectorAll('[data-selector^="audio-item-"]')

    audios.forEach((audio) => {
      if (audio.dataset.selector.split('-')[2] !== audioId) {
        audio.pause()
      }
    })
  }

  return (
    <>
      <Head>
        <title>Аудио - Муса Яндиев</title>
        <meta name="description" content="Аудио - Муса Яндиев" />
      </Head>
      <SimpleLayout title="Аудио">
        <div className="flex max-w-3xl flex-col space-y-16">
          {audioList.map((audio, index) => (
            <AudioCard
              key={index}
              audio={audio}
              onPlay={() => handlePlay(audio.id)}
            />
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}
