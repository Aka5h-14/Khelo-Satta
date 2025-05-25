const rateLimit = require('express-rate-limit');

// General limiter for all routes
const globalLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 2 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Strict limiter for authentication routes
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 requests per hour
    message: 'Too many login attempts from this IP, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
});

// Game action limiter
const gameLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // Limit each IP to 40 requests per minute
    message: 'Too many game actions, please slow down',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    globalLimiter,
    authLimiter,
    gameLimiter
}; 