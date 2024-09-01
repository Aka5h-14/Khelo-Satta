import Mine from "./Mine";
import context from './MyContext';
import { useContext , useEffect } from "react";


function Mines() {

  const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated, setIsAuthenticated,API, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);
  

  useEffect(() => {
    if(money>0){
    requests();
    }
  }, [play]);


  return (
    <>
    <div className="mx-auto w-80 xg:w-96 mt-10 p-5 rounded grid grid-cols-5 gap-5 bg-slate-600">
      {array.map((block, index) => (
        <Mine
          key={index}
          index={index}
          block={block}
          //   clickedIndices
          //   gameOver
          //   handleClick
        ></Mine>
      ))}
    </div>
    <p className="text-red-600">{gameOver ? "game over" :""}</p>
    </>
  );
}

export default Mines
