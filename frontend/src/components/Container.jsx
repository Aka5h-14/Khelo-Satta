import React, { useContext } from "react";
import Mines from "./Mines";
import context from "./MyContext";
import { formatRupees } from "../utils/money";
import Bet from "./Bet";

function Container() {
  const {
    setArray,
    cash, setCash,
    money, setMoney,
    setProfit,
    play, setPlay,
    gameOver, setgameOver,
    multiply, setMultiply,
    setClickedIndices,
    handleSetArray, cashOutFunc,
    setOpen, setAlertMsg, setAlertSeverity,
    setOpenBox, setAlertBoxMsg, setAlertBoxTitle, setAlertBoxSeverity,
    setHighestWin,
  } = useContext(context);

  function next() {
    if (money === 0) {
      setAlertSeverity('warning');
      setAlertMsg("Please add a bet to play");
      setOpen(true);
      return;
    }
    if (gameOver) {
      setArray(new Array(25).fill(-1));
      setMultiply(1);
      setClickedIndices([]);
    }
    setPlay(play + 1);
  }

  async function cashOut() {

    try {
      const data = await cashOutFunc();

      const winAmountPaisa = data.winAmount;
      setHighestWin(prev => Math.max(prev, winAmountPaisa));
      handleSetArray(data.array);

      // await Promise.all([
      //   uploadAmount(cash + winAmountPaisa),
      //   uploadData(winAmountPaisa, money),
      // ]);

      setAlertBoxTitle('Cash Out Success!');
      setAlertBoxMsg(`
        <div class="space-y-3">
          <p class="text-lg font-medium text-green-400">Well played!</p>
          <div class="space-y-2">
            <p>Winnings: <span class="text-yellow-400">${formatRupees(winAmountPaisa)}</span></p>
            <p>Multiplier: <span class="text-indigo-400">${multiply}x</span></p>
          </div>
        </div>
      `);
      setAlertBoxSeverity('success');
      setOpenBox(true);

      setProfit(prev => prev + (winAmountPaisa - money));
      setgameOver(true);

      setMoney(0);
      setMultiply(1);

    } catch (error) {
      console.error('Error during cashout:', error);

      setAlertBoxTitle('Cash Out Failed');
      setAlertBoxMsg(`
        <div class="space-y-3">
          <p class="text-lg font-medium text-red-400">Error Processing Cashout</p>
          <p>Please try again. If the problem persists, contact support.</p>
        </div>
      `);
      setAlertBoxSeverity('error');
      setOpenBox(true);
    }
  }

  return (
    <div className="flex flex-col md:p-10 md:flex-row md:gap-6 md:mx-auto">
      {/* Betting Controls Section */}
      <div className="mt-1 mb-5 md:mb-0 mx-auto md:mt-0 w-full xs:w-[280px] xg:w-[310px] sm:w-[350px] md:basis-1/3 lg:basis-3/10">
        <Bet />
      </div>

      {/* Main Game Section */}
      <div className="flex flex-col space-y-4 md:basis-2/3 lg:basis-7/10">
        {/* Game Grid */}
        <div className=" w-full bg-gray-900/50 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <Mines />
        </div>

        {/* Game Stats */}
        <div className="flex justify-evenly w-full">
          <div className="card bg-opacity-90 backdrop-blur xs:p-2 xs:px-5 md:p-3 md:px-7">
            <div className="text-xs xg:text-sm md:text-base text-gray-400">Multiplier</div>
            <div className="text-xs xg:text-base sm:text-lg font-bold text-indigo-400 text-center">{multiply}x</div>
          </div>
          <div className="card bg-opacity-90 backdrop-blur xs:p-2 xs:px-5 md:p-3 md:px-7">
            <div className="text-xs xg:text-sm md:text-base text-gray-400">Potential Win</div>
            <div className="text-xs xg:text-base sm:text-lg font-bold text-green-400 text-center">
              {formatRupees(Math.floor(money * multiply))}
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-3 w-full">
          {gameOver && (
            <button
              onClick={next}
              className="button-primary px-6 py-2.5 text-sm sm:text-base font-bold"
            >
              Play Game
            </button>
          )}

          {!gameOver && (
            <button
              onClick={cashOut}
              className="button-secondary px-6 py-2.5 text-sm sm:text-base font-bold bg-green-600 hover:bg-green-700"
            >
              Cash Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Container;
