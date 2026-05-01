# 🗳️ VoteGuide — Your Complete Election Companion

> **Empowering democratic participation through clarity.**  
> A comprehensive, AI-powered web application that guides citizens through every stage of the electoral process — from eligibility to certified results.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5-4285F4?logo=google)](https://ai.google.dev/)
[![Tests](https://img.shields.io/badge/Tests-6%20Passing-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-blue)]()

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [The 7 Stages of Voting](#-the-7-stages-of-voting)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Google Cloud & Firebase Integration](#-google-cloud--firebase-integration)
- [AI Integration](#-ai-integration)
- [Security](#-security)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)

---

## 🎯 Problem Statement

Voter turnout in democracies around the world continues to decline, with **lack of accessible information** cited as one of the top barriers. Citizens often face confusion about:

- Am I eligible to vote?
- How and where do I register?
- What voting methods are available to me?
- Who are the candidates on my specific ballot?
- Where is my polling location?

There is no single, unified platform that walks a voter through the **entire election lifecycle** in a clear, step-by-step manner.

## 💡 Solution

**VoteGuide** is an interactive, AI-powered civic-tech application that transforms the complex election process into a simple, navigable 7-stage timeline. It provides:

- **Personalized ballot previews** based on registration data
- **Real-time AI assistance** for election-related questions
- **Interactive Google Maps** integration for polling locations
- **Persistent progress tracking** via Firebase Authentication & Firestore
- **Multi-step voter registration** with client-side validation

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Interactive 7-Stage Timeline** | Navigate the full election lifecycle with clickable, linked stages |
| 🤖 **AI Election Assistant** | Gemini 1.5 Flash-powered chatbot answers voting questions in real-time |
| 📝 **Voter Registration Form** | Multi-step form with validation, progress indicators, and localStorage persistence |
| 🗳️ **Personalized Ballot** | View candidates and measures specific to your registered district |
| 📍 **Polling Location Finder** | Google Maps integration with dark-mode styling and interactive markers |
| ✅ **Progress Checklists** | Track preparation tasks per stage, synced to Firebase Firestore |
| 🔐 **Google Sign-In** | Firebase Authentication for persistent cross-device progress |
| 👤 **Candidate Profiles** | Detailed candidate pages with key positions and platform info |
| 📱 **Fully Responsive** | Mobile-first design with hamburger navigation |
| ❓ **Contextual FAQs** | Stage-specific frequently asked questions with accordion UI |

---

## 🗺️ The 7 Stages of Voting

```
┌──────────┐   ┌──────────────┐   ┌──────────────┐   ┌────────────────┐
│  Stage 1 │──▶│   Stage 2    │──▶│   Stage 3    │──▶│    Stage 4     │
│Eligibility│  │Registration  │   │Verification  │   │Voting Methods  │
└──────────┘   └──────────────┘   └──────────────┘   └────────────────┘
                                                             │
┌──────────┐   ┌──────────────┐   ┌──────────────┐          │
│  Stage 7 │◀──│   Stage 6    │◀──│   Stage 5    │◀─────────┘
│ Results  │   │  Counting    │   │Election Day  │
└──────────┘   └──────────────┘   └──────────────┘
```

Each stage includes:
- 📖 Detailed educational content with 3-step breakdowns
- ✅ Interactive preparation checklist (Firebase-synced)
- ❓ Contextual FAQ section
- ⬅️➡️ Navigation to previous/next stages

---

## 🏗️ Tech Stack & Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Next.js  │  │  React   │  │  Tailwind CSS 4   │  │
│  │  16 (App  │  │  19      │  │  (Dark Theme)     │  │
│  │  Router)  │  │          │  │                   │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
└──────────────────────┬──────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   ┌────────────┐ ┌─────────┐ ┌──────────────┐
   │  Firebase   │ │ Gemini  │ │ Google Maps  │
   │  Auth +     │ │ 1.5 AI  │ │ JavaScript   │
   │  Firestore  │ │ (API)   │ │ API          │
   └────────────┘ └─────────┘ └──────────────┘
```

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router, Turbopack) | SSR, routing, API routes |
| **UI Library** | React 19 | Component architecture |
| **Language** | TypeScript 5 | End-to-end type safety |
| **Styling** | Tailwind CSS 4 | Utility-first, custom dark theme |
| **Auth & DB** | Firebase Auth + Firestore | Google Sign-In, persistent checklists |
| **AI** | Google Gemini 1.5 Flash | Election assistant chatbot |
| **Maps** | Google Maps JavaScript API | Polling location finder |
| **Testing** | Jest + React Testing Library | Component unit tests |
| **Linting** | ESLint (next/core-web-vitals) | Code quality enforcement |
| **Deployment** | Docker (multi-stage) | Production-ready containerization |

---

## ☁️ Google Cloud & Firebase Integration

VoteGuide leverages **three Google Cloud services**:

### 🔐 Firebase Authentication
- Google Sign-In via `signInWithPopup`
- Enables persistent, cross-device checklist progress
- Graceful degradation — app works fully without sign-in

### 🗄️ Cloud Firestore
- Stores per-user checklist state at `users/{uid}/checklists/stage_{id}`
- Real-time sync on auth state changes
- Secure rules ensure users can only access their own data

### 🤖 Google Gemini AI
- Server-side API route (`/api/chat`) calls Gemini 1.5 Flash
- Context-aware prompting scoped to election topics
- Input validation: type checking, 500-char limit, sanitization

### 🗺️ Google Maps Platform
- Maps JavaScript API with custom dark-mode styling
- Interactive markers for polling locations
- Client-side centering on location click

---

## 🤖 AI Integration

The **Election Assistant** is a floating chatbot widget available on every page:

- Powered by **Google Gemini 1.5 Flash** via a Next.js API route
- System prompt constrains responses to election/voting topics
- Input validation prevents abuse (length limits, type checking)
- Graceful error handling for network failures and API errors
- Animated loading indicators and smooth open/close transitions

---

## 🔒 Security

| Measure | Implementation |
|---------|---------------|
| **Content Security Policy** | Strict CSP header via `next.config.ts` |
| **HSTS** | `Strict-Transport-Security: max-age=31536000` |
| **Clickjacking Protection** | `X-Frame-Options: DENY` |
| **MIME Sniffing Prevention** | `X-Content-Type-Options: nosniff` |
| **Referrer Policy** | `strict-origin-when-cross-origin` |
| **API Input Validation** | Type checking, length limits, sanitization |
| **Secrets Management** | `.env` excluded from git, `.env.example` provided |
| **Firebase Graceful Fallback** | App works without API keys (features disabled, no crashes) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ 
- **npm** 10+
- API keys (optional, for full features):
  - [Google Maps API Key](https://console.cloud.google.com/) (Maps JavaScript API enabled)
  - [Gemini API Key](https://aistudio.google.com/)
  - [Firebase Project](https://console.firebase.google.com/) (Auth + Firestore enabled)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/voteguide.git
cd voteguide

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your API keys (see .env.example for details)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

> **Note:** The app works without API keys — Maps, AI chatbot, and Firebase features will gracefully degrade.

---

## 📁 Project Structure

```
voteguide/
├── __tests__/                  # Jest unit tests
│   ├── FAQ.test.tsx
│   ├── Navbar.test.tsx
│   └── Timeline.test.tsx
├── public/
│   └── images/                 # Static assets
├── src/
│   ├── app/
│   │   ├── api/chat/           # Gemini AI API route
│   │   ├── candidates/         # Candidate listing + detail pages
│   │   ├── locations/          # Polling location finder (Google Maps)
│   │   ├── my-ballot/          # Personalized ballot page
│   │   ├── registration/       # Registration info + multi-step form
│   │   ├── stage/[slug]/       # Dynamic stage pages (7 stages)
│   │   ├── layout.tsx          # Root layout (fonts, AI widget)
│   │   ├── globals.css         # Design system (theme tokens)
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── forms/              # RegistrationForm (multi-step)
│   │   ├── layout/             # Navbar, Footer, Sidebar, StageContent
│   │   └── ui/                 # Hero, Timeline, Checklist, FAQ, AIAssistant
│   ├── data/
│   │   └── timelineData.ts     # 7-stage election data (static)
│   └── lib/
│       └── firebase.ts         # Firebase init (Auth + Firestore)
├── Dockerfile                  # Multi-stage Docker build
├── next.config.ts              # Security headers, standalone output
├── jest.config.js              # Jest + ts-jest configuration
├── .env.example                # Environment variable template
└── package.json
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Current results:
# Test Suites: 3 passed, 3 total
# Tests:       6 passed, 6 total
```

| Test Suite | Tests | What It Covers |
|-----------|-------|---------------|
| `Navbar.test.tsx` | 2 | Brand logo rendering, all 5 nav links present |
| `FAQ.test.tsx` | 3 | Title rendering, question rendering, accordion expand |
| `Timeline.test.tsx` | 1 | Component renders with stage labels |

---

## 🐳 Deployment

### Docker

```bash
# Build the Docker image
docker build -t voteguide .

# Run the container
docker run -p 8080:8080 voteguide
```

### Google Cloud Run

```bash
# Build and push to Artifact Registry, then deploy
gcloud run deploy voteguide \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 📄 License

This project is built for the Hack2skill hackathon. MIT License.

---

<p align="center">
  Built with ❤️ for democracy
</p>
