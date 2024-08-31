const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const router = Router();

router.get("/minesClick", authentification ,async function(req,res){
  
    const Clickedindex = req.query.index;
  
    if(!req.session.gameState.clickedIndices){
      req.session.gameState.clickedIndices=[]
    }
  
    if(!req.session.gameState.clickedIndices.includes(Clickedindex)){
    req.session.gameState.clickedIndices.push(Number(Clickedindex));
    }
  
    const array = req.session.gameState.aray;
    let multiply = req.session.gameState.multiplier;
    let clicked = req.session.gameState.clickedIndices;
  
    let data = array[Clickedindex];
  
    if(data==1){
      if(multiply.length == clicked.length){
        res.send({
          block: data,
          multiplier: multiply[clicked.length-1],
          maxWin: true
        })
      }
      else{
        res.send({
          block: data,
          multiplier: multiply[clicked.length-1],
          maxWin: false
        })
      }
      
    }
    else{
      res.send({
        block: data,
        multiplier: 0
      })
    }
    
  });

module.exports = router;