import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CommonDataTableComponent } from './components/common-data-table/common-data-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SomethingWentWrongComponent } from './components/something-went-wrong/something-went-wrong.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { TextFormatterPipe } from './pipes/text-formatter.pipe';
import { PdfgeneratorComponent } from './components/pdfgenerator/pdfgenerator.component';
import { HasPermissionDirective } from './components/Direcitves/has-permission.directive';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "transparent",
  "bgsOpacity": 0,
  "bgsPosition": "bottom-right",
  "bgsSize": 0,
  "bgsType": "ball-scale-multiple",
  "blur": 0,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#164da0",
  "fgsPosition": "center-center",
  "fgsSize": 50, // larger than logo to go around it
  "fgsType": "ball-scale-multiple",
  "gap": 8,
  "logoPosition": "center-center",
  "logoSize": 60, // smaller than fgsSize
  "logoUrl": "assets/images/svg_img/mini-logo.svg",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(236, 231, 231, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    CommonDataTableComponent,
    PaginationComponent,
    DeleteModalComponent,
    NotFoundComponent,
    SomethingWentWrongComponent,
    NumberFormatPipe,
    TextFormatterPipe,
    PdfgeneratorComponent,
    HasPermissionDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
  
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    CommonDataTableComponent,
    PaginationComponent,
    DeleteModalComponent,
    NotFoundComponent,
    SomethingWentWrongComponent,
    NumberFormatPipe,
    NgxUiLoaderModule,
    TextFormatterPipe,
    PdfgeneratorComponent,
    HasPermissionDirective,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class SharedModule { }