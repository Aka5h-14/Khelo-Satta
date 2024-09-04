import Mine from "./Mine";
import context from './MyContext';
import { useContext , useEffect } from "react";

function Mines() {

  const { array,
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
    isAuthenticated, setIsAuthenticated,
    API,
    handleSetArray,
    uploadAmount,
    uploadData,
    requests,  } = useContext(context);
  

    useEffect(() => {
      const fetchData = async () => {
        if (money > 0) {
          try {
            const data = await requests();
            alert(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };
  
      fetchData();
    }, [play]);


  return (
    <>
    <div className="mx-auto w-80 xg:w-96 p-5 rounded grid grid-cols-5 gap-5 bg-slate-600">
      {array.map((block, index) => (
        <Mine
          key={index}
          index={index}
          block={block}
        ></Mine>
      ))}
    </div>
    {
      gameOver==true ? <p className="text-red-600">game over</p> : ""
    }
    
    </>
  );
}

export default Mines
