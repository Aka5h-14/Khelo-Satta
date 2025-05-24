const { Router } = require("express");
const { authentification } = require("../middleware/authen");
const router = Router();

router.get("/play",authentification, function(req,res){
    const mines = req.query.mines;
    const bet = req.query.bet;
  
    if(mines<1 || mines>24 || mines==null || mines==undefined){
      res.send({msg :"Wrong input of mines"});
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
      let arr = new Array(25).fill(1);
  
      getRandomMines().map( (index)=> {
        arr[index]=0;
      } )
      return arr;
    }
  
    function multiplier(){
      let multiply=[];
  
      for(let i=0 ; i<25-mines ;i++){
        let probablity = (25-mines-i)/(25-i);
        let multiplier =0.97*(1/probablity);
        let x = +multiplier.toFixed(4)
        multiply.push(x);
      }
      
      return multiply;
    }
  
    const session = req.session;
    session.gameState = { 
      aray: createArray(), 
      multiplier: multiplier(), 
      clickedIndices: [], 
      bet: bet, 
      gameOver: false
    }; 
    
    // Explicitly save session to ensure game state is stored in Redis
    session.save(err => {
      if (err) {
        console.error('Error saving session:', err);
        return res.status(500).json({ msg: "Error initializing game" });
      }
      res.send({ msg: "Game ready to play" });
    });
})

module.exports = router;