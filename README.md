# 🖥️ Terminal Portfolio

A **terminal-style personal portfolio** built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, designed to feel like a real Linux shell instead of a fake UI.

This project is for engineers who prefer keyboards over buttons and terminals over landing pages.

---

## ✨ Features

- Retro **green-on-black terminal UI**
- Real command-based interaction
- Keyboard-driven input (no mouse dependency)
- Command history (`↑ / ↓`)
- Extensible command registry
- One-time boot / loading screen
- ASCII banner
- Resume download from terminal
- Deployed on **Vercel**

---

## 🧠 Commands

Available commands inside the terminal:

```text
help            → list all available commands
about           → who I am
skills          → technical skills (CSV-style)
projects        → list projects
project <id>    → detailed project info
education       → academic background
links           → GitHub, LeetCode, LinkedIn, Resume
contact         → contact information
clear           → clear terminal
neofetch        → system-style profile info
whoami          → short identity
sudo            → permission denied :)
exit            → fake shell exit

Commands are implemented via a command registry pattern, making it easy to add new commands without touching core logic.
🛠️ Tech Stack

    Framework: Next.js 14 (App Router)

    Language: TypeScript

    Styling: Tailwind CSS

    Deployment: Vercel

    Font: Monospace (terminal-first)

No backend. No unnecessary dependencies. Fast by design.

The architecture is intentionally simple and extendable.
🚀 Getting Started (Local Development)

Clone the repo:

git clone git@github.com:Sukanth19/portfolio.git
cd portfolio

Install dependencies:

npm install
# or
pnpm install
# or
yarn install

Run the dev server:

npm run dev

Open:

http://localhost:3000

The terminal UI hot-reloads as you edit files.
📄 Resume

The resume is stored as a static asset:

/public/Sukanth_Resume_Placeholder.pdf

It can be:

    Downloaded via the links command

    Updated without touching application logic

🌐 Deployment

This project is deployed on Vercel.

Deployment flow:

    Push to main

    Vercel automatically builds and deploys

    Zero config required

🎯 Why This Exists

Most portfolios are:

    bloated

    generic

    mouse-heavy

    forgettable

This one is:

    fast

    opinionated

    keyboard-first

    engineer-oriented

If you enjoy terminals, you’ll feel at home.
📬 Contact

    GitHub: https://github.com/Sukanth19

    LinkedIn: https://linkedin.com/in/aniruddha-sukanth

    Email: sukan3066@gmail.com

📝 License

MIT — feel free to fork, modify, and build your own version.


---

### Why this README works
- Explains **what the project is**
- Shows **architecture maturity**
- Signals **engineering taste**
- Looks good to recruiters *and* devs
- Matches your terminal aesthetic

If you want, next we can:
- tighten this for **ATS/recruiter scanning**
- add **screenshots/gifs** (tastefully)
- add a **“Design Decisions”** section (huge green flag)

Say the word.
