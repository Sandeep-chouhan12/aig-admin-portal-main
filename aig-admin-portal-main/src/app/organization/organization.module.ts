
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { RepresentativeComponent } from './components/representative/representative.component';
import { AddGovernmnetOrganizationComponent } from './components/add-governmnet-organization/add-governmnet-organization.component';
import { AddPrivateOrganizationComponent } from './components/add-private-organization/add-private-organization.component';
import { PrivateOrganizationDetailsComponent } from './components/private-organization-details/private-organization-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrivateOrganizationProfileComponent } from './components/private-organization-profile/private-organization-profile.component';
import { GovernmentOrganizationProfileComponent } from './components/government-organization-profile/government-organization-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ReportApiGraphChartComponent } from './components/report-api-graph-chart/report-api-graph-chart.component';
import { ReportApiBarChartComponent } from './components/report-api-bar-chart/report-api-bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { ApiRequestChartComponent } from './components/api-request-chart/api-request-chart.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ApiUserDetailsComponent } from './components/api-user-details/api-user-details.component';
import { FaqComponent } from './components/faq/faq.component';
import { PartnersComponent } from './components/partners/partners.component';
import { PlansComponent } from './components/plans/plans.component';
import { SupportComponent } from './components/support/support.component';
import { UsersComponent } from './components/users/users.component';
import { NgxEditorComponent, NgxEditorModule } from 'ngx-editor';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';



@NgModule({
  declarations: [
    RepresentativeComponent,
    AddGovernmnetOrganizationComponent,
    AddPrivateOrganizationComponent,
    PrivateOrganizationDetailsComponent,
    PrivateOrganizationProfileComponent,
    GovernmentOrganizationProfileComponent,
    ReportApiGraphChartComponent,
    ReportApiBarChartComponent,
    OrganizationDetailsComponent,
    TransactionChartComponent,
    ApiRequestChartComponent,
    UsersComponent,
    PartnersComponent,
    PlansComponent,
    AnalyticsComponent,
    ApiUserDetailsComponent,
    SupportComponent,
    FaqComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationRoutingModule,
    SharedModule,
    NgApexchartsModule,
    NgxEditorModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrganizationModule { }