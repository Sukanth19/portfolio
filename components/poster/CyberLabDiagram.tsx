// Flowchart of the cyber lab: everything runs as VMs on one host, on an isolated virtual network.
// Kali attacks two deliberately vulnerable targets while Wazuh watches. No route to the internet.

import { ACID, PAPER, Link, Node } from './diagramKit'

export function CyberLabDiagram() {
  return (
    <svg
      viewBox="0 0 820 440"
      role="img"
      aria-labelledby="cyberlab-title cyberlab-desc"
      className="h-auto w-full min-w-[640px]"
    >
      <title id="cyberlab-title">Cybersecurity lab diagram</title>
      <desc id="cyberlab-desc">
        A laptop hosts virtual machines on an isolated network with no internet access. A Kali Linux attacker scans and
        exploits Metasploitable 2 and the DVWA and Juice Shop web apps, while Wazuh collects logs and raises alerts.
      </desc>

      {/* Host enclosure */}
      <rect x={20} y={20} width={785} height={400} rx={22} fill="none" stroke={ACID} strokeWidth={2} strokeDasharray="8 8" />
      <text x={45} y={52} fill={ACID} style={{ fontFamily: 'var(--display)', fontSize: 18 }}>MY LAPTOP → LAB HOST</text>
      <text x={45} y={72} fill={PAPER} opacity={0.6} style={{ fontSize: 11 }}>arch · qemu/kvm · virt-manager</text>

      {/* Internet: deliberately cut off */}
      <path d="M385 185 L385 123" stroke="rgba(245,245,240,0.3)" strokeWidth={2} strokeDasharray="4 6" />
      <circle cx={385} cy={154} r={11} fill="#111" stroke={ACID} strokeWidth={2} />
      <path d="M380 149 L390 159 M390 149 L380 159" stroke={ACID} strokeWidth={2.5} strokeLinecap="round" />
      <text x={404} y={158} fill={PAPER} opacity={0.75} style={{ fontSize: 11 }}>no route out</text>

      {/* Links: drawn before nodes so they tuck underneath */}
      <Link d="M210 215 L300 215" label="attacks" lx={255} ly={203} />
      <Link d="M470 205 C 530 205, 530 160, 590 160" />
      <Link d="M470 225 C 530 225, 530 270, 590 270" />
      <Link d="M385 245 L385 330" label="logs + traffic" lx={438} ly={292} />

      {/* Nodes */}
      <Node x={320} y={75} w={130} h={48} title="INTERNET" sub="unplugged" />
      <Node x={50} y={175} w={160} h={80} title="KALI LINUX" sub="attacker vm" highlight />
      <Node x={300} y={185} w={170} h={60} title="LAB-NET" sub="isolated · host-only" />
      <Node x={590} y={127} w={195} h={66} title="METASPLOITABLE" sub="v2 · vulnerable linux" />
      <Node x={590} y={237} w={195} h={66} title="VULN WEB APPS" sub="dvwa · juice shop" />
      <Node x={300} y={330} w={170} h={66} title="WAZUH" sub="blue team · alerts" highlight />

      {/* Footer notes */}
      <text x={510} y={350} fill={PAPER} opacity={0.6} style={{ fontSize: 11 }}>tools: nmap · metasploit · burp · sqlmap</text>
      <text x={510} y={370} fill={PAPER} opacity={0.6} style={{ fontSize: 11 }}>every vm snapshotted: break it, roll back</text>
      <text x={510} y={400} fill={ACID} style={{ fontSize: 11 }}>rule #1: never point it outside the lab</text>
      <text x={45} y={400} fill={PAPER} opacity={0.6} style={{ fontSize: 11 }}>attack ↔ defend</text>
    </svg>
  )
}
