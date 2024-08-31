const express = require("express");
require('dotenv').config()
const cors = require('cors');

// const bcrypt = require('bcryptjs');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// const {user} = require('./db');
// const {account} = require('./db');
// const {schema,schema2} = require('./test');
// const { authentification } = require("./middleware/authen");

const bodyParser = require('body-parser');


const getAmount = require("./routes/getAmount");
const minesClick = require("./routes/minesClick");
const play = require("./routes/play");
const sendData = require("./routes/sendData");
const signin = require("./routes/signin");
const signOut = require("./routes/signOut");
const signup = require("./routes/signup");
const updateBooks = require("./routes/updateBooks");
const updateUser = require("./routes/updateUser");


const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  databaseName: 'mines',
  collection: 'Sessions'
});

store.on('error', function(error) {
  console.log(error);
});


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}
));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false 
}));

app.use(session({
  secret: 'mines', 
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60
  },
  store: store,

}));

app.use("/", getAmount);
app.use("/", minesClick);
app.use("/", play);
app.use("/", sendData);
app.use("/", signin);
app.use("/", signOut);
app.use("/", signup);
app.use("/", updateBooks);
app.use("/", updateUser);


// app.post("/signup", async function(req,res){
//   const data =req.body;

//   const parsedData = schema.safeParse(data);
//   if(!parsedData.success){
//     res.json(parsedData.error);
//     return;
//   }

//   const users = await user.findOne({
//     phoneNumber: data.phoneNumber
//   });
//   if(users){
//     res.json("enter a new phone number")
//     return;
//   }
//   else{
//     await user.create({
//       name:data.name,
//       phoneNumber:data.phoneNumber,
//       password: data.password,
//       email:data.email,
//       money:100
//     });
//     res.send({
//       msg:"user created"
//     });
// }

// });

// app.post("/signin", async function(req,res){
//   const data = req.body;

//   const parsedData = schema2.safeParse(data);
//   if(!parsedData.success){
//     res.json(parsedData.error);
//     return;
//   }

//   const users = await user.findOne({
//     phoneNumber: data.phoneNumber
//   });
//   if(!users){
//     res.json("wrong phone number")
//     return;
//   }
//   if(bcrypt.compareSync(data.password, users.password)){
//     const session = req.session;
//     session.authen=true;
//     session.UserId=users._id;
//     res.status(200).send({
//       msg:"signed in",
//       balance: users.money
//     })
//   }
//   else{
//     res.json("wrong user");
//   }

// });

// app.get("/getAmount", async function(req,res){

//   let id = req.session.UserId;
//   const users = await user.findById(id);
    
//   if(users){
//     res.status(200).send({
//       balance: users.money
//     })
    
//   }
//   else{
//     res.send("wrong user");
//     return;
//   }

// });

// app.post("/updateUser", authentification ,async function (req,res){
//   const data = req.body;
//   let id = req.session.UserId;
//   const found=await user.findByIdAndUpdate(id, { money: data.money });
//   if(found){
//     res.send("money updated");
//   }
//   else{
//     res.send("money nt updated");
//   }
// })

// app.get("/play",authentification, function(req,res){
//   const mines = req.query.mines;

//   if(mines<1 || mines>24 || mines==null || mines==undefined){
//     res.send("wrong input of mines");
//     return;
//   }

//   function getRandomMines(max=25) {
//     let arr=[];
//     while(arr.length!=mines){
//       let number= Math.floor(Math.random() * (max));

//       !arr.includes(number) ? arr.push(number) : '';
//     }
//     return arr;
//   }

//   function createArray(){
//     let arr=[];
//     for(let i=0;i<25;++i){
//       arr[i]=1;
//     }

//     getRandomMines().map( (index)=> {
//       arr[index]=0;
//     } )
//     return arr;
//   }

//   function multiplier(){
//     let multiply=[];
//     if(mines == 0){
//       multiply.push(1);
//       return multiply;
//     }

//     for(let i=0 ; i<25-mines ;i++){
//       let probablity = (25-mines-i)/(25-i);
//       let multiplier =0.97*(1/probablity);
//       let x = +multiplier.toFixed(4)
//       multiply.push(x);
//     }
    
//     return multiply;
//   }

//   const session = req.session;
//     session.gameState = { aray: createArray() , multiplier: multiplier()}; 
//     res.send({
//       array: session.gameState.aray,
//       multiplier: session.gameState.multiplier,
//       msg: "game ready to play"
//     });
  
// })

// app.get("/minesClick", authentification ,async function(req,res){
  
//   const Clickedindex = req.query.index;

//   if(!req.session.gameState.clickedIndices){
//     req.session.gameState.clickedIndices=[]
//   }

//   if(!req.session.gameState.clickedIndices.includes(Clickedindex)){
//   req.session.gameState.clickedIndices.push(Number(Clickedindex));
//   }

//   const array = req.session.gameState.aray;
//   let multiply = req.session.gameState.multiplier;
//   let clicked = req.session.gameState.clickedIndices;

//   let data = array[Clickedindex];

//   if(data==1){
//     if(multiply.length == clicked.length){
//       res.send({
//         block: data,
//         multiplier: multiply[clicked.length-1],
//         maxWin: true
//       })
//     }
//     else{
//       res.send({
//         block: data,
//         multiplier: multiply[clicked.length-1],
//         maxWin: false
//       })
//     }
    
//   }
//   else{
//     res.send({
//       block: data,
//       multiplier: 0
//     })
//   }
  
// });

// app.get("/sendData",authentification,function(req,res){
//   res.send({
//     array: req.session.gameState.aray
//   })
//   // req.session.gameState.aray=[];
//   req.session.gameState.clickedIndices=[];
//   req.session.gameState.multiplier=[];
// })

// app.post("/updateBooks", authentification ,async function (req,res){
//   const data = req.body;
  
//   await account.create({
//     userId: req.session.UserId,
//     amount: data.amount,
//     bet: data.bet
    
//   });

//   res.json("books updated");
// })

// app.post('/signOut', (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to log out. Please try again.' });
//       } else {
//         // Optional: Clear the cookie
//         res.clearCookie('connect.sid'); 
//         return res.json({ message: 'Logged out successfully.' });
//       }
//     });
//   } else {
//     return res.json({ message: 'No active session found.' });
//   }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});