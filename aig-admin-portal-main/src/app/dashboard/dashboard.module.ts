import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ActivityOverviewCountComponent } from './components/activity-overview-count/activity-overview-count.component';
import { VerificationRequestsComponent } from './components/verification-requests/verification-requests.component';
import { UsersGraphComponent } from './components/users-graph/users-graph.component';
import { AddressManagementComponent } from './components/address-management/address-management.component';
import { ApiUrlsComponent } from './components/api-urls/api-urls.component';
import { TopVerificationOfficersComponent } from './components/top-verification-officers/top-verification-officers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    ActivityOverviewCountComponent,
    VerificationRequestsComponent,
    UsersGraphComponent,
    AddressManagementComponent,
    ApiUrlsComponent,
    TopVerificationOfficersComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgApexchartsModule
  ],
  exports : [
    DashboardComponent
  ]
})
export class DashboardModule { }
