import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { AppUtil } from '../../utils/app-util';
import { Admin } from '../../models/admin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../utils/constants';
import { FormsValidator } from '../../utils/forms-validator';
import { ChangePasswordRequest } from '../../models/change-password-request';
import { UpdateAdminRequest } from '../../models/update-admin-request';
import { ComponentsRoutes } from '../../utils/components-routes';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

/**
 * The NavBarComponent represents the navigation bar in the application.
 * It includes functionality for displaying user information, changing passwords, and logging out.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() title: string = '';
  @Input() isInnerNav = false;
  admin: Admin = new Admin();
  updateAdmin: UpdateAdminRequest = new UpdateAdminRequest();
  changePassFrom: FormGroup;
  editForm: FormGroup;
  confirmPassword!: string;
  constants = Constants;
  changePasswordReq = new ChangePasswordRequest();
  appUtils = AppUtil;
  imagePreview: any;

  componentRoutes = ComponentsRoutes;
  constant = Constants;
  setTitleName: any;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private location: Location,
    private router: Router,
    public sharedService: SharedService
  ) {
    // Initialize the change password form with validators
    this.changePassFrom = this.builder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.editForm = this.builder.group({
      firstName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      lastName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      email: [''],
      phoneNumber: ['',],
      profilePicture: [''],
    });
  }

  ngOnInit(): void {
    this.getLoggedInUser();

    this.router.events.subscribe({
      next: (event: any) => {
        this.getPath();
      }
    });

    // Subscribe to title changes
    this.sharedService.title$.subscribe(title => {
      this.title = title;
    });
  }

  /**
   * Retrieves the logged-in user information.
   */
  public getLoggedInUser() {
    this.authService.getLoggedInUser().subscribe({
      next: (res: any) => {
        this.admin = res.admin;

        this.editForm.patchValue({
          firstName: this.admin.firstName,
          lastName: this.admin.lastName,
          email: this.admin.email,
          phoneNumber: this.admin.phoneNumber,
          profilePicture: this.admin.profilePicture
        })
      },
      error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
  }

  /**
   * Initiates the password change process.
   * Validates the form and triggers the changePassword method from the AuthService.
   */
  public changePassword() {

    this.changePasswordReq.currentPassword = this.changePassFrom.value.currentPassword;
    this.changePasswordReq.newPassword = this.changePassFrom.value.newPassword;
    this.confirmPassword = this.changePassFrom.value.confirmPassword;

    FormsValidator.formSubmittion(this.changePassFrom);
    if (this.changePassFrom.invalid) return;

    if (this.confirmPassword === this.changePasswordReq.newPassword) {
      this.authService.changePassword(this.changePasswordReq).subscribe({
        next: (res: any) => {
          AppUtil.openToast('success', res.message, 'Success');
          AppUtil.modalDismiss('close');
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
    } else {
      AppUtil.openToast('error', this.constants.PASSWORD_NOT_MATCHED, 'Error');
    }
  }

  /**
   * Logs out the user and dismisses the modal.
   * @param id - The ID of the modal to be dismissed.
   */
  public logOutUser(id: any) {
    AppUtil.modalDismiss(id);
    this.authService.logOut();
  }

  /**
   * Navigates back in the browser history.
   */
  back() {
    window.history.back();
    this.sharedService.hideSideNav.next(false);

  }

  /**
   * Checks if a form field is valid.
   * @param fieldName - The name of the form field.
   * @param form - The form to be checked.
   * @returns True if the form field is valid, false otherwise.
   */
  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }

  /**
   * Handles the change password icon behavior.
   * @param refEle - The reference element for the password input.
   */
  public changePasswordIcon(refEle: any) {
    AppUtil.changePassowrdIcon(refEle);
  }

  /**
   * Clears the data in the change password form.
   */
  public clearData() {
    this.changePassFrom.reset();
    this.changePasswordReq = new ChangePasswordRequest();
    this.confirmPassword = '';
  }

  public setUpdateAdmin() {
    this.updateAdmin = { ...this.admin };
    this.imagePreview = this.updateAdmin.profilePicture;
  }

  // setting image to officer
  public setImage(event: any) {
    this.updateAdmin.profilePicture = event.target.files[0];
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  public updateAdminMethod() {
    FormsValidator.formSubmittion(this.editForm);
    if (this.editForm.invalid) {
      return;
    }
    this.toggleLoader();

    this.updateAdmin.firstName = this.editForm.value.firstName;
    this.updateAdmin.lastName = this.editForm.value.lastName;
    this.updateAdmin.email = this.editForm.value.email;
    this.updateAdmin.phoneNumber = this.editForm.value.phoneNumber;


    this.authService.updateAdmin(this.updateAdmin).subscribe({
      next: (res: any) => {
        AppUtil.openToast('success', res.message, 'Success');
        this.getLoggedInUser();
        AppUtil.modalDismiss('profileBarCancel');
        this.toggleLoader();
      },
      error: (err: any) => {
        this.toggleLoader();
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
  }
  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }

  public getPath() {
    const path = this.location.path();

    if (path.toString().substring(7) == '') {
      this.title = 'Dashboard'
    } else {
      this.title = path.toString().substring(7).split('/')[0].replace('-', ' ');
    }
  }
}
