'use client'

import { useEffect, useRef, useState } from 'react'
import type { Experiment } from '@/data/experiments'
import { HomeLabDiagram } from './HomeLabDiagram'
import { CyberLabDiagram } from './CyberLabDiagram'

// What each lab card opens: its diagram plus a short walkthrough
const details: Record<NonNullable<Experiment['diagram']>, {
  Diagram: () => JSX.Element
  stepsTitle: string
  steps: { n: string; title: string; text: string }[]
}> = {
  homelab: {
    Diagram: HomeLabDiagram,
    stepsTitle: 'how a movie gets played',
    steps: [
      { n: '01', title: 'drop it in', text: 'copy a movie into the NAS share from any laptop on the wi-fi. it lands on the server’s drive.' },
      { n: '02', title: 'jellyfin finds it', text: 'jellyfin scans that same folder, grabs the poster and details, and adds it to the library.' },
      { n: '03', title: 'hit play', text: 'open jellyfin on the tv or phone. the old laptop streams it straight over the home network.' },
    ],
  },
  cyberlab: {
    Diagram: CyberLabDiagram,
    stepsTitle: 'how a session goes',
    steps: [
      { n: '01', title: 'recon', text: 'nmap the lab network from kali to find which ports and services the targets expose.' },
      { n: '02', title: 'exploit', text: 'go after what’s open: metasploit on metasploitable, sql injection and xss on dvwa and juice shop.' },
      { n: '03', title: 'detect + reset', text: 'check what wazuh caught and what it missed, write it up, then roll every vm back to a clean snapshot.' },
    ],
  },
}

function CardBody({ x }: { x: Experiment }) {
  return (
    <>
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs uppercase text-[#D7FF3A]">[{x.status.toLowerCase()}]</span>
          {x.diagram && (
            <span className="rounded-full bg-[#D7FF3A] px-3 py-1 text-xs uppercase text-black">view diagram ↗</span>
          )}
          {!x.diagram && x.screenshots && (
            <span className="rounded-full bg-[#D7FF3A] px-3 py-1 text-xs uppercase text-black">screenshots ↗</span>
          )}
          {x.link && !x.diagram && !x.screenshots && (
            <span className="rounded-full bg-[#D7FF3A] px-3 py-1 text-xs uppercase text-black">github ↗</span>
          )}
        </div>
        <h3 className="mt-3 font-[family-name:var(--display)] text-3xl uppercase leading-none">{x.title}</h3>
        <p className="mt-3 text-sm opacity-70">{x.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {x.technologies.map(t => (
          <span key={t} className="rounded-full border border-[#F5F5F0]/30 px-3 py-1 text-xs">{t}</span>
        ))}
      </div>
    </>
  )
}

function Gallery({ shots }: { shots: NonNullable<Experiment['screenshots']> }) {
  const [i, setI] = useState(0)
  const shot = shots[i]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI(n => (n + 1) % shots.length)
      if (e.key === 'ArrowLeft') setI(n => (n - 1 + shots.length) % shots.length)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [shots.length])

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-[#F5F5F0]/10 bg-[#111]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.src} alt={shot.caption} className="aspect-[16/9] w-full object-contain" />
        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setI((i - 1 + shots.length) % shots.length)}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-sm transition-colors hover:bg-[#D7FF3A] hover:text-black"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setI((i + 1) % shots.length)}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-sm transition-colors hover:bg-[#D7FF3A] hover:text-black"
            >
              →
            </button>
          </>
        )}
      </div>
      <p className="mt-3 text-sm opacity-70">
        <span className="text-[#D7FF3A]">{String(i + 1).padStart(2, '0')}/{String(shots.length).padStart(2, '0')}</span> {shot.caption}
      </p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {shots.map((s, n) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setI(n)}
            aria-label={s.caption}
            aria-current={n === i}
            className={`shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${n === i ? 'border-[#D7FF3A]' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt="" className="h-14 w-24 object-cover md:h-16 md:w-28" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}

export function LabGrid({ experiments }: { experiments: Experiment[] }) {
  const [open, setOpen] = useState<Experiment | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map(x =>
          x.diagram || x.screenshots ? (
            <button
              key={x.id}
              type="button"
              onClick={() => setOpen(x)}
              className="group flex flex-col justify-between rounded-3xl border-2 border-[#D7FF3A]/60 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#D7FF3A] hover:shadow-[0_0_0_4px_rgba(215,255,58,0.15)]"
            >
              <CardBody x={x} />
            </button>
          ) : x.link ? (
            <a
              key={x.id}
              href={x.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-3xl border-2 border-[#D7FF3A]/60 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#D7FF3A] hover:shadow-[0_0_0_4px_rgba(215,255,58,0.15)]"
            >
              <CardBody x={x} />
            </a>
          ) : (
            <article
              key={x.id}
              className="flex flex-col justify-between rounded-3xl border-2 border-dashed border-[#F5F5F0]/20 p-6 transition-colors hover:border-solid hover:border-[#D7FF3A]"
            >
              <CardBody x={x} />
            </article>
          )
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex overflow-y-auto overscroll-contain bg-black/80 p-3 backdrop-blur-sm animate-[fade-in_0.2s_ease-out] md:p-6"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-dialog-title"
            className="m-auto w-full max-w-5xl rounded-3xl border-2 border-[#D7FF3A] bg-[#0B0B0B] p-5 animate-[pop-in_0.3s_cubic-bezier(0.22,1,0.36,1)] md:p-7"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase text-[#D7FF3A]">[lab / {open.status.toLowerCase()}]</span>
                <h2 id="lab-dialog-title" className="mt-2 font-[family-name:var(--display)] text-4xl uppercase leading-none md:text-5xl">
                  {open.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm opacity-70">{open.description}</p>
                {open.link && (
                  <a
                    href={open.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-full bg-[#D7FF3A] px-4 py-2 text-sm uppercase text-black transition-transform hover:-rotate-3"
                  >
                    view on github ↗
                  </a>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="shrink-0 rounded-full border-2 border-[#F5F5F0]/30 px-4 py-2 text-sm uppercase transition-colors hover:border-[#D7FF3A] hover:bg-[#D7FF3A] hover:text-black"
              >
                esc ✕
              </button>
            </div>

            {open.diagram ? (
              <>
                {/* Diagram scrolls sideways on narrow screens instead of shrinking to unreadable */}
                <div className="-mx-1 overflow-x-auto rounded-2xl border border-[#F5F5F0]/10 bg-[#111] p-2">
                  {(() => {
                    const { Diagram } = details[open.diagram!]
                    return <Diagram />
                  })()}
                </div>

                <h3 className="mb-3 mt-6 text-xs uppercase opacity-60">{details[open.diagram!].stepsTitle}</h3>
                <ol className="grid gap-3 md:grid-cols-3">
                  {details[open.diagram!].steps.map(s => (
                    <li key={s.n} className="rounded-2xl border border-[#F5F5F0]/15 p-4">
                      <span className="font-[family-name:var(--display)] text-2xl text-[#D7FF3A]">{s.n}</span>
                      <div className="mt-1 font-[family-name:var(--display)] uppercase">{s.title}</div>
                      <p className="mt-2 text-sm opacity-70">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </>
            ) : open.screenshots ? (
              <Gallery shots={open.screenshots} />
            ) : null}

            <h3 className="mb-3 mt-6 text-xs uppercase opacity-60">what i&apos;m learning</h3>
            <div className="flex flex-wrap gap-2">
              {open.focus.map(f => (
                <span key={f} className="rounded-full border border-[#F5F5F0]/30 px-3 py-1 text-xs">{f}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
