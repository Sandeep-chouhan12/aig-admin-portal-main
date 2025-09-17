import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { AddressTypeComponent } from './address-type/address-type.component';
import { GeneralSuggestionComponent } from './general-suggestion/general-suggestion.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AvtarComponent } from './avtar/avtar.component';
import { FAQsComponent } from './faqs/faqs.component';
import { AddFaqComponent } from './Faq/add-faq/add-faq.component';
import { PermissionGuard } from '../shared/guards/permission.guard';
import { PermissionTitle } from '../shared/models/permission-title';
import { PermissionType } from '../shared/models/permission-type';

const routes: Routes = [

  {
    path: '',
    component: AddressTypeComponent,
    pathMatch: 'full'
  },
  {
    path: ComponentsRoutes.ADDRESS_TYPE,
    component: AddressTypeComponent,
  },
  {
    path: ComponentsRoutes.PRIVACY_POLICY,
    component: PrivacyPolicyComponent,
  },
  {
    path: ComponentsRoutes.GENERAL_SUGGESTION,
    component: GeneralSuggestionComponent,
  },
  {
    path: ComponentsRoutes.AVATAR,
    component: AvtarComponent,
  },
  {
    path: ComponentsRoutes.TERMS_AND_CONDITIONS,
    component: TermsConditionsComponent,
  },
  {
    path: ComponentsRoutes.FAQ,
    component: FAQsComponent,
  },
  {
    path: ComponentsRoutes.ADD_FAQ,
    canActivate: [PermissionGuard],
    data: {
      permissionTitle: PermissionTitle.CONFIGURATIONS,
      accessType: PermissionType.CREATE
    },
    component: AddFaqComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }