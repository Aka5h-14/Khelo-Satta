import context from "./MyContext";
import { useCallback, useContext, useRef } from "react";
import { rupeesToPaisa, formatRupees, validateAndConvertAmount } from "../utils/money";

export default function Bet() {
    const { 
        cash, setCash,
        money, setMoney,
        mines, setMines,
        gameOver,
        uploadAmount,
        setOpen,
        setAlertMsg,
        setAlertSeverity,
    } = useContext(context);

    const betInputRef = useRef(null);
    const moneyInputRef = useRef();

    const Add = useCallback(async () => {
        const inputAmount = moneyInputRef.current.value;
        const paisaAmount = validateAndConvertAmount(inputAmount);
        
        if (paisaAmount > 0) {
            let data = await uploadAmount(paisaAmount);
            if(data.success){
                setCash(data.balance);
                setAlertMsg("Amount added successfully");
                setAlertSeverity("success");
                setOpen(true);
            }
            moneyInputRef.current.value = "";
        }
    });

    const handleMines = useCallback((e) => {
        const value = Math.min(24, Math.max(0, e.target.value));
        setMines(value);
    });

    const quickBets = [100, 500, 1000, 5000]; // Values in rupees

    function changeBet() {
        const betAmount = rupeesToPaisa(betInputRef.current.value);
        if (cash >= betAmount && betAmount > 0) {
            setMoney(betAmount);
        } else {
            setAlertMsg("Invalid bet amount");
            setAlertSeverity("error");
            setOpen(true);
        }
    };

    const handleQuickBet = (amountInRupees) => {
        betInputRef.current.value = amountInRupees;
    };

    return (
        <div className="space-y-2 xs:space-y-3">
            {/* Balance Section */}
            <div className="space-y-1.5 xs:space-y-2">
                <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-200">Add Balance</h3>
                <div className="flex flex-col gap-1.5 xs:gap-2">
                    <div className="stats-card p-1.5 xs:p-2">
                        <span className="text-xs xs:text-sm sm:text-base">{formatRupees(cash)}</span>
                    </div>
                    <div className="flex gap-1.5 xs:gap-2">
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Amount"
                            ref={moneyInputRef}
                            className="input-field flex-1 basis-2/3 text-xs xs:text-sm p-1.5 xs:p-2"
                        />
                        <button 
                            onClick={Add} 
                            className="button-primary basis-1/3 whitespace-nowrap text-xs xs:text-sm p-1.5 xs:p-2"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Betting Section */}
            <div className="space-y-1.5 xs:space-y-2">
                <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-200">Place Bet</h3>
                <div className="space-y-1.5 xs:space-y-2">
                    <div className="flex flex-col gap-1.5 xs:gap-2">
                        <div className="stats-card p-1.5 xs:p-2">
                            <span className="text-xs xs:text-sm sm:text-base">{formatRupees(money)}</span>
                        </div>
                        <div className="flex gap-1.5 xs:gap-2">
                            <input
                                ref={betInputRef}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Bet amount"
                                className="input-field flex-1 basis-2/3 text-xs xs:text-sm p-1.5 xs:p-2"
                            />
                            <button 
                                onClick={changeBet} 
                                className="button-primary basis-1/3 whitespace-nowrap text-xs xs:text-sm p-1.5 xs:p-2" 
                                disabled={!gameOver}
                            >
                                Bet
                            </button>
                        </div>
                    </div>

                    {/* Quick Bet Buttons */}
                    <div className="grid grid-cols-4 gap-1 xs:gap-1.5">
                        {quickBets.map(amount => (
                            <button
                                key={amount}
                                onClick={() => handleQuickBet(amount)}
                                className="button-secondary text-[10px] xs:text-xs p-1 xs:p-1.5"
                                disabled={!gameOver}
                            >
                                ₹{amount}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mines Selection */}
            <div className="space-y-1.5 xs:space-y-2">
                <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-200">Mines</h3>
                <div className="space-y-1.5 xs:space-y-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="1"
                            max="24"
                            value={mines}
                            onChange={handleMines}
                            className="flex-1 h-1 xs:h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                            type="number"
                            value={mines}
                            min="1"
                            max="24"
                            onChange={handleMines}
                            className="input-field w-12 xs:w-14 text-center text-xs xs:text-sm p-1 xs:p-1.5"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-1 xs:gap-1.5">
                        {[1, 3, 5, 10].map(num => (
                            <button
                                key={num}
                                onClick={() => setMines(num)}
                                className={`button-secondary text-[10px] xs:text-xs p-1 xs:p-1.5 ${mines === num ? 'bg-indigo-600' : ''}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}