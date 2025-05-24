const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const { user, account } = require("../config/db");
const mongoose = require('mongoose');
const router = Router();

router.get("/minesClick", authentification, async function (req, res) {
  if (!req.session.gameState || req.session.gameState.gameOver === undefined) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid game state" 
    });
  }

  if (!req.session.gameState.gameOver) {
    const Clickedindex = req.query.index;

    if (!req.session.gameState.clickedIndices) {
      req.session.gameState.clickedIndices = [];
    }

    let clicked = req.session.gameState.clickedIndices;
    const array = req.session.gameState.aray;
    const multiply = req.session.gameState.multiplier;

    if (!clicked.includes(Clickedindex)) {
      clicked.push(Number(Clickedindex));
    }

    let data = array[Clickedindex];
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (data == 1) {
        if (multiply.length == clicked.length) {
          // Win with max multiplier scenario
          const win = req.session.gameState.bet * multiply[clicked.length - 1];
          const winAmount = Math.floor(win);

          // Update user balance
          const updatedUser = await user.findOneAndUpdate(
            { _id: req.session.UserId },
            { $inc: { money: winAmount } },
            { new: true, session }
          );

          if (!updatedUser) {
            throw new Error("User not found");
          }

          // Create transaction record
          await account.create([{
            userId: req.session.UserId,
            amount: winAmount,
            bet: req.session.gameState.bet,
            type: 'win',
            timestamp: new Date()
          }], { session });

          await session.commitTransaction();

          let tempArray = req.session.gameState.aray;
          // Reset game state after max win
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
            block: data,
            multiplier: multiply[clicked.length - 1],
            maxWin: true,
            winAmount: winAmount,
            currentBalance: updatedUser.money,
            array: tempArray
          });
        } else {
          // Regular win scenario (no balance update)
          await session.commitTransaction();

          // Save session to ensure updated clickedIndices are stored
          await new Promise((resolve, reject) => {
            req.session.save(err => {
              if (err) reject(err);
              else resolve();
            });
          });

          res.json({
            success: true,
            block: data,
            multiplier: multiply[clicked.length - 1],
            maxWin: false
          });
        }
      } else {
        // Loss scenario
        const lossAmount = req.session.gameState.bet;

        // Update user balance
        const updatedUser = await user.findOneAndUpdate(
          { _id: req.session.UserId },
          { $inc: { money: -lossAmount } },
          { new: true, session }
        );

        if (!updatedUser) {
          throw new Error("User not found");
        }

        // Create transaction record
        await account.create([{
          userId: req.session.UserId,
          amount: -lossAmount,
          bet: lossAmount,
          type: 'loss',
          timestamp: new Date()
        }], { session });

        await session.commitTransaction();
        let tempArray = req.session.gameState.aray;

        // Reset game state after loss
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
          block: data,
          multiplier: 0,
          currentBalance: updatedUser.money,
          array: tempArray
        });
      }
    } catch (err) {
      await session.abortTransaction();
      console.error("Mines click error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to process mines click",
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
      });
    } finally {
      session.endSession();
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Game is already over"
    });
  }
});

module.exports = router;
