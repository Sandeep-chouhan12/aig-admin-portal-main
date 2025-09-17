import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApiUsersService } from '../../services/api-users.service';
import { UserResponse } from '../../models/user-response';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { ApiKeyResponse } from '../../payloads/api-key-response';
import { ApiTransactionService } from '../../services/api-transaction.service';
import { ApiTransaction } from '../../payloads/api-transaction';
import { PhysicalAddressVerification } from '../../models/physical-address-verification';
import { RequestStatus } from '../../models/request-status';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TextFormatterPipe } from 'src/app/shared/pipes/text-formatter.pipe';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-api-user-details',
  templateUrl: './api-user-details.component.html',
  styleUrls: ['./api-user-details.component.scss'],
  providers: [TextFormatterPipe]
})
export class ApiUserDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  userId = 0;
  userDetail = new UserResponse();
  ApiKeyPageReqeust = new PageRequest();
  ApiKeyPagePagination = new PaginationManager();

  transactionPageRequest = new PageRequest();
  transactionPagination = new PaginationManager();
  apiKeys: ApiKeyResponse[] = [];
  transactions: ApiTransaction[] = [];
  lastSevenRequest: number = 0;
  LifeTimeRequest: number = 0;
  todaysRequest: number = 0;
  reamainingRequest: number = 0;
  personalInformationDocumentType!: boolean;
  BusinessVerificationDocumentType!: boolean;
  physicalAddressType = PhysicalAddressVerification;
  appUtil = AppUtil;
  requestStatus!: boolean;
  componentsRoutes = ComponentsRoutes;

  personalPhysicalAddressImage = AppUtil.FILE_ICON_SVG;
  businessPhysicalAddressImage = AppUtil.FILE_ICON_SVG;
  constant = Constants

  constructor(
    private router: Router,
    private apiTransactionServic: ApiTransactionService,
    private apiService: ApiUsersService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private apiUserService: ApiUsersService,
    public loaderService: LoaderService
  ) { }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.hideSideNav(true);
    this.activatedRoute.params.subscribe((param: any) => {
      this.userId = param['userId'];
      // alert(this.userId)
    });
    this.getApiUserById();
  }

  ngOnDestroy(): void {
    this.hideSideNav(false);
  }

  hideSideNav(isOn: boolean) {
    this.sharedService.hideSideNav.next(isOn);
  }

  public getApiUserById() {
    this.apiUserService.getApiUserById(this.userId).subscribe({
      next: (data: any) => {
        this.userDetail = data.user;
        this.todaysRequest = data.todaysRequest;
        this.lastSevenRequest = data.lastSevenRequest;
        this.LifeTimeRequest = data.LifeTimeRequest;
        this.reamainingRequest = data.reamainingRequest;

        if (this.userDetail.personalInformationResponse)
          this.personalInformationDocumentType = this.appUtil.isImageByName(
            this.userDetail.personalInformationResponse
              .userPhysicalAddressDetail
          );
        if (this.userDetail.businessInformationResponse)
          this.BusinessVerificationDocumentType = this.appUtil.isImageByName(
            this.userDetail.businessInformationResponse
              .businessPhysicalAddressDetail
          );

        if (data.user.requestStatus == RequestStatus.RESOLVED) {
          this.getUserApiKeys();
          this.getAllTransaction();
          this.requestStatus = true;
        }
      },

      error: (er: any) => { },
    });
  }

  public changeStatus() {
    this.userDetail.isActive = !this.userDetail.isActive;
    this.apiService.changeUserApiRequestStatus(this.userId).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success');
        this.getApiUserById();
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error');
      },
    });
  }

  public getUserApiKeys() {
    this.apiService
      .getUserApiKeys(this.userId, this.ApiKeyPageReqeust)
      .subscribe({
        next: (data: any) => {
          this.apiKeys = data.content;
          this.ApiKeyPagePagination.setPageData(data);
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
        },
      });
  }

  public getAllTransaction() {
    this.apiTransactionServic
      .getAllTransaction(this.userId, this.transactionPageRequest)
      .subscribe({
        next: (data: any) => {
          this.transactions = data.transactions.content;
          this.transactionPagination.setPageData(data.transactions);
        },
        error: (er: any) => { },
      });
  }

  public navigateToComponent() {
    this.router.navigate([this.componentsRoutes.ADMIN_HOME + '/' + this.componentsRoutes.API_DOC_PLANS_BASE])
  }
}
