import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/utils/constants';
import { AppUtil } from 'src/app/shared/utils/app-util';

@Component({
  selector: 'app-activity-overview-count',
  templateUrl: './activity-overview-count.component.html',
  styleUrls: ['./activity-overview-count.component.scss'],
  providers: [NumberFormatPipe, AppUtil]
})
export class ActivityOverviewCountComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private router: Router, private appUtil: AppUtil) { }

  componentRoutes = ComponentsRoutes;
  constants = Constants

  totalUserCount = {
    users: 0,
    portalOfficer: 0,
    address: 0,
    verificationOfficer: 0,

  }

  ngOnInit(): void {
    this.getTotalUsersCount()
  }

  getTotalUsersCount() {
    this.dashboardService.getTotalUsersCount().subscribe({
      next: (data: any) => {
        this.totalUserCount = data;
        this.appUtil.counter(this.totalUserCount.users, 'counter1');
        this.appUtil.counter(this.totalUserCount.portalOfficer, 'counter2');
        this.appUtil.counter(this.totalUserCount.address, 'counter3');
        this.appUtil.counter(this.totalUserCount.verificationOfficer, 'counter4');
      },
      error: (err: any) => {

      }
    })
  }
  public navigateToComponent(path: any, openSideBar: any = Constants.SIDE_BAR_ID.dashboard) {
    this.router.navigate([ComponentsRoutes.ADMIN_HOME + '/' + path]);
    document.getElementById(openSideBar)?.click();
  }

  openSideBar() {

  }


}
