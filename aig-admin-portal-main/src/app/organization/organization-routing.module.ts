import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentativeComponent } from './components/representative/representative.component';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { AddPrivateOrganizationComponent } from './components/add-private-organization/add-private-organization.component';
import { AddGovernmnetOrganizationComponent } from './components/add-governmnet-organization/add-governmnet-organization.component';
import { PermissionGuard } from '../shared/guards/permission.guard';
import { PermissionTitle } from '../shared/models/permission-title';
import { PermissionType } from '../shared/models/permission-type';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { ApiUserDetailsComponent } from './components/api-user-details/api-user-details.component';
import { FaqComponent } from './components/faq/faq.component';
import { PartnersComponent } from './components/partners/partners.component';
import { PlansComponent } from './components/plans/plans.component';
import { SupportComponent } from './components/support/support.component';
import { UsersComponent } from './components/users/users.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: ComponentsRoutes.REPRESENTATIVE_DETAILS },
  { path: ComponentsRoutes.REPRESENTATIVE_DETAILS, component: RepresentativeComponent },
  {
    path: ComponentsRoutes.ADD_PRIVATE_ORGANIZATION, pathMatch: 'full', component: AddPrivateOrganizationComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionTitle: PermissionTitle.ORGANIZATIONS,
      accessType: PermissionType.CREATE
    },
  },
  {
    path: ComponentsRoutes.ADD_GOVERNMENT_ORGANIZATION, component: AddGovernmnetOrganizationComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionTitle: PermissionTitle.ORGANIZATIONS,
      accessType: PermissionType.CREATE
    },
  },
  {
    path: ComponentsRoutes.UPDATE_GOVERNMENT_ORGANIZATION, component: AddGovernmnetOrganizationComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionTitle: PermissionTitle.ORGANIZATIONS,
      accessType: PermissionType.UPDATE
    },
  },
  {
    path: ComponentsRoutes.UPDATE_PRIVATE_ORGANIZATION, component: AddPrivateOrganizationComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionTitle: PermissionTitle.ORGANIZATIONS,
      accessType: PermissionType.UPDATE
    },
  },
  // { path: ComponentsRoutes.GOVERNMENT_ORGANIZATION_DETAILS, component: GovernmentOrganizationDetailsComponent },
  { path: ComponentsRoutes.ORGANIZATION_DETAILS, component: OrganizationDetailsComponent },
  {
    path: ComponentsRoutes.API_DOC_USERS,
    component: UsersComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.API_DOC_PARTNERS,
    component: PartnersComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.API_DOC_PLANS,
    component: PlansComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.API_DOC_ANALYTICS,
    component: AnalyticsComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.API_DOC_USERS_DETAILS + '/:userId',
    component: ApiUserDetailsComponent,
    pathMatch: 'full'
  }, {
    path: ComponentsRoutes.API_DOC_SUPPORT,
    component: SupportComponent,
    pathMatch: 'full'
  }, {
    path: ComponentsRoutes.API_DOC_FAQ,
    component: FaqComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.ORGANIZATION_TERMS_AND_CONDITIONS,
    component: TermsConditionsComponent,
  },
  {
    path: ComponentsRoutes.ORGANIZATION_PRIVACY_POLICY,
    component: PrivacyPolicyComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
