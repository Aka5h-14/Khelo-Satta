import Bet from "./Bet";
import Container from "./Container";
import BasicLineChart from "./Chart";

function Game() {
  return (
    <>
      <div className="bg-slate-700">
        <Bet />
        <Container />
        <BasicLineChart />
      </div>
    </>
  );
}

export default Game;
