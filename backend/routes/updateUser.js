const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const {user} = require('../config/db');
const router = Router();

router.put("/updateUser", authentification ,async function (req,res){
    const data = req.body;
    let id = req.session.UserId;
    try {
      const found = await user.findByIdAndUpdate(
        id, 
        { $inc: { money: data.money } },
        { new: true }
      );
      
      if(found){
        res.status(200).json({ success: true, balance: found.money });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error('Error updating money:', error);
      res.status(500).json({ success: false, message: "Failed to update balance" });
    }
})

module.exports = router;