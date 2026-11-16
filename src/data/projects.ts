export interface Project {
  number: string;
  name: string;
  category: string;
  type: 'Open Source' | 'Client Project';
  description: string;
  tags: string[];
  gradient: string;
  image?: string;
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
  {
    number: '08',
    name: 'Hand Mouse Control',
    category: 'Computer Vision',
    type: 'Open Source',
    description:
      'Controls the Windows mouse cursor with hand movement via webcam — MediaPipe Hands tracks 21 landmarks in real time, a closed fist drags and an open hand releases.',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'PyAutoGUI'],
    gradient: 'linear-gradient(135deg,#0891b2,#0c1a1f)',
    image: '/projects/hand-mouse-control.jpg',
    link: 'https://github.com/AlirezaRg/hand-mouse-control',
  },
  {
    number: '09',
    name: 'CV Playground',
    category: 'Face Recognition',
    type: 'Open Source',
    description:
      'Real-time face detection and recognition pipeline — RetinaFace finds and aligns faces, ArcFace embeds them into 512-dim vectors, and cosine similarity matches them against an enrolled database.',
    tags: ['Python', 'InsightFace', 'OpenCV', 'ArcFace'],
    gradient: 'linear-gradient(135deg,#64748b,#0f1115)',
    image: '/projects/cv-playground.jpg',
    link: 'https://github.com/AlirezaRg/cv-playground',
  },
  {
    number: '10',
    name: 'PDF Insurance to Excel',
    category: 'Document Automation',
    type: 'Open Source',
    description:
      "Converts Iranian social-security insurance-history PDF reports into a single multi-sheet Excel file — plus a Tkinter GUI with OCR for ID documents (Tesseract, Persian).",
    tags: ['Python', 'pdfplumber', 'pandas', 'Tesseract OCR'],
    gradient: 'linear-gradient(135deg,#78716c,#1c1917)',
    image: '/projects/pdf-insurance-to-excel.jpg',
    link: 'https://github.com/AlirezaRg/pdf-insurance-to-excel',
  },
  {
    number: '11',
    name: 'Malvax',
    category: 'Malware Analysis Sandbox',
    type: 'Open Source',
    description:
      'Defensive Linux malware-analysis and behavioral sandbox platform for laboratory use — isolates and observes suspicious binaries to understand what they actually do.',
    tags: ['Python', 'Linux', 'Sandboxing', 'Security'],
    gradient: 'linear-gradient(135deg,#dc2626,#1a0a0a)',
    link: 'https://github.com/AlirezaRg/malvax',
  },
  {
    number: '12',
    name: 'SentinelBot',
    category: 'Server Security Monitor',
    type: 'Open Source',
    description:
      'Self-hosted watcher for Linux servers — catches SSH brute-force attempts, root logins, and unexpected processes or open ports, groups them into scored incidents, and alerts by email, dashboard, and Prometheus metrics.',
    tags: ['Python', 'Linux', 'Prometheus', 'Security'],
    gradient: 'linear-gradient(135deg,#ef4444,#1f0a0a)',
    link: 'https://github.com/AlirezaRg/sentinelbot',
  },
  {
    number: '13',
    name: 'MeetHub',
    category: 'Meeting Task Tracker',
    type: 'Open Source',
    description:
      'A lightweight, meeting-driven task tracker — teams log meetings, assign action items with owners and due dates on Kanban boards, and unfinished tasks automatically carry forward as follow-ups.',
    tags: ['JavaScript', 'Node.js', 'Kanban', 'Telegram'],
    gradient: 'linear-gradient(135deg,#0ea5e9,#0a1420)',
    link: 'https://github.com/AlirezaRg/meethub',
  },
  {
    number: '14',
    name: 'Linux Tamagotchi',
    category: 'Desktop Pet / AI Debugger',
    type: 'Open Source',
    description:
      'A floating crowned-skull desktop pet whose mood and animations react to your system stats — with a terminal version and a Claude-powered debugging assistant that only runs shell commands after you approve them.',
    tags: ['Python', 'Linux', 'Claude Code CLI', 'Desktop UI'],
    gradient: 'linear-gradient(135deg,#a855f7,#160a22)',
    link: 'https://github.com/AlirezaRg/Linux-Tama',
  },
  {
    number: '15',
    name: 'XLSX Dashboard Builder',
    category: 'Document Automation',
    type: 'Open Source',
    description:
      'Windows tool that converts a Persian recruitment data sheet into a formatted, print-ready Excel report — KPI cards, charts, auto-generated analysis, per-project sheets, and hiring-duration calculations.',
    tags: ['Python', 'openpyxl', 'Excel', 'Automation'],
    gradient: 'linear-gradient(135deg,#16a34a,#0a1f10)',
    link: 'https://github.com/AlirezaRg/xlsx-dashboard-builder-',
  },
];
