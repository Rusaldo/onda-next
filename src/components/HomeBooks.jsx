import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'
import Image from 'next/image'
import Link from 'next/link'

export function HomeBooks({ books }) {
  console.log('books', books)
  return (
    <div>
      <h2 className="mb-12 flex text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Книги
      </h2>
      <div className="flex flex-col gap-12">
        {books.map((book) => (
          <Book key={book.slug} book={book} />
        ))}
      </div>
      <Link
        className="group mt-12 inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-50 py-2 px-3 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70"
        href="/books"
      >
        Все книги
      </Link>
    </div>
  )
}

function Book({ book }) {
  return (
    <Card as="article">
      <div className="flex">
        <Image
          className="z-10 mr-4 rounded"
          src={book.coverUrl}
          width={80}
          height={120}
          alt=""
          style={{ minWidth: '80px' }}
        />
        <Card.Title href={`/books/${book.slug}`}>{book.title}</Card.Title>
      </div>
    </Card>
  )
}
