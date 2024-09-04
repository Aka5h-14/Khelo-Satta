import context from "./MyContext";
import { useCallback, useContext, useState } from "react";

export default function Bet(){
    const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated, setIsAuthenticated, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);

    const [paisa,setPaisa] =useState(0);

    const Add = useCallback( async()=> {
        await uploadAmount(+cash + +paisa);
        setCash(+cash + +paisa);
    });

    const handleMines = useCallback((e) => {
            setMines(e.target.value)
    });

    function changeBet () {
        if((cash>=bet) && (bet>0)){
            setCash(+cash - +bet);
            setMoney(+money + +bet);
        }
        else{
            alert("wrong bet amount")
        }
    };



    return(<>
    <div className="border-y-2 border-white bg-slate-700 grid-cols-1 py-2 text-xs xg:text-base md:text-lg">
        <div className="flex justify-center mb-5" >
            <div className="border-2 border-black bg-slate-600 text-white p-2 font-bold">₹ {cash}</div>
            <input className="p-2 mx-2 border-2 border-black bg-slate-800 text-white text-center w-40" type="number" min="0"  placeholder="Amount" onChange={(e)=> {if(e.target.value>0)setPaisa(e.target.value)}} />
            <button onClick={Add} className=" rounded border-2 p-1 border-slate-900 bg-green-500 hover:bg-green-600 hover:scale-105 text-white"  >Add money</button>


        </div>
        <div className=" xg:px-14 md:px-20 grid-cols-1 md:flex justify-around">
            <div className="flex justify-center pb-2 md:pb-0">
                <div className="border-2 text-center border-black bg-slate-600  text-white p-2 font-bold">Bet - ₹{money}</div>
                <input className="p-2 mx-2 border-2 border-black bg-slate-800 text-white text-center w-40" type="number" min="0"  placeholder="Bet Amount" onChange={e => setBet(e.target.value)}  />
                <button onClick={changeBet} className="rounded border-2 p-1 border-slate-900 bg-green-500 hover:bg-green-600 hover:scale-105 text-white" >Add bet</button>
            </div>
            <div className="flex justify-center">
                <span className="border-2 text-center border-black bg-slate-600  text-white p-2 font-bold">No of Mines</span>
                <input
                type="number"
                value={mines}
                min="0"
                max="24"
                onChange={handleMines}
                className="p-2 mx-2 border-2 border-black bg-slate-800 text-white text-center w-20"
                />
                {/* <input className="p-2 mx-2 border-2 border-black bg-slate-800 text-white text-center w-20" list="Mines" value={mines} onChange={handleMines}/>
        <datalist id="Mines">
            <option value='1'/>
            <option value='2' />
            <option value='3' />
            <option value='4' />
            <option value='5' />
            <option value='6' />
            <option value='7' />
            <option value='8' />
            <option value='9' />
            <option value='10' />
            <option value='11' />
            <option value='12' />
            <option value='13' />
            <option value='14' />
            <option value='15' />
            <option value='16' />
            <option value='17' />
            <option value='18' />
            <option value='19' />
            <option value='20' />
            <option value='21' />
            <option value='22' />
            <option value='23' />
            <option value='24' />
        </datalist> */}
            </div>
        </div>  
    </div>  
    </>
    )
}