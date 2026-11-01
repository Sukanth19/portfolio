// Flowchart of the home lab: devices -> router -> old laptop server (Jellyfin + Samba) -> storage.
// Plain SVG; the dashed links animate to show data moving.

import { ACID, PAPER, Link, Node } from './diagramKit'

const devices = [
  { title: 'TV', sub: 'watches', y: 60 },
  { title: 'PHONE', sub: 'watches', y: 170 },
  { title: 'LAPTOP / PC', sub: 'watches + uploads', y: 280 },
]

export function HomeLabDiagram() {
  return (
    <svg
      viewBox="0 0 820 440"
      role="img"
      aria-labelledby="homelab-title homelab-desc"
      className="h-auto w-full min-w-[640px]"
    >
      <title id="homelab-title">Home lab diagram</title>
      <desc id="homelab-desc">
        TV, phone and laptop connect through the home router to an old laptop running Linux. On it, Jellyfin streams
        media and a Samba share acts as the NAS. Both read from the same storage drive.
      </desc>

      {/* Column labels */}
      <text x={85} y={36} textAnchor="middle" fill={PAPER} opacity={0.5} style={{ fontSize: 11 }}>YOUR SCREENS</text>
      <text x={300} y={36} textAnchor="middle" fill={PAPER} opacity={0.5} style={{ fontSize: 11 }}>NETWORK</text>

      {/* Server enclosure */}
      <rect x={450} y={20} width={355} height={400} rx={22} fill="none" stroke={ACID} strokeWidth={2} strokeDasharray="8 8" />
      <text x={470} y={52} fill={ACID} style={{ fontFamily: 'var(--display)', fontSize: 18 }}>OLD LAPTOP → SERVER</text>
      <text x={470} y={72} fill={PAPER} opacity={0.6} style={{ fontSize: 11 }}>linux · always on · lid closed · no monitor</text>

      {/* Links: drawn before nodes so they tuck underneath */}
      {devices.map(d => (
        <Link key={d.title} d={`M150 ${d.y + 28} C 190 ${d.y + 28}, 190 198, 230 198`} />
      ))}
      <Link d="M370 186 C 425 186, 425 140, 470 140" label="stream" lx={402} ly={150} />
      <Link d="M370 210 C 425 210, 425 266, 470 266" label="files (SMB)" lx={384} ly={272} />
      <Link d="M630 140 C 650 140, 650 190, 670 190" />
      <Link d="M630 266 C 650 266, 650 236, 670 236" />

      {/* Nodes */}
      {devices.map(d => (
        <Node key={d.title} x={20} y={d.y} w={130} h={56} title={d.title} sub={d.sub} />
      ))}
      <Node x={230} y={158} w={140} h={80} title="ROUTER" sub="home wi-fi / LAN" />
      <Node x={470} y={105} w={160} h={70} title="JELLYFIN" sub="docker · port 8096" highlight />
      <Node x={470} y={231} w={160} h={70} title="NAS SHARE" sub="samba · shared folder" highlight />
      <Node x={670} y={150} w={115} h={126} title="STORAGE" sub="media drive" />

      {/* Server footer */}
      <text x={470} y={350} fill={PAPER} opacity={0.6} style={{ fontSize: 11 }}>managed headless over SSH</text>
      <text x={470} y={370} fill={PAPER} opacity={0.6} style={{ fontSize: 11 }}>services run in docker compose</text>
      <text x={470} y={400} fill={ACID} style={{ fontSize: 11 }}>cost: ₹0 · it was gathering dust anyway</text>
    </svg>
  )
}
