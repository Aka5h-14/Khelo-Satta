const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const {user} = require('../db');
const router = Router();

router.post("/updateUser", authentification ,async function (req,res){
    const data = req.body;
    let id = req.session.UserId;
    const found=await user.findByIdAndUpdate(id, { money: data.money });
    if(found){
      res.send("money updated");
    }
    else{
      res.send("money nt updated");
    }
  })

module.exports = router;