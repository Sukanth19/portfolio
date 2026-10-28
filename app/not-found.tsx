import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-xl w-full font-mono text-sm space-y-4">
        <div>
          <span className="text-lavender">sukanth@portfolio</span>
          <span className="text-gray-muted">:</span>
          <span className="text-crimson">~</span>
          <span className="text-gray-muted">$ cd this-page</span>
        </div>
        <div className="text-crimson">bash: cd: this-page: No such file or directory</div>
        <p className="text-gray-muted">
          404. Either this page never existed, or I broke it at 3am. Honestly, could be both.
        </p>
        <Link
          href="/"
          className="inline-block border border-lavender/40 text-lavender px-4 py-2 hover:bg-lavender/10 transition-colors"
        >
          cd ~ (take me home)
        </Link>
      </div>
    </main>
  )
}
