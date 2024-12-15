import React, { useState, useCallback, useContext } from "react";
import Mines from "./Mines";
import context from "./MyContext";
import Alert from '@mui/material/Alert';
import OutlinedAlerts from "./AlertGreen";

function Container() {
  const [ errorM, setErrorM ] = useState(false);
  const [ win, setwin ] = useState(false);
  const [ maxAmount, setMaxAmount ] = useState(0);
  const [ mltp, setMltp ] = useState(0);

  const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver,multiply,setMultiply, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated,isEnd, setisEnd, setIsAuthenticated, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);

  function next() {
    if (money == 0) {
      setErrorM(true);
      <Alert severity="warning">Add bet.</Alert>
      // alert("add bet");
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
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!gameOver) {
      setgameOver(true);
      const a = (money * multiply).toFixed(4);
      setMaxAmount(+a);
      setMltp(multiply);
      setwin(true);
      // alert(`WIN \nWinnings = ${maxAmount}\nMultiplier = ${mltp}`)
      
      await uploadAmount(+((cash + (money * multiply)).toFixed(4)));
      await uploadData(+a, money);
      handleSetArray();
      setCash(+cash + +a);
      setProfit(+profit + +(((money * multiply)-money).toFixed(4)));
      setMultiply(1);
      setMoney(0);
    }
  };

  return (
    <>
    {errorM ? <OutlinedAlerts type='warning' msg='Add bet.' /> : null}
    {win ? <OutlinedAlerts type='success' msg={`Winnings = ${maxAmount} , Multiplier = ${mltp}.`} /> : null}

      <div className="bg-slate-700 p-5 pt-8  border-b-2 border-white">
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
