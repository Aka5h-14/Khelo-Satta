const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const {account} = require('../db');
const router = Router();

router.post("/updateBooks", authentification ,async function (req,res){
    const data = req.body;
    
    await account.create({
      userId: req.session.UserId,
      amount: data.amount,
      bet: data.bet
      
    });
  
    res.json("books updated");
  })

module.exports = router;