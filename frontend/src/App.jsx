import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import context from "./components/MyContext";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Game from "./components/Game";
import AutohideSnackbar from "./components/SnackBar";
import AlertDialogSlide from "./components/Alert";
import { checkAuthStatus } from "./utils/auth";

function App() {
  const [array, setArray] = useState(new Array(25).fill(-1));

  const [cash, setCash] = useState(0); // money in main wallet
  const [money, setMoney] = useState(0);  // bet amount
  const [profit, setProfit] = useState(0); // amount of money earned (excluding bet) (all amount in a single sitting)
  // const [bet, setBet] = useState(0);  // bet amount for frontend use
  const [multiply, setMultiply] = useState(1); // currentmultiplier
  const [highestWin, setHighestWin] = useState(0); // highest win amount
  const [mines, setMines] = useState(1);  // no of mines
  const [play, setPlay] = useState(0); // count of games played
  const [clickedIndices, setClickedIndices] = useState([]);  // array of clicked indices
  const [gameOver, setgameOver] = useState(true);  // true means game is over
  const [isAuthenticated, setIsAuthenticated] = useState(false); // true means user is authenticated

  // top alert msg
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [open, setOpen] = useState(false);

  // alert box
  const [openBox, setOpenBox] = useState(false);
  const [alertBoxMsg, setAlertBoxMsg] = useState("");
  const [alertBoxTitle, setAlertBoxTitle] = useState("");
  const [alertBoxSeverity, setAlertBoxSeverity] = useState("warning");

  // const API = "https://khelo-satta.vercel.app/api/";
  const API = "https://khelo.100xdev.me/api/";
  // const API = "https://localhost:3000/api/";


  // sets the mines array after game over
  const handleSetArray = async (ARRAY) => {
    // const data = await axios.get(API + "sendData", {},);
    // let obj = data.data;
    setArray([...ARRAY]);
  };

  // gets the amount of money in the main wallet and sets it to the state
  async function getAmount() {
    const data = await axios.get(API + "getAmount", {},);
    setCash(data.data.balance);
  }

  // cash out function
  async function cashOutFunc() {
    const data = await axios.get(API + "cashOut", {},);
    setCash(data.data.currentBalance);
    return data.data;
  }

  // add money to main wallet
  async function uploadAmount(AMOUNT) {
    const data = await axios.post(API + "updateUser", {
      money: AMOUNT,
    });
    return data.data;
  }

  // upload game data after game over (maintaining books)
  // async function uploadData(AMOUNT, BET) {
  //   const data = await axios.post(API + "updateBooks", {
  //     amount: AMOUNT,
  //     bet: BET,
  //   },);
  //   return data.data;
  // }

  // play game with no. of mines
  async function requests() {
    const ready = await axios.get(API + "play", {
      params: {
        mines: mines,
        bet: money,
      },
    });
    setClickedIndices([]);
    setgameOver(false);
    return ready.data.msg;
  }

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthStatus(API);
      if (isAuth.isAuthenticated) {
        setIsAuthenticated(true);
      }
    }
    checkAuth();
    getAmount();
  }, []);

  return (
    <context.Provider
      value={{
        array,
        setArray,
        cash,
        setCash,
        money,
        setMoney,
        profit,
        setProfit,
        play,
        setPlay,
        mines,
        setMines,
        gameOver,
        setgameOver,
        multiply,
        setMultiply,
        clickedIndices,
        setClickedIndices,
        isAuthenticated, setIsAuthenticated,
        API,
        handleSetArray,
        uploadAmount,
        cashOutFunc,
        getAmount,

        requests,

        open, setOpen,
        alertMsg, setAlertMsg,
        alertSeverity, setAlertSeverity,

        openBox, setOpenBox,
        alertBoxMsg, setAlertBoxMsg,
        alertBoxTitle, setAlertBoxTitle,
        alertBoxSeverity, setAlertBoxSeverity,

        highestWin, setHighestWin,
      }}
    >
      <BrowserRouter>
        <AutohideSnackbar />
        <AlertDialogSlide />
        <Navbar />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mines" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
