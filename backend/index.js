const express = require("express");
require('dotenv').config()
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
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


const bcrypt = require('bcryptjs');
const {user} = require('./db');
const {schema2} = require('./test');

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
  origin: 'https://khelo-satta.vercel.app',
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
    httpOnly: true,
    secure: true,
    sameSite: 'none', 
    maxAge: 60000 * 60
  },
  store: store,

}));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/", getAmount);
app.use("/", minesClick);
app.use("/", play);
app.use("/", sendData);
// app.use("/", signin);
app.post("/signin", async function(req,res){
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
    res.status(200).send({
      msg:"signed in",
      balance: users.money
    })
  }
  else{
    res.json("wrong user");
  }

});
app.use("/", signOut);
app.use("/", signup);
app.use("/", updateBooks);
app.use("/", updateUser);

module.exports=app;

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
