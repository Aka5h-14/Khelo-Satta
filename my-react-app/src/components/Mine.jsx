import React, { useCallback, useContext, useState } from "react";
import context from "./MyContext";
import axios from "axios";
axios.defaults.withCredentials = true;
import diamond from "../assets/diamond.png";
import bomb from "../assets/bomb.png";

function Mine(props) {
  const {
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
    API,
    handleSetArray,
    uploadAmount,
    uploadData,
    requests,
  } = useContext(context);

  const [isLoading, setisLoading]= useState(false);

  const handleSetValue = (index, newValue) => {
    const newArray = [...array];
    newArray[index] = newValue;
    {
      setArray(newArray);
    }
  };

  async function clickReq(data) {
    const block = await axios.get(API+"minesClick", {
      params: {
        index: data,
      },
    });

    return block.data;
  }

  async function handleClick (data) {
    if(gameOver) {
      return;
    }
    setisLoading(true);

    if (!clickedIndices.includes(data)) {
      setClickedIndices([...clickedIndices, data]);
    } else {
      return;
    }

    const box = await clickReq(data);
    setMultiply(box.multiplier);

    setTimeout(async()=>{
      setisLoading(false)
      handleSetValue(data, box.block);
    },1000);


    if (box.maxWin) {
      // console.log(money," ",multiply)
      let a = (money * (box.multiplier)).toFixed(4);
      await uploadData(+a, money);
      let b = (+cash) + (+a);
      await uploadAmount(+b);
      handleSetArray();
      setgameOver(true);

      setCash(+cash + (+a));
      setProfit(+profit + ((+a)-money));
      setMoney(0);
    }

    if (box.block == 0) {
      // db call to deduct money
      await uploadData(-money, money);
      await uploadAmount(+cash);
      setgameOver(true);
      handleSetArray();
      setProfit(profit - money);
      setMoney(0);
      setMultiply(1);
    }
  };

  return (
    <>
      <div
        className={`w-12 h-12 xg:w-14 xg:h-14 text-center rounded flex items-center justify-center bg-slate-400 hover:scale-105 ${isLoading? 'animate-grow-shrink':''}
          //  
          //   clickedIndices.includes(props.index)
          //     ? props.block == 1
          //       ? "bg-green-300"
          //       : "bg-red-400"
          //     : gameOver
          //     ? props.block == 1
          //       ? "bg-green-300"
          //       : "bg-red-400"
          //     : "bg-slate-400" // Apply slate only if no other color condition is met
          // }
        `}
        onClick={() => handleClick(props.index)}
      >
        {clickedIndices.includes(props.index) || gameOver ? (
          props.block == 1 ? (
            <img className={`w-10 h-10 ${
              clickedIndices.includes(props.index)? 'brightness-110': 'brightness-75'
            }`} src={diamond} alt="diamond" />
          ) : props.block == 0 ? (
            <img className={`w-10 h-10 ${
              clickedIndices.includes(props.index)? 'brightness-150': 'brightness-50'
            }`} src={bomb} alt="bomb-emoji" />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Mine;
