# KHELO_SATTA

<div align="center">

![KHELO_SATTA Logo](https://khelo-satta.vercel.app/favicon.ico)

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://khelo-satta.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern web application for an engaging gaming experience with betting and rewards.

[Live Demo](https://khelo-satta.vercel.app/) | [Report Bug](https://github.com/Aka5h-14/Khelo-Satta/issues) | [Request Feature](https://github.com/Aka5h-14/Khelo-Satta/issues)

</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎮 About

KHELO_SATTA is a feature-rich gaming platform that combines exciting gameplay mechanics with secure user management and real-time interactions. The application is built with modern web technologies and follows best practices for security and performance.

## ✨ Features

- **User Management**
  - Secure authentication system
  - Session-based user tracking
  - Profile management
  
- **Gaming Experience**
  - Interactive gameplay mechanics
  - Real-time updates
  - Dynamic reward system
  - Fair play algorithms
  
- **Technical Features**
  - Responsive design for all devices
  - RESTful API architecture
  - Persistent data storage
  - Secure session management
  - Real-time state updates

## 🛠 Built With

### Frontend
- **[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling
- **[React](https://reactjs.org/)** - UI Component Library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS Framework

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript Runtime
- **[Express](https://expressjs.com/)** - Web Application Framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL Database
- **[Redis](https://redis.io/)** - In-Memory Data Store for Session Caching
- **[Express Sessions](https://www.npmjs.com/package/express-session)** - Session Middleware

### Deployment
- **[Vercel](https://vercel.com/)** - Cloud Platform for Static Sites and Serverless Functions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aka5h-14/Khelo-Satta.git
   cd Khelo-Satta
   ```

2. **Set up frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up backend**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configure environment variables**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=your_port
   MONGO_URL=your_mongodb_url
   SESSIONS_SEC=your_session_secret
   REDIS_URL=your_redis_url
   ```

5. **Start development servers**

   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

   Backend:
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
Khelo-Satta/
├── frontend/           # React frontend application
├── backend/           # Express backend server
├── vercel.json        # Vercel deployment configuration
└── README.md          # Project documentation
```

## 📚 API Documentation

### Health Check
- `GET /api/health` - Check service health status (MongoDB, Redis, Session Store)

### Authentication Endpoints
- `POST /signup` - Register new user
  - Body: `{ name, phoneNumber, password, email }`
  - Response: Initial balance of 10,000 on successful registration
- `POST /signin` - Authenticate user
  - Body: `{ phoneNumber, password }`
  - Response: Session token and current balance
- `POST /signOut` - End user session
- `GET /checkAuth` - Verify authentication status

### Game Management
- `GET /getAmount` - Retrieve user's current balance
- `GET /play` - Initialize new game session
  - Query params: `mines` (1-24), `bet` (amount)
- `GET /minesClick` - Process game moves
  - Query params: `index` (0-24)
  - Response: Block status, multiplier, win status
- `GET /gameState` - Get current game state
  - Response: Multiplier, clicked indices, bet amount
- `GET /cashOut` - Cash out current game
  - Response: Win amount, updated balance
- `GET /sendData` - Reset game state and return mine positions

### Transaction Management
- `POST /updateBooks` - Record game transactions
  - Body: `{ amount, bet }`
- `POST /updateUser` - Update user balance
  - Body: `{ money }`

### Session Management
The application uses a hybrid session management system:
- Redis for fast session data access
- MongoDB for persistent session storage
- Automatic session synchronization between Redis and MongoDB
- Session TTL: 1 hour
- Secure session cookies with HTTPS only

### Security Features
- Password hashing using bcrypt
- HTTPS-only cookie transmission
- Session-based authentication
- Rate limiting on sensitive endpoints
- Secure headers and CORS configuration

## 🌐 Deployment

The application is deployed on Vercel. The deployment configuration is managed through `vercel.json` in the root directory.

### Deployment Configuration
```json
{
  "version": 2,
  "builds": [...],
  "routes": [...]
}
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Project Link: [https://github.com/Aka5h-14/Khelo-Satta](https://github.com/Aka5h-14/Khelo-Satta)

---

<div align="center">
Made with ❤️ by Akash
</div>