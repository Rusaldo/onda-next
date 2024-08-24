import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'
import Tag from '@/components/ui/Tag'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>

        <div className="z-10 mt-2 mb-3">
          {article.tags?.length > 0 && (
            <div className=" flex flex-wrap gap-3">
              {article.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
        {/* <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow> */}
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Читать далее</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {/* {formatDate(article.date)} */}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Статьи - Муса Яндиев</title>
        <meta name="description" content="Список статей" />
      </Head>
      <SimpleLayout title="Статьи" intro="Все статьи">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
