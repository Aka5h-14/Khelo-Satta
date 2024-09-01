import context from "./components/MyContext";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";

function App() {
  const [array, setArray] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,
  ]);
  const [cash, setCash] = useState(0);
  const [money, setMoney] = useState(0);
  const [profit, setProfit] = useState(0);
  const [play, setPlay] = useState(0);
  const [mines, setMines] = useState(1);
  const [gameOver, setgameOver] = useState(false);
  const [multiply, setMultiply] = useState(1);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [bet, setBet] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API = "khelo-satta-back.vercel.app/";
  // const API = "http://localhost:3000/";

  const handleSetArray = async () => {
    let obj = await sendData();
    setArray([...obj.array]);
  };

  async function sendData() {
    const data = await axios.get(API+"sendData", {}, {
      withCredentials: true         // Ensures cookies are sent with the request
    });
    return data.data;
  }

  async function getAmount() {
    const data = await axios.get(API+"getAmount", {}, {
      withCredentials: true         // Ensures cookies are sent with the request
    });
    setCash(data.data.balance);
  }

  async function uploadAmount(AMOUNT) {
    const data = await axios.post(API+"updateUser", {
      money: AMOUNT,
    }, {
      withCredentials: true         // Ensures cookies are sent with the request
    });
    return data.data;
  }

  async function uploadData(AMOUNT, BET) {
    const data = await axios.post(API+"updateBooks", {
      amount: AMOUNT,
      bet: BET,
    }, {
      withCredentials: true         // Ensures cookies are sent with the request
    });
    return data.data;
  }

  async function requests() {
    const ready = await axios.get(API+"play", {
      params: {
        mines: mines,
      },
    }, {
      withCredentials: true         // Ensures cookies are sent with the request
    });
    setClickedIndices([]);
    setgameOver(false);
    return ready.data;
  }

  useEffect(() => {
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
        bet,
        setBet,
        isAuthenticated, setIsAuthenticated,
        API,
        handleSetArray,
        uploadAmount,
        uploadData,

        requests,
      }}
    >
      <BrowserRouter>
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
