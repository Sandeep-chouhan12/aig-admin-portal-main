import { Component, OnInit } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/models/column-config';
import { TableConfig } from 'src/app/shared/models/table-config';
import { ModalConfig } from 'src/app/shared/models/modal-config';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { AppUtil } from 'src/app/shared/utils/app-util';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { UserStatusChangeRequest } from '../../payloads/user-status-change-request';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SortStatus } from '../../models/sort-status';
import { PageStateService } from 'src/app/shared/services/page-state.service';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  appUtils = AppUtil;

  sortIsActive: SortStatus = SortStatus.ALL;

  sortStatus = SortStatus;

  // Routing configuration
  componentRoutes = ComponentsRoutes;

  // User deletion identifier
  deleteId = 0;

  constructor(
    private usersService: UsersService,
    private router: Router,
    public loaderService: LoaderService,
    private pageState: PageStateService
  ) { }

  // Pagination configuration
    paginationManager: PaginationManager = new PaginationManager();

  pageRequest: PageRequest = new PageRequest();

  // List of users
  userList: User[] = [];

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  ngOnInit(): void {
    // Set default page size
    this.pageRequest.pageSize = 10;
    // Fetch initial user list
    this.pageRequest.pageNo = this.getPageState();
    this.getAllUsers();
  }

  // Get all users with pagination
  getAllUsers(pageRequest: PageRequest = this.pageRequest) {
    this.pageRequest = pageRequest;
    this.usersService
      .getUserList(this.pageRequest, this.sortIsActive)
      .subscribe({
        next: (data: any) => {
          this.paginationManager.setPageData(data.users);
          this.userList = data.users.content;
          this.setPageState(this.pageRequest.pageNo)
          // this.userList = data.users.content;
          // this.paginationManager.setPageData(data.users);
          // this.pageRequest.pageNo = data.users.pageable.pageNumber;
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
  }

  // Update user active status
  public updateUserStatus(user: User) {
    let updateStatusRequest = new UserStatusChangeRequest();
    updateStatusRequest.isActive = !user.isActive;
    updateStatusRequest.userId = user.userId;
    this.usersService.updateActiveStatus(updateStatusRequest).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success');
      },
      error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
  }

  // Delete user by ID
  public deleteUserById() {
    if (this.deleteId && this.deleteId != 0) {
      this.usersService.deleteUserById(this.deleteId).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          this.deleteId = 0;
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
          this.deleteId = 0;
          AppUtil.modalDismiss('close-delete-user');
        },
        complete: () => {
          AppUtil.modalDismiss('close-delete-user');
          this.getAllUsers();
        },
      });
    }
  }

  // Navigate to specified path
  navigate(path: string) {
    this.router.navigate(['Admin/' + path]);
  }

  public sortByStatus(status: SortStatus) {
    switch (status) {
      case SortStatus.ALL:
        this.sortIsActive = SortStatus.ACTIVE;
        break;

      case SortStatus.ACTIVE:
        this.sortIsActive = SortStatus.IN_ACTIVE;
        break;

      case SortStatus.IN_ACTIVE:
        this.sortIsActive = SortStatus.ALL;
    }

    this.getAllUsers();
  }


  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
  }
}
