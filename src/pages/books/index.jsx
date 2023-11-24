import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllBooks } from '@/lib/getAllBooks'
import Image from 'next/image'

function BookCard({ book }) {
  console.log('booklogo', book.cover)
  return (
    <Card className="h-full" as="article" key={book.name}>
      <div className="flex flex-col gap-8 md:flex-row">
        <Image
          className="z-10"
          src={book.coverUrl}
          width={200}
          height={300}
          alt=""
          unoptimized
        />
        <div>
          <Card.Title href={`/books/${book.slug}`}>{book.title}</Card.Title>
          <Card.Description>{book.description}</Card.Description>
          <Card.Cta>Подробнее</Card.Cta>
        </div>
      </div>
    </Card>
  )
}

export default function BooksIndex({ books }) {
  return (
    <>
      <Head>
        <title>Книги - Муса Яндиев</title>
        <meta name="description" content="Книги" />
      </Head>
      <SimpleLayout title="Книги" intro="Все книги">
        <ul role="list" className="grid grid-cols-1 gap-y-16">
          {books.map((book) => (
            <li key={book.slug}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      books: (await getAllBooks()).map(({ component, ...meta }) => meta),
    },
  }
}
