const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const {account} = require('../db');
const router = Router();

router.post("/updateBooks", authentification ,async function (req,res){
    const data = req.body;
    
    try {
      await account.create({
        userId: req.session.UserId,
        amount: data.amount,
        bet: data.bet
      });
    
      res.status(201).json({
        success: true,
        message: "books updated"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update books"
      });
    }
  })

module.exports = router;