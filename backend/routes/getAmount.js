const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const {user} = require('../db');
const router = Router();

router.get("/getAmount",authentification, async function(req,res){

    let id = req.session.UserId;
    const users = await user.findById(id);
      
    if(users){
      res.status(200).send({
        balance: users.money
      })
      
    }
    else{
      res.send("wrong user");
      return;
    }
  
  });

module.exports = router;