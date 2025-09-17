import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationOfficerRoutingModule } from './verification-officer-routing.module';
import { AddressVerificationRequestsComponent } from './components/address-verification-requests/address-verification-requests.component';
import { VerificationOfficerComponent } from './components/verification-officer/verification-officer.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { VerificationOfficerDetailsComponent } from './components/verification-officer-details/verification-officer-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddressVerificationRequestsComponent,
    VerificationOfficerComponent,
    AnalyticsComponent,
    VerificationOfficerDetailsComponent
  ],
  imports: [
    CommonModule,
    VerificationOfficerRoutingModule,
    SharedModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class VerificationOfficerModule { }
