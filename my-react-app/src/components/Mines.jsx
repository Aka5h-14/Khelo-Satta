import Mine from "./Mine";
import context from './MyContext';
import { useContext , useEffect } from "react";
// import Popup from "./Popup";


function Mines() {

  const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated, setIsAuthenticated,
    // dabba, setDabba,
      API, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);
  

  useEffect(() => {
    if(money>0){
    requests();
    }
  }, [play]);


  return (
    <>
    <div className="mx-auto w-80 xg:w-96 p-5 rounded grid grid-cols-5 gap-5 bg-slate-600">
      {array.map((block, index) => (
        <Mine
          key={index}
          index={index}
          block={block}
          // dabba={dabba}
          // setDabba={setDabba}
          //   clickedIndices
          //   gameOver
          //   handleClick
        ></Mine>
      ))}
    </div>
    {/* <Popup/> */}
    <p className="text-red-600">{gameOver ? "game over" :""}</p>
    </>
  );
}

export default Mines
