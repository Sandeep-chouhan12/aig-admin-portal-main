export class ColumnChart {
chartOptions = {
        series: [
          {
            name: "Active Users",
            data: [25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000,25000, 25000, 25000],
         // data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
          {
            name: "Active Users",
            data: [26000, 27000, 25000, 25000, 25000, 25000, 25000, 25000, 25000,25000, 25000, 25000],
         //   data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
          {
            name: "Active Users",
            data: [26000, 27000, 25000, 25000, 25000, 25000, 25000, 25000, 25000,25000, 25000, 25000],
         //   data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
        ],
        colors:['#174EA0','#cad8ff'],
        chart: {
          type: "bar",
          height: 350,
          toolbar:{
            show: false
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "40%",
            borderRadius: 3,
           // endingShape: 'rounded', // Add rounded top to columns
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 6,
          colors: ["transparent"],
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
        
        },
        fill: {
          opacity: 10,
        },
        tooltip: {
          y: {
            formatter: function (val:any) {
              return "$ " + val + "k";
            },
          },
        },
      };
}
