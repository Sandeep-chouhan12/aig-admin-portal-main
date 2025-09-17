import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { UserResponse } from '../../model/user-response';
import { RoleServiceService } from '../../Service/role-service.service';
import { UsersService } from 'src/app/users/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/organization/payloads/OrganizationUserResponse';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-sub-admin-list',
  templateUrl: './sub-admin-list.component.html',
  styleUrls: ['./sub-admin-list.component.scss']
})
export class SubAdminListComponent implements OnInit, AfterViewInit {


  ngOnInit(): void {
    this.fetchRoles();
    this.getAllUsers();
  }

  userForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  isEditeMode: boolean = false;
  roles: Role[] = [];
  userId: number = 0;
  paginationManager: PaginationManager = new PaginationManager();

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  appUtil = AppUtil
  constructor(private roleService: RoleServiceService, private userService: UsersService, private fb: FormBuilder, public loaderService: LoaderService) {

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
      roleId: ['', Validators.required],
      profilePicture: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
      id: [null]
    })
  }

  ngAfterViewInit(): void {
    // const selectBoxes = document.querySelectorAll('.custom-select');

    // selectBoxes.forEach(selectBox => {
    //   const display = selectBox.querySelector('.select-display') as HTMLElement;
    //   const options = selectBox.querySelectorAll('.dropdown-options-list');

    //   display?.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     // Close others first
    //     selectBoxes.forEach(sb => sb.classList.remove('active'));
    //     selectBox.classList.toggle('active');
    //   });

    //   options.forEach(option => {
    //     option.addEventListener('click', () => {
    //       const selectedText = option.textContent?.trim() || '';
    //       const spanEl = display.querySelector('span');
    //       if (spanEl) spanEl.textContent = selectedText;
    //       selectBox.classList.remove('active');
    //     });
    //   });
    // });

    // // Close dropdown if clicked outside
    // document.addEventListener('click', () => {
    //   selectBoxes.forEach(sb => sb.classList.remove('active'));
    // });
  }



  fileValidator(allowedTypes: string[], maxSize: number): any {
    return (control: any) => {
      const file = control.value;
      if (!file) return null;
      const fileType = file.type;
      if (!allowedTypes.includes(fileType)) {
        return { invalidFileType: true };
      }
      if (file.size > maxSize * 1024 * 1024) {
        return { fileSizeExceeded: true };
      }
      return null;
    };

  }

  userList: UserResponse[] = []
  page: PageRequest = { pageNo: 0, pageSize: 8 }
  totalElements: number = 0

  public getAllUsers() {
    this.roleService.getAllUsers(this.page).subscribe((res: any) => {
      this.userList = res.roles.content;
      this.paginationManager.setPageData(res.roles);
      this.page.pageNo = res.roles.pageable.pageNumber;
    });
  }

  errorMessage = '';
  onFileChange(event: any) {
    const file = event.target.files && event.target.files[0];
    const input = event.target as HTMLInputElement;

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSizeInMB = 2; // Example: 2 MB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        this.errorMessage = 'Only JPG, PNG, or GIF images are allowed.';
        this.imagePreview = '';

        return;
      }

      if (file.size > maxSizeInBytes) {
        this.errorMessage = `File size should not exceed ${maxSizeInMB} MB.`;
        this.imagePreview = '';

        return;
      }

      this.errorMessage = '';

      const control = this.userForm.get('profilePicture');
      control?.setValue(file);
      control?.markAsTouched(); // 🔧 Required to show error on submit
      control?.updateValueAndValidity();

      this.imagePreview = URL.createObjectURL(file);
      input.value = '';
    }
  }

  public deleteUser() {
    this.enableLoading();
    this.roleService.deleteUserById(this.userId).subscribe((res: any) => {
      this.getAllUsers();
      AppUtil.openToast('success', res.message, 'Success')
      this.closeModal('delet_model_close')
      this.disableLoading();
    });
  }

  

editeUser(user: UserResponse) {
  // Remove file validator
  this.removeImageValidator();

  this.isEditeMode = true;
  this.userForm.patchValue({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    roleId: user.roleId,
    id: user.id,
  });
  
  this.imagePreview = user.profilePicture;

  // Load roles if empty, then set the selected role
  if (this.roles.length == 0) {
    this.fetchRolesAsync().then(() => {
      this.setSelectedRole(user.roleId);
    });
  } else {
    // Set the role immediately if roles are already available
    this.setSelectedRole(user.roleId);
  }
}

// New method that returns a Promise
private fetchRolesAsync(): Promise<void> {
  return new Promise((resolve, reject) => {
    let sortStatus: any
    this.roleService.getAllRolesExculdeAdminWithoutPagination(sortStatus, true).subscribe((res:any) => {
       this.roles = res.response;
        resolve();
    })
  }
);
}

// Helper method to set the selected role


// Helper method to set the selected role
private setSelectedRole(roleId: number) {
  const selectedRole = this.roles.find(role => role.roleId === roleId);
  if (selectedRole) {
    this.selectedRoleText = selectedRole.roleName;
    // Ensure the form control is updated
    this.userForm.patchValue({ roleId: roleId });
  }
}

  removeImageValidator() {
    this.userForm.get('profilePicture')?.clearValidators();
    this.userForm.get('profilePicture')?.updateValueAndValidity();
  }
  addImageValidator() {
    this.userForm.get('profilePicture')?.setValidators(this.fileValidator(['image/jpeg', 'image/png'], 5));
    this.userForm.get('profilePicture')?.updateValueAndValidity();
  }

  clearForm() {
    this.isEditeMode = false;
    this.userForm.reset();
    this.disableLoading();
    this.imagePreview = '';
    this.selectedRoleText='Select Role Type'
    this.addImageValidator();
    document.getElementById('default')?.click();
  }

  onSubmitt() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return
    }
    this.enableLoading();

    let method = this.isEditeMode ? this.roleService.updateUser(this.userForm.value) : this.roleService.addUser(this.userForm.value);
    method.subscribe((res: any) => {
      this.getAllUsers();
      this.clearForm();
      this.disableLoading();
      this.closeModal('add-modal-close');
      AppUtil.openToast('success', res.message, 'Success')
    });
  }


  updateUserStatus(user: UserResponse) {
    let status = user.isActive;
    this.roleService.updateUserStatus(user.id).subscribe({
      next: (response: any) => {
        AppUtil.openToast('success', response.message, 'Success');
      },
      error: (error: any) => {
        // toast.error(error.error.message);
        user.isActive = status;
      },
    });
  }

  fetchRoles(): void {
    let sortStatus: any // default status which fetch dat with 
    this.roleService.getAllRolesExculdeAdminWithoutPagination(sortStatus, true).subscribe((res:any) => {
      this.roles = res.response;
    });
  }

  dropdownOpen = false;
  selectedRoleText = 'Select Role Type';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setRole(role: Role) {
    this.selectedRoleText = role.roleName;
    this.dropdownOpen = false;
    this.userForm.patchValue({
      roleId: role.roleId
    });
    this.userForm.get('roleId')?.markAsTouched();
    this.userForm.get('roleId')?.updateValueAndValidity();
  }

  isLoading: boolean = false;

  enableLoading() {
    this.isLoading = true;
  }
  disableLoading() {
    this.isLoading = false;
  }
  closeModal(id: string) {
    (document.getElementById(id) as HTMLElement).click();
  }

  setUserId(id: number) {
    this.userId = id;
  }

  formateName(firstName: string, lastName: string) {
    let name = firstName + ' ' + lastName;
    if (name.length > 25) {
      return name.slice(0, 25) + '...'
    }
    return name
  }

  /// changes 14/08/25
}

