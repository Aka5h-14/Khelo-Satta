import "./App.css";
import { useState } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";

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
  const [gamesPlayed, setGamesPlayed] = useState(0); // count of games played for new game start
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
  // const API = "https://khelo.100xdev.me/api/";
  const API = "https://khelo-satta-backend.onrender.com/api/";
  // const API = "https://api.khelo.100xdev.tech/api/";
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
    const data = await axios.put(API + "updateUser", {
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

  // useEffect(() => {
  // const checkAuth = async () => {
  //   const isAuth = await checkAuthStatus(API);
  //   if (isAuth.isAuthenticated) {
  //     setIsAuthenticated(true);
  //   }
  // }
  // checkAuth();
  // }, []);

  // Add this new function
  async function getGameState() {
    try {
      const response = await axios.get(API + "gameState", {});
      const data = response.data;

      if (data.success) {
        const gameState = data.gameState;
        setMultiply(gameState.multiplier);
        setClickedIndices(gameState.clickedIndices);
        let array = new Array(25).fill(-1);
        gameState.clickedIndices.map((index) => {
          array[index] = 1;
        });
        handleSetArray(array);
        setMoney(gameState.bet);
        setgameOver(gameState.gameOver);
        setPlay(1);
      }else{
        return;
      } 
      
    } catch (error) {
      console.error('Error fetching game state:', error);
      setAlertMsg("Error fetching game state");
      setAlertSeverity("error");
      setOpen(true);
    }
  }

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
        highestWin, setHighestWin,
        API,
        handleSetArray,
        uploadAmount,
        cashOutFunc,
        getAmount,
        requests,
        getGameState,
        gamesPlayed, setGamesPlayed,

        open, setOpen,
        alertMsg, setAlertMsg,
        alertSeverity, setAlertSeverity,

        openBox, setOpenBox,
        alertBoxMsg, setAlertBoxMsg,
        alertBoxTitle, setAlertBoxTitle,
        alertBoxSeverity, setAlertBoxSeverity,

      }}
    >
      <BrowserRouter>
        <AutohideSnackbar />
        <AlertDialogSlide />
        <Navbar />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mines"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
