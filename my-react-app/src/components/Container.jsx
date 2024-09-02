import React, { useState, useCallback, useContext } from "react";
import Mines from "./Mines";
import context from "./MyContext";

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

  const end = async () => {
    if (clickedIndices.length == 0) {
      return;
    }

    if (!gameOver) {
      setgameOver(true);
      await uploadAmount(+((cash + (money * multiply)).toFixed(4)));

      await uploadData(+((money * multiply).toFixed(4)), money);
      handleSetArray();
      // setCash(+(cash + +(money * multiply).toFixed(4)).toFixed(4));;
      setCash(+cash + +((money * multiply).toFixed(4)));
      setProfit(+profit + +(((money * multiply)-money).toFixed(4)));
      setMultiply(1);
      setMoney(0);
    }
  };

  return (
    <>
      <div className="bg-slate-700 p-5 pt-8">
        <Mines />
        <div className="flex justify-evenly pt-5 text-xs xg:text-base md:text-lg"> 
          <p className="border-2 border-black bg-slate-600 text-white p-2 ">Multplier = {multiply}</p>
          <p className="border-2 border-black bg-slate-600 text-white p-2 ">
            Current winning = {(money * multiply).toFixed(4)}
          </p>
        </div>
        <div className="flex justify-evenly pt-5 text-xs xg:text-base md:text-lg font-bold">
          <button onClick={next} className="rounded border-2 p-2 px-3 border-slate-900 bg-green-500 hover:bg-green-600 hover:scale-105 text-white">
            Play
          </button>
          { gameOver ? '':
            <button onClick={end} className="rounded border-2 p-2 px-3 border-slate-900 bg-green-500 hover:bg-green-600 hover:scale-105 text-white">
              Cash Out
            </button>
          }
        </div>
      </div>
    </>
  );
}

export default Container;
