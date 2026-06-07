import { SeoHead } from '@/components/SeoHead'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllBooks } from '@/lib/getAllBooks'
import Image from 'next/image'

function BookCard({ book }) {
  return (
    <Card className="h-full" as="article" key={book.name}>
      <div className="flex flex-col gap-8 md:flex-row">
        <Image
          className="z-10 rounded-2xl"
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
      <SeoHead
        title="Книги"
        description="Книги автора Муса Яндиев: исследования ингушского языка и истории, словари, переводы."
        path="/books/"
      />
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
