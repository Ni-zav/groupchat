
# Bun React Group Chat

## Features

- **Tech Stack:** Bun, React 19, Tailwind CSS, ShadCN UI conventions
- **Flat, monochrome UI:** Black/gray, no rounded corners, minimalistic
- **Responsive layout:** Sidebar (rooms) and main chat, mobile-friendly
- **Sidebar:** List of chat rooms, highlights selected, click to switch
- **ChatRoom:** Shows room name, image, participants with roles (admin, agent, customer)
- **MessageList:** Scrollable, auto-scrolls to latest, resolves sender info
- **Message:** Renders text, image, video, and PDF inline
  - Text: black-on-gray
  - Image: max-width, flat
  - Video: controls, flat
  - PDF: link to view/download
  - Alignment: left for customer, right for agent/admin
- **Data:** Loads static chat data from `src/chat/chat.json`
- **Assets:** Logo in `src/logo.svg`

## Getting Started

Install dependencies:
```bash
bun install
```

Start development server:
```bash
bun dev
```

Run for production:
```bash
bun start
```

## File Structure

- `src/index.tsx` - Bun server entry, serves static and SPA routes
- `src/index.html` - Main HTML file
- `src/frontend.tsx` - React app entry point
- `src/App.tsx` - Main app component
- `src/components/Sidebar.tsx` - Room list
- `src/components/ChatRoom.tsx` - Room info and participants
- `src/components/MessageList.tsx` - Renders all messages
- `src/components/Message.tsx` - Renders a single message
- `src/chat/chat.json` - Static chat data
- `src/logo.svg` - Logo asset

## What To Do Next

To create a full front-end group chat endpoint:

1. **Backend API:** Implement REST or WebSocket endpoints for real-time chat, room management, and message CRUD.
2. **Frontend Integration:** Replace static fetch with API calls, handle loading/sending messages, room switching, and attachments.
3. **Authentication:** Add user login, role assignment, and session management.
4. **File Uploads:** Support image/video/pdf uploads and previews.
5. **Notifications:** Add toast or banner notifications for new messages/events.
6. **Cloud Deployment:** Bundle and deploy to Cloudflare Pages or Vercel.
7. **Testing:** Add unit and integration tests for components and API.

---
This project was created using `bun init` in bun v1.2.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
