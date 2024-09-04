import React, { useRef, useContext, useState, useEffect } from "react";
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
    // dabba, setDabba,
    API,
    handleSetArray,
    uploadAmount,
    uploadData,
    requests,
  } = useContext(context);

  const [isLoading, setisLoading]= useState(false);
  const [dabba, setDabba]= useState(props.block);

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

  const requestQueue = useRef([]);
  const isProcessing = useRef(false);
  let flag = false;

  const handleClick = async (data) => {
    if (gameOver || flag) {
      return;
    }
    flag = true;
    // await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Add the data to the queue
    requestQueue.current.push(data);

    // If not processing, start processing the queue
    if (!isProcessing.current) {
      processQueue();
    }
  };

  const processQueue = async () => {
    isProcessing.current = true;

    while (requestQueue.current.length > 0) {
      const data = requestQueue.current.shift(); // Get the next data item from the queue

      if (!clickedIndices.includes(data)) {
        setisLoading(true);
        
        try {
          
          const box = await clickReq(data);
          if("msg" in box){
            setisLoading(false);
            return;
          }
          setClickedIndices((prev) => [...prev, data]);
          setMultiply(box.multiplier);
          
          // Simulate a delay for UI purposes
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setDabba(box.block);
            setisLoading(false);
            handleSetValue(data, box.block);

          // Handle success or failure of the box result
          if (box.maxWin) {
            let a = (money * box.multiplier).toFixed(4);
            await uploadData(+a, money);
            await uploadAmount(+cash + +a);
            const maxAmount= +a;
            const mltp= box.multiplier;
            alert(`MAX WIN \nWinnings = ${maxAmount}\nMultiplier = ${mltp}`)
            handleSetArray();
            setgameOver(true);
            setCash((prev) => +prev + +a);
            setProfit((prev) => +prev + (+a - money));
            setMultiply(1);
            setMoney(0);
            flag = false;
          }

          if (box.block === 0) {
            setgameOver(true);
            const mny= money;
            await handleSetArray();
            alert(`LOSS \nMoney = ${mny}`)
            uploadData(-money, money);
            uploadAmount(+cash);
            setProfit((prev) => prev - money);
            setMultiply(1);
            setMoney(0);
            flag = false;
          }
        } catch (error) {
          console.error('Error processing click:', error);
        }
      }
    }

    isProcessing.current = false; // Reset processing flag when done
  };

  useEffect(()=>{
    setDabba(-1);
  },[gameOver])

  // async function handleClick (data) {
  //   if(gameOver) {
  //     return;
  //   }
  //   setisLoading(true);

  //   if (!clickedIndices.includes(data)) {
  //     setClickedIndices([...clickedIndices, data]);
  //   } else {
  //     return;
  //   }

  //   const box = await clickReq(data);
  //   setMultiply(box.multiplier);

  //   setTimeout(async()=>{
  //     setisLoading(false)
  //     handleSetValue(data, box.block);
  //   },1000);


  //   if (box.maxWin) {
  //     // console.log(money," ",multiply)
  //     let a = (money * (box.multiplier)).toFixed(4);
  //     await uploadData(+a, money);
  //     let b = (+cash) + (+a);
  //     await uploadAmount(+b);
  //     handleSetArray();
  //     setgameOver(true);

  //     setCash(+cash + (+a));
  //     setProfit(+profit + ((+a)-money));
  //     setMoney(0);
  //   }

  //   if (box.block == 0) {
  //     // db call to deduct money
  //     await uploadData(-money, money);
  //     await uploadAmount(+cash);
  //     setgameOver(true);
  //     handleSetArray();
  //     setProfit(profit - money);
  //     setMoney(0);
  //     setMultiply(1);
  //   }
  // };

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
        {
          dabba == 1 || props.block==1 ? (
            <img className={`w-10 h-10 ${
              clickedIndices.includes(props.index)? 'brightness-110': 'brightness-75'
            }`} src={diamond} alt="diamond" />
          ) : dabba == 0 || props.block==0 ? (
            <img className={`w-10 h-10 ${
              clickedIndices.includes(props.index)? 'brightness-150': 'brightness-50'
            }`} src={bomb} alt="bomb-emoji" />
          ) : ""
        }
      </div>
    </>
  );
}

export default Mine;
