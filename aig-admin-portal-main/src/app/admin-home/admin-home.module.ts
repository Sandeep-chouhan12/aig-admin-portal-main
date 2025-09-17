import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    HomeComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    SharedModule
  ]
})
export class AdminHomeModule { }
