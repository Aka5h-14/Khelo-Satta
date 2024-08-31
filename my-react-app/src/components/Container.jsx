import React, { useState, useCallback, useContext } from "react";
import Mines from "./Mines";
import context from "./MyContext";
import axios from "axios";

function Container() {
  const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver,multiply,setMultiply, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated, setIsAuthenticated, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);

  function next() {
    if (money == 0) {
      alert("add bet");
    }
    if (gameOver) {
      setArray([
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1,
      ]);

      setMultiply(1);
      setClickedIndices([]);
    }
    setPlay(play + 1);
  }

  const handleMines = useCallback((e) => setMines(e.target.value));

  const end = async () => {
    if (clickedIndices.length == 0) {
      return;
    }

    if (!gameOver) {
      setgameOver(true);
      await uploadAmount((+cash + +(money * multiply)).toFixed(4));

      await uploadData(money * multiply, money);
      handleSetArray();
      // setCash(+(cash + +(money * multiply).toFixed(4)).toFixed(4));;
      setCash((+cash + +(money * multiply)).toFixed(4));
      setProfit(profit + money * multiply);
      setMultiply(1);
      setMoney(0);
    }
  };

  return (
    <>
      <div className="bg-slate-700 p-5">
        <Mines className=""></Mines>
        <span>No of mines</span>
        <input
          type="integer"
          value={mines}
          onChange={handleMines}
          className="border-2"
        />
        <p className="border-2 border-black">multplier = {multiply}</p>
        <p className="border-2 border-black">
          Current winning = {(money * multiply).toFixed(4)}
        </p>
        <button onClick={next} className="border-2 border-black">
          Play
        </button>
        <button onClick={end} className="border-2 border-black">
          Cash Out
        </button>
      </div>
    </>
  );
}

export default Container;
