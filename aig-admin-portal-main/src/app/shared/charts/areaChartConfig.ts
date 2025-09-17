import { ChartOptions } from "./chart-options"; // or update path if needed

export const areaChartConfig: Partial<ChartOptions> = {
  series: [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42],
    },
  ],
  chart: {
    zoom: {
      enabled: false,
      allowMouseWheelZoom: false,
    },
    toolbar: {
      show: false,
    },
    height: 300,
    type: "area",
  },
  colors: ["#1A3275"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
  },
  yaxis: {
    lines: {
      show: false,
    },
    show: false,
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};
