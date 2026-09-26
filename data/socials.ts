export interface SocialLink {
  id: string
  label: string
  username?: string
  url: string
  icon: string
  showInQuickLinks?: boolean
  showInTerminal?: boolean
}

export const socials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    username: 'Sukanth19',
    url: 'https://github.com/Sukanth19',
    icon: 'github',
    showInQuickLinks: true,
    showInTerminal: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    username: 'aniruddhasukanth',
    url: 'https://www.linkedin.com/in/aniruddhasukanth/',
    icon: 'linkedin',
    showInQuickLinks: true,
    showInTerminal: true,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    username: 'Aniurddha',
    url: 'https://leetcode.com/u/Aniurddha/',
    icon: 'leetcode',
    showInQuickLinks: true,
    showInTerminal: true,
  },
  {
    id: 'discord',
    label: 'Discord',
    username: 'zynk__19',
    url: '#',
    icon: 'discord',
    showInQuickLinks: true,
    showInTerminal: true,
  },
  {
    id: 'kaggle',
    label: 'Kaggle',
    username: '[To Be Updated]',
    url: '[To Be Updated]',
    icon: 'kaggle',
    showInQuickLinks: false,
    showInTerminal: false,
  },
  {
    id: 'tryhackme',
    label: 'TryHackMe',
    username: '[To Be Updated]',
    url: '[To Be Updated]',
    icon: 'tryhackme',
    showInQuickLinks: false,
    showInTerminal: false,
  },
  {
    id: 'hackthebox',
    label: 'HackTheBox',
    username: '[To Be Updated]',
    url: '[To Be Updated]',
    icon: 'hackthebox',
    showInQuickLinks: false,
    showInTerminal: false,
  },
]

export const emailUrl = 'mailto:sukan3066@gmail.com'
export const resumePath = '/resume.pdf'
