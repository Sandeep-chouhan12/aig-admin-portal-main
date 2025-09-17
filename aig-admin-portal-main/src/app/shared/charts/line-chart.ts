export class LineChart {
    chartOptions = {
        series: [
          {
            name: "Users",
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
        ],
        colors: ["#283f7e", "#8a8a8a"],
        chart: {
          width:"100%",
          height: 380,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        markers: {
          size: 5,
          colors: ["#ffffff", "#ffffff"], // Set the colors for the initial blue and white point
          strokeColors: ["#1f3778", "#8a8a8a"], // Set the stroke colors for the white and blue point
          strokeWidth: 3, // Set the stroke width for the points
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          width: [3, 3 ,3],
        },
        grid: {
          row: {
            colors: ["#ffffff"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
      };
}
