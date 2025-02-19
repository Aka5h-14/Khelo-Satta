import Bet from "./Bet";
import Container from "./Container";
import BasicLineChart from "./Chart";
import AlertDialogSlide from "./Alert";
import AutohideSnackbar from "./SnackBar";
import context from './MyContext';
import { useContext, useEffect } from "react";

function Game() {
  const { openBox ,setOpenBox,
    alertBoxMsg, setAlertBoxMsg, alertBoxTitle, setAlertBoxTitle,
    alertBoxSeverity, setAlertBoxSeverity,} = useContext(context);

    useEffect(() => {
      setOpenBox(true);
    setAlertBoxTitle("How to play");
    setAlertBoxMsg("How to play<br/>1 Enter the bet amount<br/>2 Click the add bet button<br/>3 Enter the number of mines<br/>4 Click the play button<br/>5 Play the game by clicking on the tiles<br/> <br/>You can cashout the amount using the Cash Out button");
    }, []);

  
  return (
    <>
    <AlertDialogSlide/>
    <AutohideSnackbar/>

      <div className="bg-slate-700">
        <Bet />
        <Container />
        <BasicLineChart />
      </div>
    </>
  );
}

export default Game;
