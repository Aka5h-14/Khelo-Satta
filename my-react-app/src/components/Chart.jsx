import { LineChart } from '@mui/x-charts/LineChart';
import { useContext, useState, useEffect } from 'react';
import context from './MyContext';

export default function BasicLineChart() {
  const { array, setArray, cash, setCash, money, setMoney, profit, setProfit, play, setPlay, mines, setMines, gameOver, setgameOver, clickedIndices, setClickedIndices, handleSetArray, uploadData, requests } = useContext(context);

  const [Xaxis, setXaxis] = useState([0]);
  const [Yaxis, setYaxis] = useState([0]);

  useEffect(() => {
    const newArray = [...Xaxis, play];
    setXaxis(newArray);
  }, [profit]);

  useEffect(() => {
    const newArray = [...Yaxis, profit];
    setYaxis(newArray);
  }, [profit]);

  return (
    // <div className="w-full max-w-2xl h-auto">
      <LineChart
        xAxis={[{ data: Xaxis }]}
        series={[
          {
            data: Yaxis,
            baseline: 0
          },
        ]}
        // Use relative units for responsive behavior
      width={350}
      height={300}
        // sx={{
        //   width: '100%', // Make the chart width responsive
        //   height: '100%', // Adjust the height accordingly
        // }}
      />
    // </div>
  );
}
