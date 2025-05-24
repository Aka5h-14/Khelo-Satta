const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const router = Router();

router.get("/sendData",authentification,function(req,res){
  req.session.gameState.clickedIndices=[];
  req.session.gameState.multiplier=[];
    
  res.send({
      array: req.session.gameState.aray
    })
  })

module.exports = router;