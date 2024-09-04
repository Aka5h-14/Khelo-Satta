const { Router } = require("express");
const bcrypt = require('bcryptjs');
const {user} = require('../db');
const {schema2} = require('../test');
const router = Router();


router.post("/signin", async function(req,res){
    const data = req.body;
  
    const parsedData = schema2.safeParse(data);
    if(!parsedData.success){
      res.send({msg:parsedData.error});
      return;
    }
  
    const users = await user.findOne({
      phoneNumber: data.phoneNumber
    });
    if(!users){
      res.send({msg:"wrong phone number"})
      return;
    }
    if(bcrypt.compareSync(data.password, users.password)){
      const session = req.session;
      session.authen=true;
      session.UserId=users._id;
      session.save();

      res.status(200).send({
        msg:"signed in",
        balance: users.money
      })
    }
    else{
      res.send({msg:"wrong user input"});
    }
  
  });

module.exports = router;