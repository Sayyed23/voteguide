# VoteGuide 🗳️

VoteGuide is a comprehensive, interactive web application designed to guide citizens through the entire electoral process. From checking eligibility to understanding how votes are counted, VoteGuide breaks down the complexities of voting into a simple, step-by-step timeline.

## 🌟 Features

- **Interactive Timeline**: A dynamic 7-stage timeline covering the entire election lifecycle.
- **Stage-Specific Content**: Detailed information, FAQs, and actionable steps for each phase of the election process.
- **Interactive Checklists**: Keep track of your progress with built-in to-do lists for requirements like ID verification and registration.
- **Modern UI/UX**: Built with Next.js 16, React 19, and Tailwind CSS 4 for a fast, responsive, and beautiful experience.
- **Premium Design**: A sleek, dark-themed design for optimal readability and modern appeal.

## 🗺️ The 7 Stages of Voting

1. **Eligibility**: Understand the fundamental requirements to participate (Age, Citizenship, Residency).
2. **Registration**: How, where, and when to register to vote.
3. **Verification**: Checking your voter status and finding your polling place.
4. **Voting Methods**: Exploring your options: early voting, mail-in, absentee, or in-person.
5. **Election Day**: What to expect at the polls, required IDs, and your rights as a voter.
6. **Counting**: Insight into the meticulous process of how votes are processed and tallied.
7. **Results**: Understanding certification, canvassing, and official election outcomes.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: TypeScript

## 🛠️ Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app`: Next.js app router pages and layouts.
- `/components`: Reusable React components (Navbar, Hero, Timeline, FAQ, etc.).
- `/data`: Static data files, including the 7-stage election timeline data.
- `/public`: Static assets.
