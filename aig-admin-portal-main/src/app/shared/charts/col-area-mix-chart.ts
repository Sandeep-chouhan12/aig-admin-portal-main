export class ColAreaMixChart {
 chartOptions = {
        series: [
          {
            name: "USER",
            type: "column",
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            colors: ["#000000"],
          },
          {
            name: "USER",
            type: "area",
            data:  [0,0,0,0,0,0,0,0,0,0,0,0],
          },
        ],
        chart: {
          height: 350,
          type: "area",
          stacked: true,
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
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [], // Disable data labels on all series
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%",
            borderRadius: 6
          },
          area: {
            //range: -10,
          },
        },
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [40, 100, 100, 100],
            gradientToColors: ["#1f3778"], // Set the desired color here
          },
        },
        
        labels: [
          "01/01/2003",
          "02/01/2003",
          "03/01/2003",
          "04/01/2003",
          "05/01/2003",
          "06/01/2003",
          "07/01/2003",
          "08/01/2003",
          "09/01/2003",
          "10/01/2003",
          "11/01/2003",
        ],
        markers: {
          size: 5,
          colors: ["#ffffff", "#1f3778"], // Set the colors for the initial blue and white point
          strokeColors: ["#1f3778", "#ffffff"], // Set the stroke colors for the white and blue point
          strokeWidth: 3, // Set the stroke width for the points
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
          show:false
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y:any) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            },
          },
        },
        colors: ["#1f3778", "#536698"], // Set the colors for column and area
        grid : {
          show: true,
          borderColor: '#e5e5ef',
          strokeDashArray: 5,
          position: 'back',
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 5,
          },
        }
      };
}



