const express = require("express");
require('dotenv').config()
const cors = require('cors');
// const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');


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
  origin: ['https://khelo-satta.vercel.app','http://localhost:5173'],
  credentials: true
}
));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false 
}));

app.enable('trust proxy')

app.use(session({
  secret: 'mines', 
  saveUninitialized: false,
  resave: false,
  proxy: true,
  cookie: {
    // httpOnly: true,
    secure: true,
    sameSite: 'none',
    // domain:'khelo-satta.vercel.app',
    maxAge: 60000 * 60
  },
  store: store,

}));

const getAmount = require("./routes/getAmount");
const minesClick = require("./routes/minesClick");
const play = require("./routes/play");
const sendData = require("./routes/sendData");
const signin = require("./routes/signin");
const signOut = require("./routes/signOut");
const signup = require("./routes/signup");
const updateBooks = require("./routes/updateBooks");
const updateUser = require("./routes/updateUser");

app.get("/api/", (req, res) => res.send("Express on Vercel"));

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
