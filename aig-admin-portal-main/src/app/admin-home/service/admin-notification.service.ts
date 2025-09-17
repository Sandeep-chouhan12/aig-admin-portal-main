import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPartners } from 'src/app/organization/models/api-partners';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { AdminNotification } from '../modals/admin-notification';

@Injectable({
  providedIn: 'root'
})
export class AdminNotificationService {

  constructor(private http: HttpClient) { }


  public getAllNotification(pageRequest: PageRequest) {
    return this.http.post(ApiRoutes.GET_ALL_ADMIN_NOTIFICATIONS, pageRequest)
  }

  public deleteNotification(notificationId: string) {
    return this.http.delete(ApiRoutes.DELETE_ADMIN_NOTIFICATION + notificationId);
  }
  public addNotification(notification: AdminNotification) {
    return this.http.post(ApiRoutes.ADD_ADMIN_NOTIFICATION, notification)
  }
}
