export interface Project {
  number: string;
  name: string;
  category: string;
  type: 'Open Source' | 'Client Project';
  description: string;
  tags: string[];
  gradient: string;
  image: string;
  link?: string;
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'Rasco',
    category: 'Desktop AI Assistant',
    type: 'Open Source',
    description:
      "A JARVIS-style desktop AI assistant — Claude Code CLI wired as the reasoning engine, Tkinter as the face. Reads your code, runs commands, and answers questions in real time.",
    tags: ['Python', 'Tkinter', 'Claude Code CLI'],
    gradient: 'linear-gradient(135deg,#3b1e6e,#161022)',
    image: '/projects/rasco.jpg',
    link: 'https://github.com/AlirezaRg',
  },
  {
    number: '02',
    name: 'Gosi',
    category: 'Cyberpunk Coding Assistant',
    type: 'Open Source',
    description:
      'A cyberpunk-themed coding assistant with a sheep mascot, powered by Claude Code CLI. Explains functions, finds bugs, and suggests fixes — all from a sleek desktop UI.',
    tags: ['Python', 'Claude Code CLI', 'Desktop UI'],
    gradient: 'linear-gradient(135deg,#5b8cff,#161022)',
    image: '/projects/gosi.jpg',
    link: 'https://github.com/AlirezaRg',
  },
  {
    number: '03',
    name: 'Flask + Odoo Bridge',
    category: 'ERP / Hardware Integration',
    type: 'Client Project',
    description:
      'Flask middleware connecting ST-Face E540 biometric devices to Odoo 18 ERP. Employees check in on a physical device — Odoo records it instantly via WebSocket, no manual data entry.',
    tags: ['Flask', 'Odoo 18', 'WebSocket', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg,#ff4d6d,#2a0f1a)',
    image: '/projects/odoo-bridge.jpg',
  },
  {
    number: '04',
    name: 'EX-CHANGE',
    category: 'AI Code Translator',
    type: 'Open Source',
    description:
      'AI-powered code translator across 13 programming languages. Write in Python, get it in Rust, Go, Java or any other — instantly, with Claude Code CLI preserving the idioms of the target language.',
    tags: ['Python', 'Tkinter', 'Claude Code CLI', 'Threading'],
    gradient: 'linear-gradient(135deg,#2fbf71,#0f1f18)',
    image: '/projects/exchange.jpg',
    link: 'https://github.com/AlirezaRg',
  },
  {
    number: '05',
    name: 'CODEANALYSIS',
    category: 'Codebase Q&A Tool',
    type: 'Open Source',
    description:
      'Scan your entire project folder with one click, then ask anything in plain language. Claude Code CLI reads the code and answers instantly.',
    tags: ['Python', 'Tkinter', 'Claude Code CLI', 'Threading'],
    gradient: 'linear-gradient(135deg,#2fbf9f,#0f1f1e)',
    image: '/projects/codeanalysis.jpg',
    link: 'https://github.com/AlirezaRg',
  },
  {
    number: '06',
    name: 'Telegram Downloader Bot',
    category: 'Media Downloader',
    type: 'Open Source',
    description:
      'Downloads from YouTube, Instagram, TikTok, SoundCloud and Twitter/X. Users pick video or audio format. Admins get a built-in panel for user stats, banning, and broadcasting.',
    tags: ['Python', 'python-telegram-bot', 'yt-dlp', 'SQLite'],
    gradient: 'linear-gradient(135deg,#ffb020,#2a1c05)',
    image: '/projects/telegram-bot.jpg',
    link: 'https://github.com/AlirezaRg',
  },
  {
    number: '07',
    name: 'Omid Market',
    category: 'E-commerce Platform',
    type: 'Client Project',
    description:
      'A full-featured Django e-commerce app for a supermarket. Product catalog, cart management, ZarinPal payment gateway, and admin panel — with complete RTL support for Persian users.',
    tags: ['Django', 'PostgreSQL', 'ZarinPal', 'Bootstrap 5 RTL'],
    gradient: 'linear-gradient(135deg,#c026d3,#1c0a20)',
    image: '/projects/omid-market.jpg',
  },
];
