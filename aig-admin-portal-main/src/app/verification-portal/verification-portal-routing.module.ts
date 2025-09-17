import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { VerificationPortalComponent } from './components/verification-portal/verification-portal.component';

const routes: Routes = [
  {
    path: '',
    component:VerificationPortalComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationPortalRoutingModule { }
