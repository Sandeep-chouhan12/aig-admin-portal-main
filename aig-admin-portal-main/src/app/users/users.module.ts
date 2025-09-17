import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserTransactionComponent } from './components/user-transaction/user-transaction.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { UserAnalyticsComponent } from './components/user-analytics/user-analytics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AddressDetailsComponent } from './components/address-details/address-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserTransactionComponent,
    UserAddressComponent,
    UserAnalyticsComponent,
    AddressDetailsComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    UserListComponent,
    UserAddressComponent,
  ]
})
export class UsersModule { }
