import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { NotificationComponent } from '../admin-home/notification/notification.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    pathMatch:'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
