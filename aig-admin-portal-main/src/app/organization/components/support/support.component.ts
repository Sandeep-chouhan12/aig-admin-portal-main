import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';
import { Support } from '../../models/support';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';

interface SupportWithExpanded extends Support {
  expanded: boolean;
}
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {


  supportList: Support[] = [];
  pageRequest: PageRequest = new PageRequest();
  pagination!: PaginationManager
  supportId: number = 0;
  constant = Constants;
  id: any;
  permissionType=PermissionType
  permissionTitle=PermissionTitle

  ngOnInit(): void {
    this.getSupports();
  }

  constructor(private supportService: SupportService, public loaderService: LoaderService) { }

  public getSupports(): void {
    this.supportService.getSupports(this.pageRequest).subscribe({
      next: (data: any) => {
        this.supportList = (data.support || []).map((item: Support) => ({
          ...item,
          expanded: false
        }));
      },
      error: (error: any) => {
        console.error('Error fetching supports:', error);
      }
    });
  }

  public deleteSupport() {
    this.toggleLoader();
    this.supportService.deleteSupport(this.supportId).subscribe({
      next: (data: any) => {
        this.toggleLoader();
        this.getSupports();
        AppUtil.openToast('success', data.message, 'Success')
        AppUtil.modalDismiss('delete-modal-close');
      },
      error: (er: any) => {
        this.toggleLoader();
        AppUtil.openToast('error', er.error.message, 'Error')
      }
    })

  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }

  setId(supportId: any) {
    if (supportId == this.id) {
      this.id = 0;
    } else {
      this.id = supportId;
    }
  }
}
