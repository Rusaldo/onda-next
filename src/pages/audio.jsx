import Head from 'next/head'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'

export default function Audio() {
  return (
    <>
      <Head>
        <title>Аудио - Муса Яндиев</title>
        <meta name="description" content="Аудио - Муса Яндиев" />
      </Head>
      <SimpleLayout title="Аудио">
        <div className="flex max-w-3xl flex-col space-y-16">
          <div className="flex flex-col gap-8 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                Джамалда
              </h3>
              <Card.Description>
                <audio controls>
                  <source src="/audio/djamalda.mp3" type="audio/mpeg" />
                  Ваш браузер не поддерживает воспроизведение аудио
                </audio>
              </Card.Description>
            </div>
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
