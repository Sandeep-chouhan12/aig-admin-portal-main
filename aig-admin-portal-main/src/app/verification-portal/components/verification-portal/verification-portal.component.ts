import { Component, IterableDiffers, OnInit } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { VerificationOfficerService } from '../../services/verification-officer.service';
import { EmergencyOfficerResponse } from 'src/app/emergency/payload/emergency-officer-response';
import { VerificationOfficer } from '../../models/verification-officer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { Officer } from 'src/app/emergency/models/officer';
import { SelectorListContext } from '@angular/compiler';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { SortStatus } from 'src/app/users/models/sort-status';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';


@Component({
  selector: 'app-verification-portal',
  templateUrl: './verification-portal.component.html',
  styleUrls: ['./verification-portal.component.scss'],
})
export class VerificationPortalComponent implements OnInit {


  sortIsActive: SortStatus = SortStatus.ALL;

  sortStatus = SortStatus;

  pageRequest = new PageRequest();
  pagination = new PaginationManager();

  verifiactionOfficers: VerificationOfficer[] = [];
  officer = new VerificationOfficer();

  officerForm!: FormGroup;
  updateOfficerForm!: FormGroup;

  officerId: number = 0;
  selectedImage: any
  index: number = 0;
  appUtil = AppUtil
  constants = Constants;
  isDataLoaded!: boolean;

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  ngOnInit(): void {
    this.getAllVerificationOffficers();
  }

  constructor(private verifiactionOfficerService: VerificationOfficerService, private formBuilder: FormBuilder) {

    this.officerForm = this.formBuilder.group({
      firstName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      lastName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      email: ['', [Validators.required], [FormsValidator.emailValidator()]],
      phoneNumber: ['', [Validators.required,  Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
      password: ['', [Validators.required]],
      profilePicture: [null]
    });

    this.updateOfficerForm = this.formBuilder.group({
      firstName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      lastName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      profilePicture: [null] 
    });
    this.selectedImage = null
  }

  public getAllVerificationOffficers(pageRequest: PageRequest = this.pageRequest) {
    this.pageRequest = pageRequest;
    this.verifiactionOfficerService.getAllVerificationOfficers(this.pageRequest, this.sortIsActive).subscribe({
      next: (data: any) => {
        this.verifiactionOfficers = data.verifiactionOfficers.content;
        this.pagination.setPageData(data.verifiactionOfficers);
        this.isDataLoaded = true
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error')
      }
    })
  }

  public addPortalVerificationOfficer() {
    if (this.officerForm.invalid) {
      AppUtil.checkFormValidOrNot(this.officerForm);
      return;
    } else {
      this.toggleLoader();
      this.verifiactionOfficerService.addPortalVerificationOfficer(this.officer).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          this.getAllVerificationOffficers();
          AppUtil.modalDismiss('add-modal-close');
          this.toggleLoader();
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }
      })
    }
  }

  public deleleAddVerificationOfficer() {
    if (this.officerId && this.officerId != 0) {
      this.toggleLoader();
      this.verifiactionOfficerService.deleleAddVerificationOfficer(this.officerId).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          this.getAllVerificationOffficers();
          AppUtil.modalDismiss('delete-modal-close');
          this.toggleLoader();
        },
        error: (er: any) => {
          this.toggleLoader();
          AppUtil.openToast('error', er.error.message, 'Error')
        }
      })
    }
  }

  // public setOfficerImage(event: any) {
  //   let file = event.target.files[0];
  //   if (file) {
  //     this.officer.profilePicture = file
  //     this.selectedImage = URL.createObjectURL(file);
  //   }
  // }

  public errorMessage:any;
//   public setOfficerImage(event: any) {
//   const file = event.target.files[0];
//   const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
//   const allowedTypes = ['image/jpeg', 'image/png'];

//   if (!file) return;

//   // Validate file type
//   if (!allowedTypes.includes(file.type)) {
//     this.errorMessage = 'Only JPG and PNG images are allowed';
//     this.selectedImage = null;
//     event.target.value = ''; // reset file input
//     return;
//   }

//   // Validate file size
//   if (file.size > maxSize) {
    
//     this.errorMessage = 'File size too large. Maximum allowed size is 2 MB.';
//     this.selectedImage = null;
//     event.target.value = ''; // reset file input
//     return;
//   }

//   // If valid
//   this.errorMessage = '';
//   this.officer.profilePicture = file;
//   this.selectedImage = URL.createObjectURL(file);
// }

public setOfficerImage(event: any) {
  const file = event.target.files[0];
  const maxSize = 2 * 1024 * 1024; // 2 MB
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!file) return;

  // Validate file type
  if (!allowedTypes.includes(file.type)) {
    this.errorMessage = 'Only JPG and PNG images are allowed';
    this.officerForm.get('profilePicture')?.setErrors({ invalidType: true });
    this.selectedImage = null;
    event.target.value = ''; // reset file input
    return;
  }

  // Validate file size
  if (file.size > maxSize) {
    this.errorMessage = 'File size too large. Maximum allowed size is 2 MB.';
    this.officerForm.get('profilePicture')?.setErrors({ maxSizeExceeded: true });
    this.selectedImage = null;
    event.target.value = ''; // reset file input
    return;
  }

  // If valid
  this.errorMessage = '';
  this.officer.profilePicture = file;
  this.selectedImage = URL.createObjectURL(file);
  this.officerForm.patchValue({ profilePicture: file });
  this.officerForm.get('profilePicture')?.setErrors(null); // clear errors
}
public setOfficerImageUpdated(event: any) {
  const file = event.target.files[0];
  const maxSize = 2 * 1024 * 1024; // 2 MB
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!file) return;

  // Validate file type
  if (!allowedTypes.includes(file.type)) {
    this.errorMessage = 'Only JPG and PNG images are allowed';
    this.updateOfficerForm.get('profilePicture')?.setErrors({ invalidType: true });
    return;
  }

  // Validate file size
  if (file.size > maxSize) {
    this.errorMessage = 'File size too large. Maximum allowed size is 2 MB.';
    this.updateOfficerForm.get('profilePicture')?.setErrors({ maxSizeExceeded: true });
    return;
  }

  // If valid
  this.errorMessage = '';
  this.officer.profilePicture = file;
  this.selectedImage = URL.createObjectURL(file);
  this.updateOfficerForm.patchValue({ profilePicture: file });
  this.updateOfficerForm.get('profilePicture')?.setErrors(null); // clear errors
}

  public changeVerificationPortalOfficerStatus(officer: VerificationOfficer) {
    officer.isActive = !officer.isActive
    this.verifiactionOfficerService.changeVerificatioOfficerStatus(officer.id).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success');
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error')
      }
    })
  }

  public setOfficer(data: VerificationOfficer, index: number) {
    this.errorMessage='';
    this.officer = { ...data };
    this.index = index;
    this.selectedImage = this.officer.profilePicture || AppUtil.DEFAULT_IMAGE;
  }

  public updateVerificationPortalOfficer() {
    if (this.updateOfficerForm.invalid) {
      AppUtil.checkFormValidOrNot(this.updateOfficerForm);
      return;
    } else {
      this.toggleLoader();
      this.verifiactionOfficerService.updateVerificationPortalOfficer(this.officer).subscribe({
        next: (data: any) => {
          if (this.index && this.index != -1) {
            let officer = this.verifiactionOfficers[this.index] as VerificationOfficer
            officer.firstName = data.data.firstName;
            officer.lastName = data.data.lastName;
            officer.profilePicture = data.data.profilePicture;
            this.toggleLoader();
          } else {
            this.toggleLoader();
            this.getAllVerificationOffficers()
          }
          AppUtil.openToast('success', data.message, 'Success');
          AppUtil.modalDismiss('edit-model-close')
        },
        error: (er: any) => {
          this.toggleLoader();
          AppUtil.openToast('error', er.error.message, 'Error');
        }
      })
    }
  }

  public clearOfficer() {
    this.errorMessage='';
    this.officer = new VerificationOfficer();
    this.officerForm.reset();
    this.selectedImage = null;
  }

  public changePasswordIcon(refEle: any) {
    AppUtil.changePassowrdIcon(refEle);
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

    this.getAllVerificationOffficers();
  }
}
