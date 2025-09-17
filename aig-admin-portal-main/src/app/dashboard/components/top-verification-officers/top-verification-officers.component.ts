import { Component, OnInit } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/models/column-config';
import { PageRequest } from 'src/app/shared/models/page-request';
import { TableConfig } from 'src/app/shared/models/table-config';
import { DashboardService } from '../../services/dashboard.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { VerificationOfficer } from '../../payload/verification-officer';
import { Router } from '@angular/router';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';

/**
 * Component for displaying the top verification officers on the dashboard.
 */
@Component({
  selector: 'app-top-verification-officers',
  templateUrl: './top-verification-officers.component.html',
  styleUrls: ['./top-verification-officers.component.scss'],
})
export class TopVerificationOfficersComponent implements OnInit {
  /** Page request object for pagination */
  pageRequest = new PageRequest();

  /** List of top verification officers */
  topVerificationOfficers: VerificationOfficer[] = [];
  defaultImage= AppUtil.DEFAULT_IMAGE;

  /**
   * Constructor to inject the DashboardService.
   * @param dashBoardService - The service for retrieving dashboard-related data.
   */
  constructor(private dashBoardService: DashboardService,private router:Router) {}

  /**
   * Lifecycle hook - OnInit
   * This method is called once the component is initialized.
   * It triggers the initial loading of top verification officers.
   */
  ngOnInit(): void {
    this.getTopVerificationOfficers();
  }

  /**
   * Fetches the top verification officers based on the current page request.
   */
  public getTopVerificationOfficers(): void {
    // Set the page size for the request
    this.pageRequest.pageSize = 15;

    // Call the service to get the top verification officers
    this.dashBoardService.getTopVerificationOfficers(this.pageRequest).subscribe({
      next: (res: any) => {
        // Update the list of top verification officers with the received data
        this.topVerificationOfficers = res.data;
      },
      error: (err: any) => {
        // Handle error and display a toast notification
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
  }

  public navigateToComponent(userId:number){
    this.router.navigate([ComponentsRoutes.ADMIN_HOME+'/'+ComponentsRoutes.VERI_OFFI_DETAILS_BASE+'/'+userId]);
  }
}
