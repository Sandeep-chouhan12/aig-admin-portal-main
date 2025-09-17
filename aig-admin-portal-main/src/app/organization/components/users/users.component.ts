import { AfterViewInit, Component, OnInit } from '@angular/core';
import { apiUserTabCol } from '../../models/api-users';
import { ModalConfig } from 'src/app/shared/models/modal-config';
import { TableConfig } from 'src/app/shared/models/table-config';
import { ApiUsersService } from '../../services/api-users.service';
import { UserResponse } from '../../models/user-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PageRequest } from 'src/app/shared/models/page-request';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { SortStatus } from 'src/app/users/models/sort-status';
import { PageStateService } from 'src/app/shared/services/page-state.service';
import { PermissionManagementService } from 'src/app/shared/services/permission-management.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  sortIsActive: SortStatus = SortStatus.ALL;

  sortStatus = SortStatus;

  users: UserResponse[] = [];
  deleteId: any;
  userForm!: FormGroup;
  updateUserForm!: FormGroup
  user = new UserResponse();
  appUtil = AppUtil;

  paginationManager: PaginationManager = new PaginationManager();
  pageRequest: PageRequest = new PageRequest();
  selectedImage: any = AppUtil.DEFAULT_IMAGE
  constant = Constants


  constructor(private apiService: ApiUsersService, private formBuilder: FormBuilder, public loaderService: LoaderService, private pageState: PageStateService) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailAddres: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      lastName: ['', [Validators.required], [FormsValidator.nameValidator()]],
    })
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.pageRequest.pageNo = this.getPageState();
    this.getAllApiUsers();
  }



  public getAllApiUsers() {
    this.apiService.getAllApiUsers(this.pageRequest, this.sortIsActive).subscribe({
      next: (data: any) => {
        this.users = data.data.content;
        this.paginationManager.setPageData(data.data);
        this.setPageState(this.pageRequest.pageNo)
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error')
      }
    })
  }

  public deleteApiUser() {
    this.toggleLoader()
    this.apiService.deleteUser(this.deleteId).subscribe({
      next: (data: any) => {
        this.getAllApiUsers();
        AppUtil.modalDismiss('delete-modal-close')
        AppUtil.openToast('success', data.message, 'Success');
        this.toggleLoader()
      },
      error: (er: any) => {
        this.toggleLoader();
        AppUtil.openToast('error', er.error.message, 'Error');
      }
    })
  }

  public changeStatus(user: UserResponse) {
    user.isActive = !user.isActive
    this.apiService.changeUserApiRequestStatus(user.id).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success')
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error')
      }
    })
  }

  public updateUser() {
    if (this.updateUserForm.valid) {
      this.toggleLoader()
      this.apiService.updateUser(this.user).subscribe({
        next: (data: any) => {
          AppUtil.modalDismiss('modal');
          this.getAllApiUsers();
          AppUtil.openToast('success', data.message, 'Success');
          this.resetForm();
          this.toggleLoader()
        },
        error: (er: any) => {
          this.toggleLoader()
          AppUtil.openToast('error', er.error.message, 'Error')
        }
      })
    } else {
      AppUtil.checkFormValidOrNot(this.updateUserForm);
      return;
    }
  }

  setUserImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.user.profilePicture = file;
      this.selectedImage = URL.createObjectURL(file);
    }
  }

  public setUserData(data: UserResponse) {
    this.resetForm();
    this.selectedImage = data.profilePicture;
    this.user = JSON.parse(JSON.stringify(data)) as UserResponse;
  }
  public resetForm() {
    this.userForm.reset();
  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
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

    this.getAllApiUsers();
  }


  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
  }
}
