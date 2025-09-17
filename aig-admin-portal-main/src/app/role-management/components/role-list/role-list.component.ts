import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/organization/payloads/OrganizationUserResponse';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { RoleServiceService } from '../../Service/role-service.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { TitleStrategy } from '@angular/router';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Constants } from 'src/app/shared/utils/constants';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
  componentRoute = ComponentsRoutes


  componentRoutes = ComponentsRoutes;


  roles: Role[] = [];
  page: PageRequest = { pageNo: 0, pageSize: 10 };
  roleForm: FormGroup; totalElements: number = 0;
  roleId: number = 0;
  paginationManager: PaginationManager = new PaginationManager();
  permissionTitle = PermissionTitle;
  permissionType = PermissionType;
  constants = Constants
  constructor(private fb: FormBuilder, private roleService: RoleServiceService, private sharedService: SharedService, public loaderService: LoaderService) {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      roleId: ['']
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
    this.sharedService.hideSideNav.next(false);
  }

  clearForm() {
    this.roleForm.reset();
    this.isEditeMode = false;
  }

  fetchRoles(): void {
    this.roleService.getAllRoles(this.page, this.sortByStatus, false).subscribe(res => {
      this.roles = res.response.content;
      this.totalElements = res.totalElements;
      this.paginationManager.setPageData(res.response);
      this.page.pageNo = res.response.pageable.pageNumber;
    });
  }
  deleteRole(): void {
    this.enableLoading();
    this.roleId > 0 && this.roleService.deleteRole(this.roleId).subscribe((data: any) => {
      if (this.roles.length == 1 && this.page.pageNo > 0) {
        this.page.pageNo = this.page.pageNo - 1
      }
      this.fetchRoles();
      this.closeModel('delet_model_close')
      AppUtil.openToast('success', data.message, 'Success')
      this.disableLoading();
    },
      error => {
        this.disableLoading();
        this.closeModel('delet_model_close')
        AppUtil.openToast('error', error.error.message, 'Error')
      }

    );
  }

  setRoleId(roleId: number): void {
    this.roleId = roleId
  }

  updateStatus(role: Role): void {

    let status = !role.isActive;
    this.roleService.updateRoleStatus(role.roleId).subscribe((data: any) => {
      AppUtil.openToast('success', data.message, 'Success')
    },
      error => {
        AppUtil.openToast('error', error.error.message, 'Error');
        role.isActive = status; // Revert the status change on error
      }
    );
  }

  setRole(role: Role | undefined) {
    this.clearForm();
    if (role) {
      this.roleForm.patchValue({
        roleName: role.roleName,
        roleId: role.roleId
      })
      this.isEditeMode = true;
    } else {
      return;
    }
  }


  isEditeMode: boolean = false;
  isLoading: boolean = false


  onSubmitte() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    this.enableLoading()
    const request = this.roleForm.value;
    let method = this.isEditeMode ? this.roleService.updateRole(request.roleId, { roleName: request.roleName }) : this.roleService.addRole(request);
    method.subscribe({
      next: (data: any) => {

        this.roleForm.reset();
        // Close modal using Bootstrap JS
        this.closeModel('model_close');
        this.fetchRoles();
        AppUtil.openToast('success', data.message, 'Success');
        this.disableLoading();
      },
      error: err => {
        this.disableLoading();
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }

  public closeModel(id: string) {
    document.getElementById(id)?.click();
  }

  // sort data by status all, by true, by false

  currentSortIndex: number = 0
  sortIsActiveOrder: any = [true, false, null]
  sortByStatus: any = null;

  setSortStatus() {
    this.sortByStatus = this.sortIsActiveOrder[this.currentSortIndex];
    if (this.currentSortIndex == 2) {
      this.currentSortIndex = 0;
    } else {
      this.currentSortIndex++;
    }
    this.fetchRoles();
  }

  enableLoading() {
    this.isLoading = true;
  }
  disableLoading() {
    this.isLoading = false;
  }
}
