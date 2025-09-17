import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { OperatorService } from '../../service/operator.service';
import { EmergencyOfficerResponse } from '../../payload/emergency-officer-response';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { EmergencyRequestHistoryResponse } from '../../payload/emergency-request-history-response';
import { AppUtil } from 'src/app/shared/utils/app-util';

@Component({
  selector: 'app-operator-details',
  templateUrl: './operator-details.component.html',
  styleUrls: ['./operator-details.component.scss'],
})
export class OperatorDetailsComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private emergencyOperatorService: OperatorService
  ) {}

  operatorId = 0;
  officer = new EmergencyOfficerResponse();
  totalEmergencyRequest: EmergencyRequestHistoryResponse[] = [];

  totalEmergencyPendingRequest: EmergencyRequestHistoryResponse[] = [];
  totalEmergencyResolvedRequest: EmergencyRequestHistoryResponse[] = [];
  status: any;
  appUtils = AppUtil;
  emergencyId: number = 0;

  // for total request
  totalPageRequest = new PageRequest();
  totalPagination = new PaginationManager();

  // for pending request
  pendingPageRequest = new PageRequest();
  pendingPagination = new PaginationManager();

  // for resolved status
  resolvedPageRequest = new PageRequest();
  resolvedPagination = new PaginationManager();

  ngOnInit(): void {
    this.hideSideNav(true);
    this.activatedRoute.params.subscribe((param: any) => {
      this.operatorId = param['operatorId'];
    });
    this.getAllEmergencyOperatorDetails();
  }

  ngOnDestroy(): void {
    this.hideSideNav(false);
  }

  hideSideNav(isOn: boolean) {
    this.sharedService.hideSideNav.next(isOn);
  }

  getAllEmergencyOperatorDetails() {
    this.emergencyOperatorService
      .getEmergencyOperatorDetailsById(this.operatorId)
      .subscribe({
        next: (data: any) => {
          this.officer = data.officer;
          this.emergencyId = this.officer.emergencyService.id;
          setTimeout(() => {
            this.getTotalEmergencyRequest();
            this.getTotalEmergencyPendingRequest();
            this.getTotalEmergencyResolvedRequest();
          }, 500);
        },
        error: (er: any) => {},
      });
  }

  getTotalEmergencyRequest() {
    this.status = 'All';
    this.emergencyOperatorService
      .getTotalEmergencyOperatorRequest(
        this.totalPageRequest,
        this.emergencyId,
        this.status
      )
      .subscribe({
        next: (data: any) => {
          this.totalEmergencyRequest = data.content;
          this.totalPagination.setPageData(data);
        },
        error: (er: any) => {},
      });
  }

  getTotalEmergencyPendingRequest() {
    this.status = 'Pending';
    this.emergencyOperatorService
      .getTotalEmergencyOperatorRequest(
        this.pendingPageRequest,
        this.emergencyId,
        this.status
      )
      .subscribe({
        next: (data: any) => {
          this.totalEmergencyPendingRequest = data.content;
          this.pendingPagination.setPageData(data);
        },
        error: (er: any) => {},
      });
  }

  getTotalEmergencyResolvedRequest() {
    this.status = 'Resolved';
    this.emergencyOperatorService
      .getTotalEmergencyOperatorRequest(
        this.pendingPageRequest,
        this.emergencyId,
        this.status
      )
      .subscribe({
        next: (data: any) => {
          this.totalEmergencyResolvedRequest = data.content;
          this.resolvedPagination.setPageData(data);
        },
        error: (er: any) => {},
      });
  }
}
