import context from "./MyContext";
import { useCallback, useContext, useState } from "react";

export default function Bet(){
    const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated, setIsAuthenticated, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);

    const [paisa,setPaisa] =useState(0);

    const Add = useCallback( async()=> {
        await uploadAmount(+cash + +paisa);
        setCash(+cash + +paisa);
    });

    const changeBet = useCallback( ()=> {
        if(cash>=bet && bet>=0){
            setCash((+cash - +bet).toFixed(4));
            setMoney(+money + +bet);
        }
        else{
            alert("wrong bet amount")
        }
    });



    return(<>
        <div className="mx-10 flex">
            <div className="border-2 border-black ">Money = ₹ {cash}</div>
            <input className="border-2 border-black " type="number"  placeholder="add money" onChange={(e)=> setPaisa(e.target.value)} />
            <button onClick={Add} className="border-2 border-black" >Add money</button>


        </div>
        <div>
            <div className="border-2 text-center border-black">Bet Amount {money}</div>
            <input className="border-2 border-black " type="number"  placeholder="Bet Amount" onChange={e => setBet(e.target.value)}  />
            <button onClick={changeBet} className="border-2 border-black" >Add bet</button>
        </div>    
    </>
    )
}