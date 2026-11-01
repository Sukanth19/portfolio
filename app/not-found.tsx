import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#D7FF3A] p-4 text-black md:p-8">
      <span className="text-xs uppercase">[ error ]</span>
      <div>
        <h1 className="font-[family-name:var(--display)] text-[30vw] leading-[0.8] tracking-[-0.04em]">404</h1>
        <div className="mt-6 flex flex-col gap-6 border-t-4 border-black pt-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg">
            either this page never existed, or i broke it at 3am. honestly, could be both.
          </p>
          <Link href="/" className="rounded-full bg-black px-5 py-3 text-sm uppercase text-[#D7FF3A] transition-transform hover:-rotate-3">
            take me home →
          </Link>
        </div>
      </div>
    </main>
  )
}
