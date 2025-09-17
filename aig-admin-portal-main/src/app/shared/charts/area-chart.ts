export class AreaChart {
  chartOptions = {
    series: [
      {
        name: 'Verified',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
      },
    ],
    colors: ['#1f3778'],
    chart: {
      type: 'area',
      height:110,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
    show: false,
  },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 80, 90, 100],
        gradientToColors: ["#dee7ff"], // Set the desired color here
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        show: true,
        style: {
          colors: '#758aa8',
          fontSize: '14px',
          fontFamily: 'outfit',
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      row: {
        colors: undefined,
        opacity: 0.5,
      },
    },
  };
}
