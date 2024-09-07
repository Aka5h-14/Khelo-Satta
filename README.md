# KHELO_SATTA

KHELO_SATTA is a web application that offers a gaming experience with a focus on betting and rewards. Built with modern web technologies, the app provides a seamless and engaging user experience. The app is hosted on Vercel, providing reliable and scalable deployment.

### Live URL: [KHELO_SATTA](https://khelo-satta.vercel.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend API](#backend-api)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- User authentication using sessions.
- Interactive user interface with responsive design.
- Secure REST API for handling game logic and user actions.
- MongoDB for data storage and retrieval.
- Custom gameplay mechanics with various outcomes and rewards.
- Session management for user login and state persistence.
- Real-time updates and seamless user experience.

## Technologies Used

- **Frontend**: 
  - Vite
  - React
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Express Sessions
  - REST API
- **Deployment**:
  - Vercel for both frontend and backend services.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js and npm installed on your local machine.
- MongoDB instance running locally or on a cloud service.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aka5h-14/Khelo-Satta.git
   cd Khelo-Satta

2. **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install

3. **Install backend dependencies:**

    ```bash
    cd ../backend
    npm install

4. **Set up environment variables:**

 Create a .env file in the backend directory and add the necessary environment variables
  - PORT (for express server)
  - MONGO_URL (mongo db url)
  - SESSIONS_SEC (secret of express sessions)

6. **Run the development server:**

- Frontend:
    
  ```bash
  cd frontend
  npm run dev

- Backend:

  ```bash
  cd backend
  npm start

6. **Access the application:**

    Open your browser and navigate to http://localhost:5173 to access the frontend.

## Backend API

The backend of KHELO_SATTA provides a REST API for interacting with the app's features.

### Endpoints

- POST /signup - Register a new user.
- POST /signin - Sign in an existing user.
- POST /signOut - Sign out an existing user.
- GET /getAmount - Fetch user balance.
- GET /play - Set up the game environment with no of mines
- GET /minesClick - Sends the data (block , multiplier & maxWin)
- GET /sendData - Sends the data after the game is over
- GET /updateBooks - Creates the entry of game in DB
- GET /updateUser - Updates the user money in DB

## Session Management
The app uses Express Sessions to manage user sessions and maintain authenticated states.

## Deployment
The application is deployed on Vercel, and the configuration is handled via a vercel.json file in the root directory. Ensure your backend API endpoints and static files are correctly set up in the Vercel configuration.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

- Fork the Project.
- Create your Feature Branch (git checkout -b feature/NewFeature).
- Commit your Changes (git commit -m 'Add some feature').
- Push to the Branch (git push origin feature/NewFeature).
- Open a Pull Request.




