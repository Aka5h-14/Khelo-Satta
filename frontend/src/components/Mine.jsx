import React, { useRef, useContext, useState, useEffect } from "react";
import context from "./MyContext";
import axios from "axios";
import { formatRupees } from "../utils/money";
axios.defaults.withCredentials = true;
import diamond from "../assets/diamond.png";
import bomb from "../assets/bomb.png";

function Mine(props) {

  const {
    setArray,
    money,
    setMoney,
    setProfit,
    gameOver,
    setgameOver,
    setMultiply,
    clickedIndices,
    setClickedIndices,
    API, getAmount,
    handleSetArray, setOpen,
    setAlertMsg,
    setAlertSeverity,setOpenBox,
    setAlertBoxMsg, setAlertBoxTitle,
    setAlertBoxSeverity, setHighestWin
  } = useContext(context);

  const [isLoading, setisLoading]= useState(false);
  const [dabba, setDabba]= useState(props.block);

  const requestQueue = useRef([]);
  const isProcessing = useRef(false);
  const processingTimeout = useRef(null);

  const handleSetValue = (index, newValue) => {
    setArray(prev => {
      const newArray = [...prev];
      newArray[index] = newValue;
      return newArray;
    });
  };

  // mines click request to backend
  async function clickReq(data) {
    const response = await axios.get(API + "minesClick", {
      params: { index: data },
      withCredentials: true
    });
    return response.data;
  }

  const processQueue = async () => {
    if (!isProcessing.current && requestQueue.current.length > 0) {
      isProcessing.current = true;
      const data = requestQueue.current.shift();

      try {
        if (gameOver) {
          requestQueue.current = [];
          isProcessing.current = false;
          return;
        }

        if (!clickedIndices.includes(data)) {
          setisLoading(true);
          
          const box = await clickReq(data);
          
          if ("msg" in box) {
            setisLoading(false);
            isProcessing.current = false;
            return;
          }

          setClickedIndices(prev => [...prev, data]);
          setMultiply((box.multiplier).toFixed(4));
          setDabba(box.block);
          handleSetValue(data, box.block);

          // Handle max win
          if (box.maxWin) {
            // const winAmountPaisa = Math.floor(money * box.multiplier);
            
            // await Promise.all([
            //   uploadData(winAmountPaisa, money),
            //   uploadAmount(cash + winAmountPaisa)
            // ]);
            setHighestWin(prev => Math.max(prev, box.winAmount));
            
            // Update alert box for max win
            setAlertBoxTitle('MAX WIN!');
            setAlertBoxMsg(`
              <div class="space-y-3">
                <p class="text-lg font-medium text-green-400">Congratulations!</p>
                <div class="space-y-2">
                  <p>Winnings: <span class="text-yellow-400">${formatRupees(box.winAmount)}</span></p>
                  <p>Multiplier: <span class="text-indigo-400">${box.multiplier}x</span></p>
                </div>
              </div>
            `);
            setAlertBoxSeverity('success');
            setOpenBox(true);
            
            handleSetArray(box.array);
            setgameOver(true);
            getAmount();
            // setCash(prev => prev + winAmountPaisa);
            setProfit(prev => prev + (box.winAmount - money));
            // setProfit(prev => prev + (winAmountPaisa - money));
            setMultiply(1);
            setMoney(0);
            
            requestQueue.current = [];
          }

          // Handle loss
          if (box.block === 0) {
            setgameOver(true);
            
            handleSetArray(box.array);
            
            // Update alert box for loss
            setAlertBoxTitle('GAME OVER');
            setAlertBoxMsg(`
              <div class="space-y-3">
                <p class="text-lg font-medium text-red-400">You Hit a Mine!</p>
                <div class="space-y-2">
                  <p>Lost Bet: <span class="text-red-400">${formatRupees(money)}</span></p>
                  <p>Try again with a new bet!</p>
                </div>
              </div>
            `);
            setAlertBoxSeverity('error');
            setOpenBox(true);
            
            // await Promise.all([
            //   uploadData(-money, money),
            //   uploadAmount(cash)
            // ]);
            
            setProfit(prev => prev - money)
            // setProfit(prev => prev - money);
            setMultiply(1);
            setMoney(0);
            
            requestQueue.current = [];
          }
        }
      } catch (error) {
        console.error('Error processing click:', error);
        // Show error in snackbar
        setAlertMsg("Error processing move. Please try again.");
        setAlertSeverity('error');
        setOpen(true);
      } finally {
        setisLoading(false);
        isProcessing.current = false;
        
        processingTimeout.current = setTimeout(() => {
          if (requestQueue.current.length > 0) {
            processQueue();
          }
        }, 300);
      }
    }
  };

  const handleClick = (data) => {
    if (gameOver || clickedIndices.includes(data)) {
      return; // Prevent clicks if game is over or cell already clicked
    }

    requestQueue.current.push(data);
    processQueue();
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameOver) {
      requestQueue.current = []; // Clear queue when game is over
      setDabba(-1);
    }
  }, [gameOver]);

  return (
    <div
      className={`mine-cell aspect-square ${
        isLoading ? 'animate-grow-shrink' : ''
      } ${
        clickedIndices.includes(props.index) ? 'revealed' : ''
      }`}
      onClick={() => handleClick(props.index)}
    >
      {dabba == 1 || props.block == 1 ? (
        <div className=" w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-indigo-600/25 rounded-lg hover:from-indigo-500/30 hover:to-indigo-600/35 transition-all duration-300">
          <img 
            className={`w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 transition-all duration-300 ${
              clickedIndices.includes(props.index)
                ? 'brightness-[1.5] scale-110'
                : 'brightness-[1] hover:brightness-[2]'
            }`}
            src={diamond}
            alt="diamond"
          />
          {clickedIndices.includes(props.index) && (
            <div className="absolute inset-0 bg-green-400/15 rounded-lg" />
          )}
        </div>
      ) : dabba == 0 || props.block == 0 ? (
        <div className=" w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500/20 to-red-600/25 rounded-lg hover:from-red-500/30 hover:to-red-600/35 transition-all duration-300">
          <img 
            className={`w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 transition-all duration-300 ${
              clickedIndices.includes(props.index)
                ? 'brightness-[1.2] scale-110'
                : 'brightness-[1] hover:brightness-[1.5]'
            }`}
            src={bomb}
            alt="bomb"
          />
          {clickedIndices.includes(props.index) && (
            <div className="absolute inset-0 bg-red-400/20 rounded-lg" />
          )}
        </div>
      ) : (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 transition-all duration-300 border border-gray-700/20" />
      )}
    </div>
  );
}

export default Mine;
