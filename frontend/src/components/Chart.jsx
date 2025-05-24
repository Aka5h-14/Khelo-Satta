import { useContext, useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import context from "./MyContext";
import { paisaToRupees } from "../utils/money";

const MAX_DATA_POINTS = 20;

export default function Chart() {
  const { profit, play } = useContext(context);
  const [xAxis, setXaxis] = useState([0]);
  const [yAxis, setYaxis] = useState([0]);

  useEffect(() => {
    setXaxis(prev => {
      const newData = [...prev, play];
      return newData.slice(-MAX_DATA_POINTS);
    });
  }, [play]);

  useEffect(() => {
    setYaxis(prev => {
      const newData = [...prev, profit];
      return newData.slice(-MAX_DATA_POINTS);
    });
  }, [profit]);

  const chartStyle = {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: '0.5rem',
    backdropFilter: 'blur(4px)',
    width: '100%',
    height: '100%',
  };

  // Calculate min and max for better y-axis scaling
  const minY = Math.min(...yAxis);
  const maxY = Math.max(...yAxis);
  const yAxisRange = maxY - minY;
  const yAxisMin = minY - (yAxisRange * 0.1); // Add 10% padding
  const yAxisMax = maxY + (yAxisRange * 0.1);

  return (
    <div className="w-full h-[300px]">
      <LineChart
        style={chartStyle}
        margin={{ left: 40, right: 20, top: 20, bottom: 40 }}
        xAxis={[{
          data: xAxis,
          label: 'No. of Games',
          labelStyle: {
            fill: '#E5E7EB',
            fontSize: 12,
          },
          tickLabelStyle: {
            fill: '#D1D5DB',
            fontSize: 10,
          },
          tickMaxStep: 5,
        }]}
        yAxis={[{
          label: 'Profit / Loss (₹)',
          labelStyle: {
            fill: '#E5E7EB',
            fontSize: 12,
          },
          tickLabelStyle: {
            fill: '#D1D5DB',
            fontSize: 10,
          },
          valueFormatter: (value) => paisaToRupees(value),
          min: yAxisMin,
          max: yAxisMax,
          tickCount: 5, // Force exactly 5 ticks
        }]}
        series={[
          {
            data: yAxis,
            area: true,
            color: profit >= 0 ? '#10B981' : '#EF4444',
            showMark: false,
            valueFormatter: (value) => paisaToRupees(value),
            curve: "monotoneX",
          },
        ]}
        sx={{
          '.MuiLineElement-root': {
            strokeWidth: 2,
          },
          '.MuiAreaElement-root': {
            fillOpacity: 0.15,
          },
        }}
        disableAxisListener
        tooltip={{ trigger: 'axis' }}
      />
    </div>
  );
}
