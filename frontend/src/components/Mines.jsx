import Mine from "./Mine";
import context from './MyContext';
import { useContext , useEffect } from "react";

function Mines() {

  const { array,
    cash,
    setCash,
    money,
    requests, setOpen,
    setAlertMsg,
    setAlertSeverity, 
    gamesPlayed,
  } = useContext(context);
  

    useEffect(() => {
      const fetchData = async () => {
        if (money > 0) {
          try {
            const msg = await requests();
            setAlertMsg(msg);
            if(msg=="Game ready to play"){
              // need to change bet
              setCash(+cash - +money);
              setAlertSeverity('success')
            }
            else{
              setAlertSeverity('warning')
            }
            setOpen(true);

          } catch (error) {
            setAlertMsg('Error fetching data:');
            console.error('Error fetching data:', error);
          }
        }
      };
  
      fetchData();
    }, [gamesPlayed]);


  return (
    <>
    <div className="w-full max-w-[350px] xs:max-w-[400px] mx-auto p-2 xs:p-3 sm:p-5 rounded grid grid-cols-5 gap-2 xs:gap-3 sm:gap-4 md:gap-5 bg-transparent">
      {array.map((block, index) => (
        <Mine
          key={index}
          index={index}
          block={block}
        ></Mine>
      ))}
    </div>
    
    </>
  );
}

export default Mines
