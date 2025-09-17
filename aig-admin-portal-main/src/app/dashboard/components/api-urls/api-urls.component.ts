import { Component, OnInit } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/models/column-config';
import { TableConfig } from 'src/app/shared/models/table-config';
import { DashboardService } from '../../services/dashboard.service';
import { ApiHitsCount } from '../../payload/api-hits-count';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { environment } from 'src/environments/environment';

/**
 * Component for displaying the total hits of APIs on the dashboard.
 */
@Component({
  selector: 'app-api-urls',
  templateUrl: './api-urls.component.html',
  styleUrls: ['./api-urls.component.scss']
})
export class ApiUrlsComponent implements OnInit {

  /** List containing API hits count information */
  apiHitsCount: ApiHitsCount[] = [];

  /** Base URL for the API requests */
  BASE_URL = environment.hostUrl;

  /**
   * Constructor to inject the DashboardService.
   * @param dashboardService - The service for retrieving dashboard-related data.
   */
  constructor(private dashboardService: DashboardService) {}

  /**
   * Lifecycle hook - OnInit
   * This method is called once the component is initialized.
   * It triggers the initial loading of total hits of APIs.
   */
  ngOnInit(): void {
    this.getTotalHitsOfApi();
  }
  
  /**
   * Fetches the total hits of APIs from the dashboard service.
   * Updates the `apiHitsCount` array with the received data.
   */
  public getTotalHitsOfApi(): void {
    this.dashboardService.getTotalHitsOfApi().subscribe({
      next: (res: any) => {
        // Update the list of API hits count with the received data
        this.apiHitsCount = res.apis;
      },
      error: (err: any) => {
        // Handle error and display a toast notification
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }
}
