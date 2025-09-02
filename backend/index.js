const express = require("express");
require('dotenv').config()
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const https = require('https');
const fs = require('fs');
const path = require('path');
const { redisClient } = require('./config/redis-cache');
const { globalLimiter, authLimiter, gameLimiter } = require('./middleware/rateLimiter');

const CachedSessionStore = require('./store/cached-session-store')(session);

const getAmount = require("./routes/getAmount");
const minesClick = require("./routes/minesClick");
const play = require("./routes/play");
// const sendData = require("./routes/sendData"); // disabled
const gameState = require("./routes/gameState");
const signin = require("./routes/signin");
const signOut = require("./routes/signOut");
const signup = require("./routes/signup");
// const updateBooks = require("./routes/updateBooks"); // disabled
const updateUser = require("./routes/updateUser");
const checkAuth = require("./routes/checkAuth");
const cashOut = require("./routes/cashOut");

const app = express();

// Enable trust proxy for production (needed for secure cookies behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Global rate limiter to all routes
app.use(globalLimiter);

// Specific rate limiters to routes
app.use('/api/signin', authLimiter);
app.use('/api/signup', authLimiter);
app.use('/api/play', gameLimiter);
app.use('/api/minesClick', gameLimiter);
app.use('/api/cashOut', gameLimiter);

// MongoDB connection options
const mongoOptions = {
  serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

// Track connection state
let isConnected = false;   // mongoDb
let sessionStoreReady = false;    // session store

// Connection retry logic with better error handling
async function connectWithRetry() {
  const maxRetries = 5;
  const retryDelay = 5000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL environment variable is not set');
      }

      console.log(`MongoDB connection attempt ${i + 1} of ${maxRetries}`);
      await mongoose.connect(process.env.MONGO_URL, mongoOptions);
      console.log("Connected to MongoDB successfully.");
      isConnected = true;
      break;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error.message);
      if (error.message.includes('MONGO_URL environment variable is not set')) {
        console.error('Please set the MONGO_URL environment variable');
        process.exit(1);
      }
      if (i < maxRetries - 1) {
        console.log(`Retrying in ${retryDelay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        console.error("Failed to connect to MongoDB after all retries");
        process.exit(1);
      }
    }
  }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
  isConnected = false;
  // Try to reconnect
  if (!process.env.MONGO_URL) {
    console.error('MONGO_URL environment variable is not set');
    return;
  }
  setTimeout(connectWithRetry, 5000);
});

// Initialize connection
connectWithRetry();

// Initialize store with retry mechanism and better error handling
const store = new CachedSessionStore({
  uri: process.env.MONGO_URL,
  databaseName: 'mines',
  collection: 'Sessions',
  connectionOptions: mongoOptions
});

store.on('connected', () => {
  console.log('Session store connected');
  sessionStoreReady = true;
});

store.on('error', function(error) {
  console.log('Session store error:', error);
  sessionStoreReady = false;
});

// Connection readiness middleware
const checkConnections = (req, res, next) => {
  if (!isConnected || !sessionStoreReady || !redisClient.isReady) {
    return res.status(503).json({
      error: 'Service temporarily unavailable',
      message: 'The server is still initializing. Please try again in a few seconds.'
    });
  }
  next();
};

app.use('/api', checkConnections);

// CORS configuration based on environment
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://khelo-satta-8hkv.vercel.app', 
      'https://khelo.100xdev.me'
    ]
  : ['https://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session configuration
app.use(session({
  secret: process.env.SESSIONS_SEC,
  saveUninitialized: false,
  resave: false,
  rolling: true,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60000 * 60,
    domain: process.env.NODE_ENV === 'production' 
      ? 'khelo.100xdev.me'
      : undefined
  },
  store: store,
}));

// Apply connection check middleware to all routes except health check
app.get('/api/health', (req, res) => {
  res.json({
    mongodb: isConnected,
    sessionStore: sessionStoreReady,
    redis: redisClient.isReady
  });
});

app.get("/api/", (req, res) => res.send("Khelo-Satta Express Backend"));

app.use("/api/", getAmount);
app.use("/api/", minesClick);
app.use("/api/", play);
// app.use("/api/", sendData); // disabled
app.use("/api/", gameState);
app.use("/api/", signin);
app.use("/api/", signOut);
app.use("/api/", signup);
// app.use("/api/", updateBooks);  // disabled
app.use("/api/", updateUser);
app.use("/api/", checkAuth);
app.use("/api/", cashOut);

module.exports=app;

// Server startup based on environment
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  // Production: Use regular HTTP (assuming behind reverse proxy like Nginx)
  app.listen(PORT, () => {
    console.log(`Production server running on port ${PORT}`);
  });
} else {
  // Development: Use HTTPS with self-signed certificates
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Development HTTPS Server running on https://localhost:${PORT}`);
  });
}
