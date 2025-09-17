import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtil } from './shared/utils/app-util';
import { ComponentsRoutes } from './shared/utils/components-routes';
import { PermissionManagementService } from './shared/services/permission-management.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  //********************************************************************  USER IN-ACTIVITY  *************************************************//
  hour: number = 3600000; // 1 hour
  second: number = 1000;  //   1 second
  private timeout: any;

  constructor(private router: Router, ) {

  }
  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.permissionService.loadPermissions().subscribe();
    // }, 20);
  }

  ngOnInit() {
    this.resetUserActivityTimer();
    document.addEventListener('mousemove', this.resetUserActivityTimer.bind(this));
    document.addEventListener('keypress', this.resetUserActivityTimer.bind(this));
    document.addEventListener('mousedown', this.resetUserActivityTimer.bind(this));
    document.addEventListener('mouseup', this.resetUserActivityTimer.bind(this));
    document.addEventListener('scroll', this.resetUserActivityTimer.bind(this));

  }

  //  set time out for 2 hour
  resetUserActivityTimer() {
    this.resetTimer(this.hour * 2, this.expireSession.bind(this));
  }

  expireSession() {
    localStorage.clear();
    AppUtil.openToast('error', 'Session Expired', 'Error')
    this.router.navigate([ComponentsRoutes.LOGIN])
  }

  resetTimer(timeoutInMilliseconds: number, logoutCallback: () => void) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(logoutCallback, timeoutInMilliseconds);
  }

  //******************************************************************** END *************************************************//


}
