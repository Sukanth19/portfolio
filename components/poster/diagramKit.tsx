// Shared building blocks for the lab diagrams (plain SVG, poster palette).

export const INK = '#0B0B0B'
export const PAPER = '#F5F5F0'
export const ACID = '#D7FF3A'

interface NodeProps {
  x: number
  y: number
  w: number
  h: number
  title: string
  sub?: string
  highlight?: boolean
}

export function Node({ x, y, w, h, title, sub, highlight }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        fill={highlight ? ACID : '#161616'}
        stroke={highlight ? ACID : 'rgba(245,245,240,0.35)'}
        strokeWidth={2}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 6}
        textAnchor="middle"
        fill={highlight ? INK : PAPER}
        style={{ fontFamily: 'var(--display)', fontSize: 17, letterSpacing: '0.02em' }}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 15}
          textAnchor="middle"
          fill={highlight ? INK : PAPER}
          opacity={highlight ? 0.8 : 0.6}
          style={{ fontSize: 11 }}
        >
          {sub}
        </text>
      )}
    </g>
  )
}

export function Link({ d, label, lx, ly }: { d: string; label?: string; lx?: number; ly?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(245,245,240,0.15)" strokeWidth={6} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={ACID}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="2 10"
        className="animate-[flow_0.9s_linear_infinite]"
      />
      {label && (
        <text x={lx} y={ly} textAnchor="middle" fill={PAPER} opacity={0.75} style={{ fontSize: 11 }}>
          {label}
        </text>
      )}
    </g>
  )
}
