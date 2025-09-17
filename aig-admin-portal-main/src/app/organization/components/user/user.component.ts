import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiUserTransaction } from 'src/app/organization/models/api-user-transaction';
import { OrganizationResponse } from 'src/app/organization/models/OrganizationResponse';
import { ApiEndpointsResponse } from 'src/app/organization/payloads/api-endpoints-response';
import { GovernmentOrganizationDetailResponse } from 'src/app/organization/payloads/GovernmentOrganizationDetailResponse';
import { OrganizatinUserRequest } from 'src/app/organization/payloads/organizationUserRequest';
import { OrganizationUserResponse, Role } from 'src/app/organization/payloads/OrganizationUserResponse';
import { UpdateOrganizatinUserRequest } from 'src/app/organization/payloads/updateOrganizationUserRequest';
import { UpdateUserStatusRequest } from 'src/app/organization/payloads/UpdateUserStatusRequest';
import { areaChartConfig } from 'src/app/shared/charts/areaChartConfig';

import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user: OrganizationResponse = new OrganizationResponse();
  updateUserStatusRequest: UpdateUserStatusRequest = new UpdateUserStatusRequest();
  governmentOrganizationDetailResponse: GovernmentOrganizationDetailResponse = new GovernmentOrganizationDetailResponse();
  pageRequest: PageRequest = new PageRequest();
  organizationUserResponse: OrganizationUserResponse[] = [];
  userId: string = '';
  userType: string = '';
  organizationDetails: any;
  subscription: Subscription = new Subscription();
  transactionList: ApiUserTransaction[] = [];
  form!: FormGroup;
  isEditMode = false;
  selectedUserId = '';
  selectedProfilePic: File | null = null;
  selectedProfileFile: File | null = null;  // actual file
  updateOrganizatinUserRequest: UpdateOrganizatinUserRequest = new UpdateOrganizatinUserRequest();
  organizatinUserRequest: OrganizatinUserRequest = new OrganizatinUserRequest();
  selectedRoleName: any = '';
  selectedRoleId: string = '';
  endpoints: ApiEndpointsResponse[] = [];
  paginationManager: PaginationManager = new PaginationManager();
  appUtils = AppUtil
  userPicUrl: any;
  selectedFile: File | null = null;

  constructor(private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private userService: UsersService,
    private fb: FormBuilder, public loaderService: LoaderService) {
    sharedService.hideSideNav.next(true);
    sharedService.setTitle('Organization Details')

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.userType = params['type'];

      if (this.userId && this.userType) {
        this.getUserByType(this.userId, this.userType);
      }
    });
    this.getAllOrganizationUsersByOrgId();
    this.initializeForm();
    this.fetchRoles();

  }

    getUserByType(userId: any, userType: any) {
    this.userService.getUserByType(userId, userType).subscribe((data: any) => {
      this.user = data.response;
    });
  }
  getAllOrganizationUsersByOrgId() {
    this.userService.getAllOrganizationUserByOrganizationId(this.pageRequest, this.userId).subscribe({
      next: (res: any) => {
        this.organizationUserResponse = res.response.content;
        this.paginationManager.setPageData(res.response);
        this.pageRequest.pageNo = res.response.pageNumber;

      },
      error: err => {
        console.error('Failed to fetch organization users', err);
      }
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")
        ]
      ],

      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      roleId: [null, Validators.required],
      profilePic: [null]
    });
  }

  openModalForAdd() {
    this.isEditMode = false;
    this.selectedUserId = '';
    this.selectedRoleName = null;
    this.selectedProfilePic = null;
    this.userPicUrl = null;
    this.form.get('roleId')?.setValue(null);
    this.form.reset();
  }



  openModalForEdit(user: any) {
    this.isEditMode = true;
    this.selectedUserId = user.id;
    this.form.patchValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roleId: user.role.roleId,
      profilePic: user.profilePic
    });
    this.selectedRoleName = user.role.roleName;
    if (user.profilePic) {
      // If the profilePic is a full URL or relative path, use it
      this.userPicUrl = user.profilePic;

    } else {
      this.userPicUrl = '';
    }
  }


  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (this.userPicUrl) {
        URL.revokeObjectURL(this.userPicUrl);
      }
      if (this.isEditMode) {
        this.updateOrganizatinUserRequest.profilePic = file;
      } else {
        this.organizatinUserRequest.profilePic = file;
      }
      this.userPicUrl = URL.createObjectURL(file);
      this.selectedFile = file;
    }

  }


  isDropdownOpen = false;
  toggleDropdown() {
    if (this.roles.length > 0) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }
  getDropdownRoleOptions() {
    return this.roles.map((role) => ({
      label: role.roleName ?? '',
      value: role.roleId ?? '',
    }));
  }
  selectRole(roleId: any, roleName: string) {
    this.selectedRoleId = roleId;
    this.selectedRoleName = roleName;
    this.form.get('roleId')?.setValue(roleId);
  }

  isSubmitting = false;
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formValue = this.form.value;
    this.updateOrganizatinUserRequest = formValue;
    this.updateOrganizatinUserRequest.profilePic = this.selectedFile;
    if (this.isEditMode) {
      this.updateOrganizatinUserRequest.id = this.selectedUserId;
      this.userService.updateOrganizationUser(this.updateOrganizatinUserRequest).subscribe({
        next: (res) => {
          AppUtil.openToast('success', res.message, 'Success');
          this.getAllOrganizationUsersByOrgId();
          this.closeModal();
          this.resetFormState();
          this.isSubmitting = false;
        }
        , error: (err) => {
          this.isSubmitting = false;
          const errorMessage = err?.error?.message || 'Something went wrong!';
          AppUtil.openToast('error', errorMessage, 'Error');
        }
      });

    } else {
      this.organizatinUserRequest = formValue;
      this.organizatinUserRequest.organizationId = this.userId;
      this.organizatinUserRequest.profilePic = this.selectedFile;
      this.userService.addOrganizaionUser(this.organizatinUserRequest).subscribe({
        next: (res) => {
          AppUtil.openToast('success', res.message, 'Success');
          this.getAllOrganizationUsersByOrgId();
          this.closeModal();
          this.resetFormState();
          this.isSubmitting = false;
        }
        , error: (err) => {
          this.isSubmitting = false;
          const errorMessage = err?.error?.message || 'Something went wrong!';
          AppUtil.openToast('error', errorMessage, 'Error');
        }
      });
    }
  }
  resetFormState() {
    this.form.reset();
    this.form.get('roleId')?.setValue(null);
    this.isDropdownOpen = false;
    this.selectedRoleName = null;
    this.userPicUrl = null;
    this.selectedFile = null;
    this.isEditMode = false;
    const fileInput = document.getElementById('file1') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  closeModal() {
    (document.getElementById('closeModalDelete') as HTMLElement).click();
  }
  roles: Role[] = [];
  role: Role = new Role();
  rolesLoaded = false;

  fetchRoles(): void {
    this.userService.getAllRolesExcludeAdmin(this.pageRequest, this.userId).subscribe(res => {
      this.roles = res.response.content;
      this.rolesLoaded = true;
    });
  }

  setUserId(userId: string) {
    this.userId = userId;
  }
  changeUserStatus(item: any) {
    this.userId = item.id;
    this.userService.updateUserStatus(this.userId).subscribe({
      next: (response: any) => {
        AppUtil.openToast('success', response.message, 'Success');
      },
      error: (error: any) => {
        // toast.error(error.error.message);
      },
    });
  }
}
