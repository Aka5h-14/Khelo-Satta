const Redis = require('redis');

// Initialize Redis client
const redisClient = Redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.connect().catch(console.error);

// Redis error handling
redisClient.on('error', (err) => {
    console.error('Redis Cache Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis Cache successfully');
});

// Session cache methods
const sessionCache = {
    async get(sessionId) {
        try {
            const cachedSession = await redisClient.get(`sess:${sessionId}`);
            return cachedSession ? JSON.parse(cachedSession) : null;
        } catch (error) {
            console.error('Redis Cache Get Error:', error);
            return null;
        }
    },

    async set(sessionId, session, ttl = 3600) { // Default TTL: 1 hour
        try {
            await redisClient.setEx(`sess:${sessionId}`, ttl, JSON.stringify(session));
        } catch (error) {
            console.error('Redis Cache Set Error:', error);
        }
    },

    async delete(sessionId) {
        try {
            await redisClient.del(`sess:${sessionId}`);
        } catch (error) {
            console.error('Redis Cache Delete Error:', error);
        }
    }
};

module.exports = {
    redisClient,
    sessionCache
}; 