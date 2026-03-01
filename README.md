# Paymand

**One-line mandates for every AI agent**  
Autonomous payments powered by x402 + Celer state channels • Built for the agentic economy

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-FF4F00?style=for-the-badge&logoColor=white)](https://orm.drizzle.team)

---

## 🚀 What is Paymand?

Paymand is the **missing payments layer** for autonomous AI agents.

Give any agent (LangChain, CrewAI, AutoGen, or custom) the power to discover services, negotiate via the x402 protocol, and pay autonomously using spending mandates — all in **one line of code**.

Built as a full-stack TypeScript demo with real testnet visuals (Base Sepolia), persistent transaction ledger, and beautiful agent terminal UI. Perfect for hackathons, investors, and early adopters in the exploding agentic economy.

**Live Demo** (click to try instantly):  
https://paymand.vercel.app/

---

## ✨ Key Features

- **One-line integration** — Drop `new Paymand({ maxSpend: 0.1, channel: "celer" })` into any agent
- **Built-in spending mandates** — Session keys, max daily spend, revocable rules, human kill-switch
- **x402-native** — Automatically detects and pays "Payment Required" responses
- **Celer-first privacy** — Defaults to off-chain state channels (sub-cent, millisecond, private)
- **Base Sepolia Testnet mode** — Real-looking proofs + clickable Basescan links
- **Persistent Ledger** — Every transaction saved in Drizzle ORM + Postgres (for demo)
- **Beautiful agent terminal UI** — Real-time logs, receipts, and history
- **Fully responsive** — Looks perfect on mobile and desktop
- **Production-ready architecture** — Full-stack TypeScript, Vite, Tailwind, Drizzle

---

## 🛠 Quick Start (Developers)

### 1. Clone & Run Locally
```bash
git clone https://github.com/zerotestlab-ctrl/Paymand.git
cd Paymand
npm install
npm run dev
---

Open http://localhost:5173 (or the Vite port shown).2. One-line SDK Example (copy-paste into any agent)ts


import Paymand from './path-to-paymand-sdk';

const paymand = new Paymand({
  maxSpend: 0.05,           // USDC per day
  channel: "celer",         // or "onchain"
  wallet: "0x7aF4...kP9q"   // agent wallet
});

agent.addTool(paymand.tool); // ← magic happens here

Now your agent can autonomously pay for APIs, data, compute, or other agents. Try the Demo (No Code Needed)Click the big green "Run Autonomous Agent Demo" button

Watch the agent:Wake up

Detect an x402 paywall

Pay instantly via Celer simulation

Show a cryptographically signed receipt


Click any proof hash → opens real Basescan (testnet)

All transactions saved in the Ledger below


Architecture

Paymand/
├── client/          # React + Tailwind frontend (Vite)
├── server/          # Node.js/TS backend + API routes
├── shared/          # Paymand core SDK class + types
├── script/          # Migration & seed scripts
├── drizzle.config.ts
└── package.json



Frontend: Beautiful terminal + ledger UI

Backend: Drizzle ORM + SQLite/Postgres for persistent history

Core SDK: Pure TypeScript class with mandates + x402 handler

Testnet: Base Sepolia (Chain ID 84532)


Roadmap (Next 30 Days)Real x402 + Celer testnet integration (live micropayments)

LangChain & CrewAI official adapters (npm packages)

Hosted agent dashboard (no-code for non-devs — coming v2)

Open-source npm package @paymand/sdk

Multi-chain support (Solana, Ethereum)


Contributing
We welcome PRs! This project was built by a solo founder. Want to help ship the real on-chain version? Open an issue or DM on X.

LicenseMIT
License — feel free to fork, use, and build on top. Made with love for the agentic economy

Built by zerotestlab Part of the x402 + Celer agent payments movement.

Star the repo if you believe agents should have economic autonomy.Ready to make agents pay?

Run the demo → Star → Build something crazy with Paymand.



