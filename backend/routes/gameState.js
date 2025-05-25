const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const router = Router();

router.get("/gameState", authentification, async function (req, res) {
  try {
    if (!req.session.gameState || req.session.gameState.gameOver === true) {
      return res.status(200).json({
        success: false,
      });
    }
    const clickedIndices = req.session.gameState.clickedIndices;
    const multiplier = req.session.gameState.multiplier[clickedIndices.length - 1];

    // Return the current game state
    res.status(200).json({
      success: true,
      gameState: {
        multiplier: multiplier,
        clickedIndices: clickedIndices,
        bet: req.session.gameState.bet,
        gameOver: req.session.gameState.gameOver
      }
    });

  } catch (error) {
    console.error("Error fetching game state:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch game state",
    });
  }
});

module.exports = router; 