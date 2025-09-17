import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { EmergencyRequestsComponent } from './components/emergency-requests/emergency-requests.component';
import { EmergencyOfficerComponent } from './components/emergency-officer/emergency-officer.component';
import { OperatorDetailsComponent } from './components/operator-details/operator-details.component';

const routes: Routes = [
  {
    path: ComponentsRoutes.EMERGENCY_REQUESTS,
    component: EmergencyRequestsComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.LIST_OF_EMERGENCY_OPERATORS,
    component: EmergencyOfficerComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.OPERATOR_DETAILS + "/:operatorId",
    component: OperatorDetailsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyRoutingModule { }
