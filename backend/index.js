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
  origin: ['http://localhost:5173'],
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
    // httpOnly: true,
    // secure: false, 
    // sameSite: 'none',
    maxAge: 60000 * 60
  },
  store: store,

}));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/", getAmount);
app.use("/", minesClick);
app.use("/", play);
app.use("/", sendData);
app.use("/", signin);
app.use("/", signOut);
app.use("/", signup);
app.use("/", updateBooks);
app.use("/", updateUser);

module.exports=app;

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
