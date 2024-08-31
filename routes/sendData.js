const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const router = Router();

router.get("/sendData",authentification,function(req,res){
    res.send({
      array: req.session.gameState.aray
    })
    // req.session.gameState.aray=[];
    req.session.gameState.clickedIndices=[];
    req.session.gameState.multiplier=[];
  })

module.exports = router;