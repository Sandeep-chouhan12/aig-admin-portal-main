import { ChartOptions } from "./chart-options";

export const barChartConfig: Partial<ChartOptions> = {
 series: [
  {
    name: "",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }
],
  chart: {
    type: "bar",
    height: 350,
    stacked: false
  },
  legend: {
    show: false
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "13%",
      endingShape: "rounded"
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
    lineCap: 'round'
  },
  xaxis: {
    categories: [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ]
  },
  yaxis: {
    min: 0,
    tickAmount: 6,
    labels: {
      
      formatter: (value: number) => value.toFixed(0)
    }
  },
  fill: {
    opacity: 1
  },
  grid: {
    show: true,
    borderColor: "#e0e0e0",
    strokeDashArray: 4
  },

};
