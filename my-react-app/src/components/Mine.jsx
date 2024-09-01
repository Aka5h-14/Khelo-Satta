import React, { useCallback, useContext } from "react";
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
    handleSetArray,
    uploadAmount,
    uploadData,
    requests,
  } = useContext(context);

  const handleSetValue = (index, newValue) => {
    const newArray = [...array];
    newArray[index] = newValue;
    {
      setArray(newArray);
    }
  };

  async function clickReq(data) {
    const block = await axios.get("https://khello-sata.vercel.app/minesClick", {
      params: {
        index: data,
      },
    }, {
      withCredentials: true         // Ensures cookies are sent with the request
    });

    return block.data;
  }

  const handleClick = useCallback(async (data) => {
    if (gameOver) {
      return;
    }

    if (!clickedIndices.includes(data)) {
      setClickedIndices([...clickedIndices, data]);
    } else {
      return;
    }

    const box = await clickReq(data);

    handleSetValue(data, box.block);

    if (box.maxWin) {
      await uploadData(money * multiply, money);
      // let money=+cash + +(money*multiply);
      // console.log(money)
      await uploadAmount(+cash + +(money * multiply));
      handleSetArray();
      setgameOver(true);
      setCash(+cash + +(money * multiply));
      setProfit(+profit + +(money * multiply));
      setMoney(0);
    }

    if (box.block == 0) {
      // db call to deduct money
      await uploadData(-money, money);
      await uploadAmount(+cash);
      handleSetArray();
      setgameOver(true);
      setProfit(+profit - +money);
      setMoney(0);
    } else {
      setMultiply(box.multiplier);
    }
  });

  return (
    <>
      <div
        className={`w-12 h-12 xg:w-14 xg:h-14 text-center rounded flex items-center justify-center bg-slate-400 
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
