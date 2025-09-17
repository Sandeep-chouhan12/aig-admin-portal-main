import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AdminNotificationService } from '../service/admin-notification.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { AdminNotification } from '../modals/admin-notification';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notificationId: string = '';
  notifications: AdminNotification[] = [];
  pageRequest: PageRequest = new PageRequest;
  pagination: PaginationManager = new PaginationManager;

  appUtil = AppUtil;
  constructor(private sharedService: SharedService, private notificationService: AdminNotificationService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.hideSideNav(true);
    this.getAllNotification()
  }

  ngOnDestroy(): void {
    this.hideSideNav(false);
  }


  hideSideNav(isOn: boolean) {
    this.sharedService.hideSideNav.next(isOn);
  }

  public deleteNotification() {
    this.notificationService.deleteNotification(this.notificationId).subscribe({
      next: (data: any) => {
        AppUtil.modalDismiss('delete-modal-close');
        this.getAllNotification();
      },
      error: (er: any) => {

      }
    })
  }

  public getAllNotification() {
    this.notificationService.getAllNotification(this.pageRequest).subscribe({
      next: (data: any) => {
        this.notifications = data.notifications.content

        this.pagination.setPageData(data.notifications);

        this.pageRequest.pageNo = data.notifications.pageNo
      },
      error: (er: any) => {

      }
    })
  }
}
