import { SeoHead } from '@/components/SeoHead'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import Link from 'next/link'
import clsx from 'clsx'

const annotationLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g

export function annotationPlainText(annotation) {
  return annotation.replace(annotationLinkPattern, '$1')
}

export function AudioAnnotation({ annotation, className }) {
  if (!annotation) return null

  const parts = []
  const pattern = new RegExp(annotationLinkPattern.source, 'g')
  let lastIndex = 0
  let match
  let key = 0

  while ((match = pattern.exec(annotation)) !== null) {
    if (match.index > lastIndex) {
      parts.push(annotation.slice(lastIndex, match.index))
    }

    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-medium text-teal-500 underline decoration-teal-500/20 underline-offset-2 transition hover:text-teal-600 hover:decoration-teal-500 dark:text-teal-400 dark:decoration-teal-400/30 dark:hover:decoration-teal-400"
      >
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < annotation.length) {
    parts.push(annotation.slice(lastIndex))
  }

  return (
    <p
      className={clsx('text-base text-zinc-600 dark:text-zinc-400', className)}
    >
      {parts}
    </p>
  )
}

export const audioList = [
  {
    id: '6',
    name: 'Эса Марш',
    src: '/audio/6-esa-marsh.mp3',
    annotation:
      'Подробнее смотрите в книге Шийтта Шахар, [ссылка](/books/shiytta-shahar/)',
  },
  {
    id: '7',
    name: 'Борзи Iаьхари. Муталиев Хаджибикар',
    src: '/audio/7-borzi-iaxhari.mp3',
  },
  {
    id: '1',
    name: 'Джамалда',
    src: '/audio/1-dzhamalda.mp3',
  },
  {
    id: '2',
    name: 'Лоамчу баьхаб вай дай хьалха',
    src: '/audio/2-loamchu-bakhab.mp3',
  },
  {
    id: '3',
    name: 'Ма хета, новкъостий, ма хета',
    src: '/audio/3-ma-kheta.mp3',
  },
  {
    id: '4',
    name: 'ХIанад ва-те гIалгIачоа ший мотт ца безалга',
    src: '/audio/4-khianad-galgal-choa.mp3',
  },
  {
    id: '5',
    name: 'Ц1увза хьа бокъо яц',
    src: '/audio/5-tsuvza-bokho-yats.mp3',
  },
]

function AudioCard({ audio, onPlay }) {
  const { id, name, src, annotation } = audio

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
      <AudioAnnotation annotation={annotation} className="mt-2" />
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
      <SeoHead
        title="Аудио"
        description="Аудиозаписи Муса Яндиев: стихи и произведения на ингушском языке."
        path="/audio/"
      />
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
