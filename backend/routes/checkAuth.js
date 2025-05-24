const { Router } = require("express");
const { user } = require('../config/db');

const router = Router();

router.get("/checkAuth", async (req, res) => {
    try {
        // Check if session exists and user is authenticated
        if (req.session && req.session.authen && req.session.UserId) {
            // Get user's current balance
            const currentUser = await user.findById(req.session.UserId);
            if (currentUser) {
                return res.json({
                    isAuthenticated: true
                });
            }
        }
        
        return res.json({
            isAuthenticated: false
        });
    } catch (error) {
        console.error('Auth check error:', error);
        return res.status(500).json({
            isAuthenticated: false,
            error: 'Internal server error'
        });
    }
});

module.exports = router; 