import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllBooks } from '@/lib/getAllBooks'
import Image from 'next/image'

function BookCard({ book }) {
  return (
    <Card as="article" key={book.name}>
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={book.logo} alt="" className="h-8 w-8" unoptimized />
      </div>
      <Card.Title href={`/books/${book.slug}`}>{book.title}</Card.Title>
      <Card.Description>{book.description}</Card.Description>
      <Card.Cta>Подробнее</Card.Cta>
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
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
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
