import { projects } from '@/data/projects'
import { experiences } from '@/data/experience'
import { experiments } from '@/data/experiments'
import { technologies } from '@/data/technologies'
import { socials, emailUrl, resumePath } from '@/data/socials'
import { GitHubActivity } from '@/components/poster/GitHubActivity'
import { LabGrid } from '@/components/poster/LabGrid'

const NAME = 'SUKANTH'
const links = socials.filter(s => s.showInConnect && s.url.startsWith('http'))
const discord = socials.find(s => s.id === 'discord')

const nav = [
  { href: '#work', label: 'work' },
  { href: '#about', label: 'about' },
  { href: '#lab', label: 'lab' },
  { href: '#log', label: 'log' },
  { href: '#contact', label: 'contact' },
]

const facts = [
  { label: 'based in', value: 'India' },
  { label: 'studying', value: 'CS @ Amrita Vishwa Vidyapeetham' },
  { label: 'runs', value: 'Arch Linux (btw) + Hyprland' },
  { label: 'editor', value: "Neovim (can't exit)" },
  { label: 'debugger', value: 'print statements, unapologetically' },
  { label: 'open to', value: 'internships' },
]

const quirks = ['build', 'break', 'understand', 'rebuild', 'arch btw', 'neovim', 'hyprland', 'print debugging']

function SectionTitle({ children, index }: { children: React.ReactNode; index: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="font-[family-name:var(--display)] text-6xl uppercase leading-[0.85] md:text-8xl">
        {children}
        <span className="text-[#D7FF3A]">*</span>
      </h2>
      <span className="pb-2 text-xs uppercase opacity-60">({index})</span>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* Floating nav: bottom-centre on phones, top-right on desktop */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 z-50 flex gap-1 rounded-full bg-black p-1 text-xs uppercase text-[#F5F5F0] md:bottom-auto md:right-8 md:top-6">
        {nav.map(n => (
          <a key={n.href} href={n.href} className="rounded-full px-3 py-1.5 transition-colors hover:bg-[#D7FF3A] hover:text-black">
            {n.label}
          </a>
        ))}
      </nav>

      {/* Hero */}
      <section className="flex min-h-screen flex-col justify-between bg-[#D7FF3A] p-4 text-black md:p-8">
        <div className="flex justify-between pr-0 text-xs uppercase md:pr-[380px]">
          <span>[ portfolio ]</span>
          <span className="hidden md:inline">CS student / developer / experimenter</span>
        </div>
        <div>
          <h1 aria-label={NAME} className="flex overflow-hidden whitespace-nowrap font-[family-name:var(--display)] text-[16.5vw] uppercase leading-[0.8] tracking-[-0.04em]">
            {NAME.split('').map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="inline-block animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {ch}
              </span>
            ))}
          </h1>
          <div className="mt-6 flex flex-col gap-6 border-t-4 border-black pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-snug md:text-xl">
              i build things that are slightly too hard for me, then figure them out along the way.
            </p>
            <div className="flex gap-3 text-sm uppercase">
              <a href={resumePath} download className="rounded-full bg-black px-5 py-3 text-[#D7FF3A] transition-transform hover:-rotate-3">resume ↓</a>
              <a href={emailUrl} className="rounded-full border-2 border-black px-5 py-3 transition-transform hover:rotate-3">email ✉</a>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-2 border-black bg-black py-4 font-[family-name:var(--display)] text-2xl uppercase text-[#D7FF3A] md:text-3xl">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap">
          {[0, 1].map(k => (
            <span key={k} className="flex">
              {quirks.map(w => (
                <span key={w} className="flex gap-6 pr-6">{w}<span>✱</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Work */}
      <section id="work" className="scroll-mt-20 p-4 md:p-8">
        <SectionTitle index="01">Work</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={p.demo ?? p.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border-2 border-[#F5F5F0]/15 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D7FF3A] hover:bg-[#D7FF3A] hover:text-black ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-start justify-between text-xs uppercase">
                <span>{String(i + 1).padStart(2, '0')} / {p.status}</span>
                <span className="text-3xl leading-none transition-transform duration-300 group-hover:rotate-45">↗</span>
              </div>
              <div>
                <p className="mb-2 text-sm opacity-70 group-hover:opacity-100">{p.tagline}</p>
                <h3 className="font-[family-name:var(--display)] text-5xl uppercase leading-[0.9] md:text-7xl">{p.title}</h3>
                <p className="mt-3 max-w-lg text-sm opacity-70 group-hover:opacity-100">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.technology.slice(0, 5).map(t => (
                    <span key={t} className="rounded-full border border-current px-3 py-1 text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="m-4 rounded-3xl bg-[#F5F5F0] p-6 text-black md:m-8 md:p-10">
        {experiences.map(e => (
          <div key={e.id} className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase">experience · {e.startDate} – {e.endDate}</div>
              <h2 className="mt-3 font-[family-name:var(--display)] text-5xl uppercase leading-[0.9] md:text-7xl">{e.organization}</h2>
              <div className="mt-3 inline-block rounded-full bg-black px-4 py-1 text-sm text-[#D7FF3A]">{e.role}</div>
            </div>
            <ul className="space-y-3 text-sm">
              {e.work.map(w => (
                <li key={w} className="border-t border-black/20 pt-3">{w}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 p-4 md:p-8">
        <SectionTitle index="02">About</SectionTitle>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-lg leading-snug md:text-xl">
            <p>computer science undergrad who learns mostly by building.</p>
            <p className="opacity-70">
              i skip the tutorials and pick projects that are a bit beyond me, so i have to understand how the system
              actually works. graphics, ai/ml, security, game dev, self-hosting: if it&apos;s weird and hard, i&apos;m in.
            </p>
            <p className="font-[family-name:var(--display)] text-3xl uppercase text-[#D7FF3A] md:text-4xl">
              build. break. understand. rebuild.
            </p>
          </div>
          <dl>
            {facts.map(f => (
              <div key={f.label} className="grid grid-cols-3 gap-4 border-t border-[#F5F5F0]/15 py-3 text-sm">
                <dt className="uppercase opacity-60">{f.label}</dt>
                <dd className="col-span-2">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Lab */}
      <section id="lab" className="scroll-mt-20 p-4 md:p-8">
        <SectionTitle index="03">Lab</SectionTitle>
        <p className="-mt-4 mb-8 max-w-xl text-sm opacity-60">side quests and experiments. less polished, more fun.</p>
        <LabGrid experiments={experiments} />
      </section>

      {/* Stack */}
      <section className="p-4 md:p-8">
        <h2 className="mb-6 text-xs uppercase opacity-60">things i&apos;ve touched</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((t, i) => (
            <span
              key={t.name}
              className="rounded-full border-2 border-[#F5F5F0]/20 px-4 py-2 text-sm transition-all hover:border-[#D7FF3A] hover:bg-[#D7FF3A] hover:text-black"
              style={{ transform: `rotate(${((i * 37) % 7) - 3}deg)` }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </section>

      {/* GitHub */}
      <section id="log" className="scroll-mt-20 p-4 md:p-8">
        <SectionTitle index="04">Log</SectionTitle>
        <GitHubActivity />
      </section>

      {/* Contact */}
      <footer id="contact" className="mt-8 bg-[#D7FF3A] p-4 text-black md:p-8">
        <p className="text-xs uppercase">(05) got something weird and hard?</p>
        <a href={emailUrl} className="mt-4 block font-[family-name:var(--display)] text-[13vw] uppercase leading-[0.85] transition-opacity hover:opacity-70">
          Let&apos;s talk →
        </a>
        <div className="mt-8 flex flex-col gap-4 border-t-4 border-black pt-6 text-sm uppercase md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-6">
            {links.map(l => (
              <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:no-underline">
                {l.label} ↗
              </a>
            ))}
            {discord?.username && <span>discord: {discord.username}</span>}
          </div>
          <span className="opacity-60">© {new Date().getFullYear()} sukanth</span>
        </div>
      </footer>
    </main>
  )
}
