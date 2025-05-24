const MongoDBStore = require('connect-mongodb-session');
const { sessionCache } = require('../config/redis-cache');

module.exports = function(session) {
    const MongoStore = MongoDBStore(session);

    class CachedSessionStore extends MongoStore {
        constructor(options) {
            super(options);
        }

        async get(sid, callback) {
            try {
                // Try to get session from Redis cache first
                const cachedSession = await sessionCache.get(sid);
                if (cachedSession) {
                    return callback(null, cachedSession);
                }

                // If not in cache, get from MongoDB
                super.get(sid, async (err, session) => {
                    if (err) return callback(err);
                    if (session) {
                        // Store in Redis cache for future requests
                        await sessionCache.set(sid, session);
                    }
                    callback(null, session);
                });
            } catch (error) {
                callback(error);
            }
        }

        async set(sid, session, callback) {
            try {
                // Store in MongoDB
                super.set(sid, session, async (err) => {
                    if (err) return callback(err);
                    
                    // Also store in Redis cache
                    await sessionCache.set(sid, session);
                    callback(null);
                });
            } catch (error) {
                callback(error);
            }
        }

        async destroy(sid, callback) {
            try {
                // Remove from MongoDB
                super.destroy(sid, async (err) => {
                    if (err) return callback(err);
                    
                    // Also remove from Redis cache
                    await sessionCache.delete(sid);
                    callback(null);
                });
            } catch (error) {
                callback(error);
            }
        }
    }

    return CachedSessionStore;
}; 