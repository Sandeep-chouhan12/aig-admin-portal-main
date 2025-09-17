export class PieChart {

  chartOptions = {
    series: [1,1,1],
    chart: {
      width: 500,
      height: 240,
      type: 'pie',
      background:"#bcbdbf",
      events: {
        animationEnd: undefined,
        beforeMount: undefined,
        mounted: undefined,
        updated: undefined,
        mouseMove: undefined,
        mouseLeave: undefined,
        click: undefined,
        legendClick: undefined,
        markerClick: undefined,
        xAxisLabelClick: undefined,
        selection: undefined,
        dataPointSelection: undefined,
        dataPointMouseEnter: undefined,
        dataPointMouseLeave: undefined,
        beforeZoom: undefined,
        beforeResetZoom: undefined,
        zoomed: undefined,
        scrolled: undefined,
      }
    },
    tooltip:{
      enable:false
 },
    dataLabels: {
        enabled: false,
    },
    colors: ['#1f3778', '#bbccfa', '#bcbdbf'],
    stroke: {
      show: false, // Set this to false to remove the borders between the series
    },
    fill: {
      opacity: 10,
    },
    labels: ['Verified', 'Pending', 'Rejected'],
    legend: {
        show: true,
        floating: false,
        fontSize: '20px',
        position: 'right',
        fontFamily: 'outfit',
        fontWeight: 500,
        offsetX: 0,
        offsetY: 40,
        labels: {
          useSeriesColors: true,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 15,
        },
        
      
      },
   
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],

    plotOptions: {
     
    },
    
  };
}
// chartOptions = {
//   series: [44, 55, 13],
//   chart: {
//     type: "donut",
//   },
//   stroke: {
//       show: false // Set this to false to remove the borders between the series
//     },
//   labels: ["Verified","Pending","Rejected"],
//   colors:["#5174d1","#174EA0","#fd9292"],
//   legend: {
//       position: "bottom"
//     },
//   responsive: [
//     {
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 400
//         },
//         legend: {
//           position: "bottom"
//         }
//       }
//     }
//   ]
// };