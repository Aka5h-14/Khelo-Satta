const { Router } = require("express");
const bcrypt = require('bcryptjs');
const {user} = require('../db');
const {schema2} = require('../test');
const router = Router();

router.post("/signin", async function(req,res){
    const data = req.body;
  
    const parsedData = schema2.safeParse(data);
    if(!parsedData.success){
      res.json(parsedData.error);
      return;
    }
  
    const users = await user.findOne({
      phoneNumber: data.phoneNumber
    });
    if(!users){
      res.json("wrong phone number")
      return;
    }
    if(bcrypt.compareSync(data.password, users.password)){
      const session = req.session;
      session.authen=true;
      session.UserId=users._id;
      session.save();

    //   res.cookie('session_token', session.id, {
    //     httpOnly: true,          // Prevents JavaScript access
    //     secure: true,            // Ensures the cookie is sent only over HTTPS
    //     sameSite: 'none',        // Allows cross-site requests
    //     maxAge: 60000 * 60, 
    // });

      res.status(200).send({
        msg:"signed in",
        balance: users.money
      })
    }
    else{
      res.json("wrong user");
    }
  
  });

module.exports = router;