# Aaron Rhim — Interactive Portfolio & Experimental Playground

My full-stack personal portfolio built with **Vite**, **React**, and **TypeScript**, designed as an evolving hub for my projects, simulations, and robotics research.  

🌐 **Live Site:** [aaronrhim.com](https://aaronrhim.com)
AWS AMPLIFY IS CURRENTLY DOWN. TO VIEW WEBSITE, PLEASE CLONE THE REPOSITORY YOURSELF AND FOLLOW THE INSTRUCTIONS BELOW.

---

## 🧭 Overview

This website serves as both a **personal portfolio** and a **technical sandbox**—showcasing robotics experiments, design prototypes, and full-stack utilities I’ve built.

It’s a reflection of my workflow: modular, fast, and always being refactored.  
Below is a breakdown of how everything is built and organized.

- 🛠️ Tools & Frameworks  
- ⚙️ Frontend Architecture  
- 🧩 UI/UX Design System  
- ☁️ Backend + Integrations  
- 🚀 Deployment & Hosting  
- 🔮 Future Directions  

---

## 🛠️ Tools & Frameworks

| Category | Technologies |
|-----------|---------------|
| **Frontend** | Vite, React, TypeScript, TailwindCSS, shadcn/ui |
| **Design** | Figma, Framer, Illustrator |
| **Deployment** | AWS Amplify (custom domain) |
| **Utilities** | ESLint, Prettier, pnpm |

---

## ⚙️ Frontend Architecture

The site uses **Vite + React** for an extremely fast development workflow.  
Everything is built around a **component-driven** structure, optimized for clarity and reusability.

### Highlights
- **Dynamic Navigation & Layouts** – Each page and section is modularly routed.  
- **Instant Development Preview** – Powered by `vite`’s live reload and AWS Amplify’s deployment pipeline.  
- **Type-Safe Components** – Fully typed using TypeScript, improving scalability and error prevention.  
- **Responsive Design** – TailwindCSS and utility-first classes ensure pixel-perfect layouts from mobile to 4K.  
- **shadcn/ui Integration** – Pre-styled accessible components fine-tuned for a cohesive visual identity.  

---

## 🧩 UI / UX Design System

Designed in **Figma**, emphasizing:
- **Minimal visual noise** – clean, layered typography and accent color hierarchy.  
- **Micro-interactions** – subtle transitions powered by Tailwind’s animation utilities.  
- **Scalable sections** – each module (Projects, About, Contact) can expand independently.

---

## ☁️ Backend + Integrations

This site runs entirely on a static front-end but integrates several backend and automation components:
- **GitHub Integration** – Commits from AWS Amplify to sync and deploy automatically to this repo.  
- **Custom Scripts** – Node.js utilities for managing builds and experimental APIs.  
- **Local Development** – Fully configurable using your IDE, Codespaces, or AWS Amplify editor.

```bash
# Clone and run locally
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
