import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { AddressTypeComponent } from './address-type/address-type.component';
import { GeneralSuggestionComponent } from './general-suggestion/general-suggestion.component';
import { AvtarComponent } from './avtar/avtar.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FAQsComponent } from './faqs/faqs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddFaqComponent } from './Faq/add-faq/add-faq.component';
import { NgxEditorModule } from "ngx-editor";

@NgModule({
  declarations: [
    AddressTypeComponent,
    GeneralSuggestionComponent,
    AvtarComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    FAQsComponent,
    AddFaqComponent,
    
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgxEditorModule

  ]
})
export class ConfigurationsModule { }