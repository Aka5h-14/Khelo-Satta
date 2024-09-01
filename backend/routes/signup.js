const { Router } = require("express");
const {user} = require('../db');
const {schema} = require('../test');
const router = Router();

router.post("/signup", async function(req,res){
    const data =req.body;
  
    const parsedData = schema.safeParse(data);
    if(!parsedData.success){
      res.json(parsedData.error);
      return;
    }
  
    const users = await user.findOne({
      phoneNumber: data.phoneNumber
    });
    if(users){
      res.json("enter a new phone number")
      return;
    }
    else{
      await user.create({
        name:data.name,
        phoneNumber:data.phoneNumber,
        password: data.password,
        email:data.email,
        money:100
      });
      res.send({
        msg:"user created"
      });
  }
  
  });

module.exports = router;