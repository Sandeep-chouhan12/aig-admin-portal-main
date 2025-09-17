export class RedialChart {
  chartOptions = {
    rawData:[],
    series: [75, 50, 25],
    chart: {
      height: 415,
      width:"100%",
      type: 'radialBar',
    },
    stroke: {
      lineCap: 'round',
      width: 10,
    },
    legend: {
      show: true,
      floating: false,
      fontSize: '20px',
      position: 'bottom',
      fontFamily: 'outfit',
      fontWeight: 500,
    
      labels: {
        useSeriesColors: true,
      },
      itemMargin: {
        horizontal: 25,
          // vertical: 25,
      },
    },
    fill: {
      opacity: 10,
    },
    colors: ['#1f3778', '#7491de', '#fd9292'],
    plotOptions: {
      radialBar: {
        dataLabels: {
        
        },
        track: {
          background: '#f8f8f8',
          strokeWidth: '100%',
          margin: 25 , // Set the margin between the track and the radial bars
        },
        hollow: {
          size: '15%',
        },
      },
    },
    labels: ['Verified', 'Pending', 'Rejected'],
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: "100%",
            height:500,
          },
          // legend: {
          //   offsetX: 10,
          //   offsetY: 10,
          //   position: 'bottom',
          //   itemMargin: {
          //     horizontal: 5,
          //       vertical: 5,
          //   },
          // },
          
         
        },
      },
    ],
  };
}




