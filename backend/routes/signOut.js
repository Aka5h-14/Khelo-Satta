const { Router } = require("express");

const router = Router();

router.post('/signOut', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ message: 'Failed to log out. Please try again.' });
        } else {
          // Optional: Clear the cookie
          res.clearCookie('connect.sid'); 
          return res.json({ message: 'Logged out successfully.' });
        }
      });
    } else {
      return res.json({ message: 'No active session found.' });
    }
  });

module.exports = router;