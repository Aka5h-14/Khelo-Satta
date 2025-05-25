const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const router = Router();

router.get("/sendData",authentification,function(req,res){
  if (!req.session.gameState || !req.session.gameState.aray) {
    return res.status(400).json({
      success: false,
      message: "No game state found"
    });
  }

  req.session.gameState.clickedIndices=[];
  req.session.gameState.multiplier=[];
    
  res.status(200).json({
    success: true,
    array: req.session.gameState.aray
  });
})

module.exports = router;