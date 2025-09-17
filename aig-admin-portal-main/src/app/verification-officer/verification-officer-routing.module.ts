import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { VerificationOfficerComponent } from './components/verification-officer/verification-officer.component';
import { AddressVerificationRequestsComponent } from './components/address-verification-requests/address-verification-requests.component';
import { VerificationOfficerDetailsComponent } from './components/verification-officer-details/verification-officer-details.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

const routes: Routes = [
  {
    path:ComponentsRoutes.VERIFICATION_OFFICER_LIST,
    component:VerificationOfficerComponent,
    pathMatch:'full'
  },
  {
    path:ComponentsRoutes.VERI_OFFI_ADDRESS_VERIFICATION_REQ,
    component:AddressVerificationRequestsComponent,
    pathMatch:'full'
  },
  {
    path:ComponentsRoutes.VERI_OFFI_ANALYTICS,
    component:AnalyticsComponent,
    pathMatch:'full'
  },
  {
    path:ComponentsRoutes.VERI_OFFI_DETAILS +"/:officerId",
    component:VerificationOfficerDetailsComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationOfficerRoutingModule { }
