import { useContext, useEffect } from "react";
import context from "./MyContext";
import Container from "./Container";
import Chart from "./Chart";
import { formatRupees } from "../utils/money";

export default function Game() {
  const {
    cash,
    profit,
    highestWin,
    setOpenBox,
    setAlertBoxTitle,
    setAlertBoxMsg,
    setAlertBoxSeverity
  } = useContext(context);

  useEffect(() => {
    // Show instructions dialog
    setAlertBoxTitle('How to Play Mines');
    setAlertBoxMsg(`
      <div class="space-y-4">
        <p class="font-medium text-lg text-indigo-400">Welcome to Mines!</p>
        <ol class="list-decimal list-inside space-y-2 text-gray-300">
          <li>Enter your bet amount</li>
          <li>Choose the number of mines (1-24)</li>
          <li>Click "Play Game" to start</li>
          <li>Click on tiles to reveal diamonds</li>
          <li>Use "Cash Out" to secure your winnings</li>
          <li>Avoid mines or lose your bet!</li>
        </ol>
        <p class="text-sm text-gray-400 mt-4">Good luck and play responsibly!</p>
      </div>
    `);
    setAlertBoxSeverity('info');

    // Small delay to ensure the alert box is properly initialized
    const timer = setTimeout(() => {
      setOpenBox(true);
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      setOpenBox(false);
    };
  }, [setAlertBoxTitle, setAlertBoxMsg, setAlertBoxSeverity, setOpenBox]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="max-w-[1400px] mx-auto space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
        {/* Stats Bar */}
        <div className="flex flex-row justify-evenly gap-2 overflow-x-auto">
          <div className="stats-card flex-1 min-w-[100px] max-w-[300px] p-2">
            <div className="w-full">
              <div className="text-[10px] xs:text-xs xg:text-sm sm:text-base text-gray-400 text-center">Balance</div>
              <div className="text-xs xs:text-sm xg:text-base sm:text-lg text-center font-medium">{formatRupees(cash)}</div>
            </div>
          </div>
          <div className="stats-card flex-1 min-w-[100px] max-w-[300px] p-2">
            <div className="w-full">
              <div className="text-[10px] xs:text-xs xg:text-sm sm:text-base text-gray-400 text-center">Profit/Loss</div>
              <div className={`text-xs xs:text-sm xg:text-base sm:text-lg text-center font-medium ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatRupees(profit)}
              </div>
            </div>
          </div>
          <div className="stats-card flex-1 min-w-[100px] max-w-[300px] p-2">
            <div className="w-full">
              <div className="text-[10px] xs:text-xs xg:text-sm sm:text-base text-gray-400 text-center">Highest Win</div>
              <div className="text-xs xs:text-sm xg:text-base sm:text-lg text-center font-medium text-yellow-500">
                {formatRupees(highestWin)}
              </div>
            </div>
          </div>
        </div>

        {/* Game Container */}
        
          <div className="card bg-opacity-90 backdrop-blur p-1 xs:p-2 sm:p-3">
            <Container />
          </div>
        

        {/* Profit Chart */}
        <div className="card bg-opacity-90 backdrop-blur p-2 xs:p-3 sm:p-4">
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold mb-2 xs:mb-3 sm:mb-4">
            Profit History
          </h2>
          <div className="w-full h-full">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
