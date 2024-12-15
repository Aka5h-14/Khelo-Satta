import Bet from "./Bet";
import Container from "./Container";
import BasicLineChart from "./Chart";
import AlertDialogSlide from "./Alert";

function Game() {
  
  return (
    <>
    <AlertDialogSlide/>
      <div className="bg-slate-700">
        <Bet />
        <Container />
        <BasicLineChart />
      </div>
    </>
  );
}

export default Game;
