# Real-Time Chat Application with Socket.io

This project is a real-time chat application built using **Socket.io**, **React**, and **Node.js**. It features bi-directional communication between the client and server, supporting real-time messaging, typing indicators, user presence, and more.

## 📁 Project Structure

socketio-chat/
├── client/ # React front-end
│ ├── public/
│ ├── src/
│ │ ├── components/ # UI components like ChatWindow, MessageBubble, etc.
│ │ ├── context/ # Auth and Socket context
│ │ ├── hooks/ # Custom hooks like useSocket, useAuth
│ │ ├── pages/ # Login, ChatRoom pages
│ │ ├── socket/ # Socket.io client setup
│ │ └── App.jsx
│ └── package.json
├── server/ # Node.js back-end
│ ├── config/ # .env, database setup
│ ├── controllers/ # Event handlers for socket events
│ ├── models/ # User, Message schema (if using DB)
│ ├── socket/ # Socket.io server logic
│ ├── utils/ # Helper functions
│ ├── server.js
│ └── package.json
└── README.md # Project documentation

yaml
Copy
Edit

---

## 🚀 Features

### ✅ Core Features
- Real-time chat with Socket.io
- User authentication
- Join multiple chat rooms
- Private messaging
- Real-time presence tracking

### ✨ Advanced Features
- ✅ Typing indicators
- ✅ Read receipts
- ✅ Online/offline status
- ✅ Real-time notifications for new messages and users joining/leaving

---

## 🛠️ Technologies Used

- **Frontend**: React, Context API, TailwindCSS
- **Backend**: Node.js, Express, Socket.io
- **Tools**: Vite, dotenv, nodemon

---

## 🔐 User Authentication

Authentication is managed using a simple JWT-based or session-based logic (based on implementation). Users must log in to join chat rooms.

---

## 📡 Socket.io Events

### Client ↔ Server Communication
- `joinRoom`: Join a chat room
- `sendMessage`: Send a chat message
- `typing`: Show typing indicator
- `messageRead`: Notify that a message was read
- `disconnect`: Leave room and update presence

---

## 🖼️ Screenshots

### 🔐 Login Interface
![Login Interface](./client/public/login-interface.png)

### 💬 General Chat Interface
![General Chat Interface](./client/public/general-chat-interface.png)

> 📸 Make sure to take these screenshots and save them in a `screenshots/` folder in the project root.

---

## 📦 Installation & Setup

### 🔧 Prerequisites
- Node.js v18+
- npm or yarn

### 🧪 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd socketio-chat
Install server dependencies

bash
Copy
Edit
cd server
npm install
Install client dependencies

bash
Copy
Edit
cd ../client
npm install
Start the application

Start backend:

bash
Copy
Edit
cd ../server
npm run dev
Start frontend:

bash
Copy
Edit
cd ../client
npm run dev
🌐 Optional Deployment
You may deploy the application using:

Render or Vercel for the frontend

Render or Railway for the backend

Add deployed URLs here if available:

Frontend: https://your-frontend-url.com

Backend: https://your-backend-url.com

📃 Submission Checklist
 Core real-time chat functionality

 At least 3 advanced features

 Project structured using the provided template

 README includes setup guide and features

 Screenshots added

 Code pushed to GitHub Classroom repo

👨‍💻 Author
Mohammed Mbarak Hassan
LinkedIn | GitHub

📚 Resources
Socket.io Documentation

React Documentation

Express Documentation

