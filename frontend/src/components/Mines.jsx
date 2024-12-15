import Mine from "./Mine";
import context from './MyContext';
import { useContext , useEffect , useState } from "react";
import AutohideSnackbar from "./SnackBar";
import OutlinedAlerts from "./AlertGreen";

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

    const [error, setError ] = useState(false);
    const [Data, setData ] = useState(false);
  

    useEffect(() => {
      const fetchData = async () => {
        if (money > 0) {
          setError(true);
          try {
            setData(await requests());
          } catch (error) {
            setData('Error fetching data:',error)
            console.error('Error fetching data:', error);
          }
        }
      };
  
      fetchData();
    }, [play]);


  return (
    <>
  <OutlinedAlerts className=" fixed top-2 " display={error} setDisplay={setError} type='success' msg={Data} />
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
      gameOver==true ? <AutohideSnackbar message="Game Over"/>  : ""
    }
    
    </>
  );
}

export default Mines
