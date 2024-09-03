const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const router = Router();

router.get("/play",authentification, function(req,res){
    const mines = req.query.mines;
  
    if(mines<1 || mines>24 || mines==null || mines==undefined){
      res.send("wrong input of mines");
      return;
    }
  
    function getRandomMines(max=25) {
      let arr=[];
      while(arr.length!=mines){
        let number= Math.floor(Math.random() * (max));
  
        !arr.includes(number) ? arr.push(number) : '';
      }
      return arr;
    }
  
    function createArray(){
      let arr=[];
      for(let i=0;i<25;++i){
        arr[i]=1;
      }
  
      getRandomMines().map( (index)=> {
        arr[index]=0;
      } )
      return arr;
    }
  
    function multiplier(){
      let multiply=[];
      if(mines == 0){
        multiply.push(1);
        return multiply;
      }
  
      for(let i=0 ; i<25-mines ;i++){
        let probablity = (25-mines-i)/(25-i);
        let multiplier =0.97*(1/probablity);
        let x = +multiplier.toFixed(4)
        multiply.push(x);
      }
      
      return multiply;
    }
  
    const session = req.session;
      session.gameState = { aray: createArray() , multiplier: multiplier(), gameOver: false}; 
      res.send({
        array: session.gameState.aray,
        multiplier: session.gameState.multiplier,
        gameOver: session.gameState.gameOver,
        msg: "game ready to play"
      });
    
  })

module.exports = router;