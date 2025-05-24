const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const { user, account } = require('../config/db');
const mongoose = require('mongoose');
const router = Router();

router.get("/cashOut", authentification, async function(req, res) {
    const gameState = req.session.gameState;

    if (!gameState || !gameState.clickedIndices || gameState.clickedIndices.length == 0 || gameState.clickedIndices.length > 24) {
        return res.status(400).json({
            success: false,
            message: "Invalid game state"
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const win = gameState.bet * gameState.multiplier[gameState.clickedIndices.length - 1];
        const winAmount = Math.floor(win);

        // Update user's balance within transaction
        const updatedUser = await user.findOneAndUpdate(
            { _id: req.session.UserId },
            { $inc: { money: winAmount } },
            { new: true, session }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        // Record the transaction within the same session
        await account.create([{
            userId: req.session.UserId,
            amount: winAmount,
            bet: gameState.bet,
            type: 'cashout',
            timestamp: new Date()
        }], { session });

        // Commit the transaction
        await session.commitTransaction();

        // Store the array for response before clearing game state
        const gameArray = gameState.aray;

        // Reset game state
        req.session.gameState = {
            aray: [],
            multiplier: [],
            clickedIndices: [],
            gameOver: true
        };

        // Save session to ensure game state is stored in Redis
        await new Promise((resolve, reject) => {
            req.session.save(err => {
                if (err) reject(err);
                else resolve();
            });
        });

        res.json({
            success: true,
            winAmount: winAmount,
            currentBalance: updatedUser.money,
            array: gameArray,
            message: "Successfully cashed out"
        });

    } catch (err) {
        // Abort transaction on error
        await session.abortTransaction();
        console.error("Cash out error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to process cash out",
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;