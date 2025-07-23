# Group Chat Application

## Introduction


A modern, monochrome-themed group chat application built with React, TypeScript, Vite, and Tailwind CSS. This project demonstrates a clean, accessible, and highly customizable chat UI, suitable for both desktop and mobile devices.

## Features

- **Group chat rooms** with participant roles (Admin, Agent, Customer)
- **Responsive sidebar** for room navigation, collapses on mobile
- **Message bubbles** for outgoing/incoming messages
- **File upload support** (image, video, PDF)
- **Role-based color coding** for participants
- **Custom UI components** (buttons, popovers, tooltips, toasts, etc.)
- **Dark/monochrome theme** with Tailwind and CSS variables
- **Accessible keyboard navigation** and focus styles
- **Animated transitions** for UI elements

## Getting Started

1. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

2. **Start the development server:**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

3. **Open** [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components/` – Reusable UI and chat components
- `src/pages/` – Main app pages (e.g., `ChatApp.tsx`)
- `src/types/` – TypeScript interfaces for chat data
- `public/` – Static assets and mock chat data

## What to Do Next

- **Connect to a backend:** Integrate real-time messaging (e.g., with WebSocket, Firebase, or your own API)
- **Authentication:** Add user login and role management
- **Persistence:** Store chat history and user preferences
- **Notifications:** Implement push or in-app notifications
- **Testing:** Add unit and integration tests for components and logic
- **Accessibility:** Further improve ARIA roles and keyboard support
- **Deployment:** Prepare for production and deploy (e.g., Vercel, Netlify)

---