import { Component, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/shared/models/modal-config';
import { TableConfig } from 'src/app/shared/models/table-config';
import { PageRequest } from 'src/app/shared/models/page-request';
import { EmergencyService } from '../../service/emergency.service';
import { Emergency } from '../../models/emergency';
import { EmergencyRequestHistoryResponse } from '../../payload/emergency-request-history-response';
import { EmergencyOfficerResponse } from '../../payload/emergency-officer-response';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Router } from '@angular/router';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { RequestStatus } from 'src/app/organization/models/request-status';
import { PageStateService } from 'src/app/shared/services/page-state.service';
import { Constants } from 'src/app/shared/utils/constants';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';

@Component({
  selector: 'app-emergency-requests',
  templateUrl: './emergency-requests.component.html',
  styleUrls: ['./emergency-requests.component.scss'],
})
export class EmergencyRequestsComponent implements OnInit {

  pageRequest = new PageRequest();
  pagination = new PaginationManager();
  emergencyId!: number;
  emergencyRequests: EmergencyRequestHistoryResponse[] = [];
  emergencyRequestHistoryResponse = new EmergencyRequestHistoryResponse();
  isDataLoaded!: boolean;
  constant = Constants


  sortIsActive: RequestStatus = RequestStatus.All;

  sortStatus = RequestStatus;

  componentRoutes = ComponentsRoutes;
  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  constructor(private emerencyService: EmergencyService, public loaderService: LoaderService, private router: Router, private pageState: PageStateService) { }

  ngOnInit(): void {
    this.pageRequest.pageNo = this.getPageState();

    this.getAllEmergencyServiceHistory()
  }

  public getAllEmergencyServiceHistory() {
    this.emerencyService.getAllEmergencyServiceHistory(this.pageRequest, this.sortIsActive).subscribe({
      next: (data: any) => {
        this.emergencyRequests = (data.historyData.content || []).map((data: any) => ({
          ...data,
          expanded: false
        }));

        this.pagination.setPageData(data.historyData)
        this.isDataLoaded = true
        this.setPageState(this.pageRequest.pageNo)
      },
      error: (er: any) => {
      }
    })
  }

  public deleteEmergencyHistory() {
    this.emerencyService.deleteEmergencyServiceHistory(this.emergencyId).subscribe({
      next: (data: any) => {
        this.getAllEmergencyServiceHistory();
        AppUtil.openToast('success', data.message, 'Success')
        AppUtil.modalDismiss('delete-modal-close')
      },
      error: (er: any) => {

      }
    })
  }

  public setEmergencyRequestHistoryResponse(data: any) {
    this.emergencyRequestHistoryResponse = { ...data }
  }

  public navigateToComponent(path: any) {
    this.router.navigate([path])
  }


  public sortByStatus(status: RequestStatus) {
    switch (status) {
      case RequestStatus.All:
        this.sortIsActive = RequestStatus.PENDING;
        break;

      case RequestStatus.PENDING:
        this.sortIsActive = RequestStatus.RESOLVED;
        break;

      case RequestStatus.RESOLVED:
        this.sortIsActive = RequestStatus.All;
    }

    this.getAllEmergencyServiceHistory();
  }

  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
  }


  id: any
  setId(planId: any) {
    if (planId == this.id) {
      this.id = 0;
    } else {
      this.id = planId;
    }
  }

}
