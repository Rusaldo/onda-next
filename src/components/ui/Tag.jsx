export default function Tag({ children }) {
  return (
    <div className="inline-flex rounded-md bg-zinc-100 px-2 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      {children}
    </div>
  )
}
