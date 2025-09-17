import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { barChartConfig } from 'src/app/shared/charts/bar-chart-config';
import { ChartOptions } from '../report-api-bar-chart/report-api-bar-chart.component';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent {
 @Input() userId!: any;
  public chartOptions: Partial<ChartOptions> = barChartConfig;
  public months: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
    'MAY', 'JUNE', 'JULY', 'AUGUST',
    'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  constructor(
    private userService: UsersService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onChartModeChange('monthly');
  }

    onChartModeChange(mode: string) {
    this.chartOptions = JSON.parse(JSON.stringify(this.chartOptions));
    const requestBody = {
      organizationId: this.userId,
      mode: mode
    };

    this.userService.getTransactionSummary(requestBody).subscribe((data) => {
      if (mode === 'yearly') {
        const years = data.map(item => item.year?.toString());
        const yearlyAmounts = data.map(item => item.amount);
        // Wait one tick to let Angular detect the change
        setTimeout(() => {
          this.chartOptions = Object.assign({}, this.chartOptions, {
            series: [{
              name: 'Yearly Amount',
              data: yearlyAmounts,
              color: '#174EA0'
            }],
            xaxis: {
              categories: years || [],
              title: {
                text: 'Transactions'
              }
            }
          });
        }, 100);
        this.cdRef.detectChanges();
      }
      else if (mode === 'monthly') {

        const monthMap: Record<string, number> = {
          'JANUARY': 0, 'FEBRUARY': 1, 'MARCH': 2, 'APRIL': 3,
          'MAY': 4, 'JUNE': 5, 'JULY': 6, 'AUGUST': 7,
          'SEPTEMBER': 8, 'OCTOBER': 9, 'NOVEMBER': 10, 'DECEMBER': 11
        };

        const monthlyAmounts = new Array(12).fill(0);

        data.forEach(item => {
          const month = (item.month || '').trim().toUpperCase();
          const index = monthMap[month];
          if (index !== undefined) {
            monthlyAmounts[index] = item.amount;
          }
        });

        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            categories: Object.keys(monthMap).map(m => m.slice(0, 3)),
            title: {
              text: "Transactions",
            },
          },
          series: [{
            name: 'Monthly Amount',
            data: monthlyAmounts,
            color: '#174EA0'
          }]
        };
      } else {

        const currentYear = new Date().getFullYear();
        const monthIndexMap: Record<string, number> = {
          'JANUARY': 0, 'FEBRUARY': 1, 'MARCH': 2, 'APRIL': 3,
          'MAY': 4, 'JUNE': 5, 'JULY': 6, 'AUGUST': 7,
          'SEPTEMBER': 8, 'OCTOBER': 9, 'NOVEMBER': 10, 'DECEMBER': 11
        };
        const monthIndex = monthIndexMap[mode.toUpperCase()] ?? 0;

        const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
        const dayLabels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
        const dailyAmounts = new Array(daysInMonth).fill(0);

        data.forEach(item => {
          const day = parseInt(item.day);
          if (!isNaN(day) && day >= 1 && day <= daysInMonth) {
            dailyAmounts[day - 1] = item.amount;
          }
        });

        this.chartOptions.xaxis = {
          categories: dayLabels,
          title: {
            text: "Transactions",
          },
        };
        this.chartOptions.series = [{
          name: `Transactions for ${mode}`,
          data: dailyAmounts,
          color: '#174EA0'
        }];
      }
    });
  }
}
