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

module.exports = {
    checkConnections
}