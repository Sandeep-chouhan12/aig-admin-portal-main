import { Component, OnInit } from '@angular/core';
import { OperatorService } from '../../service/operator.service';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { EmergencyOfficerResponse } from '../../payload/emergency-officer-response';
import { EmergencyOfficerRequest } from '../../payload/emergency-officer-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { SortStatus } from 'src/app/users/models/sort-status';
import { PageStateService } from 'src/app/shared/services/page-state.service';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';

@Component({
  selector: 'app-emergency-officer',
  templateUrl: './emergency-officer.component.html',
  styleUrls: ['./emergency-officer.component.scss'],
})
export class EmergencyOfficerComponent implements OnInit {


  sortIsActive: SortStatus = SortStatus.ALL;

  sortStatus = SortStatus;

  pageRequest = new PageRequest();
  paginationManager: PaginationManager = new PaginationManager();
  officers: EmergencyOfficerResponse[] = [];
  emergencyOfficer = new EmergencyOfficerRequest();
  emergencyOfficerForm!: FormGroup;
  updateEmergencyOfficerForm!: FormGroup
  profilePic: string = ''
  emergencyOperatorId: number = 0;
  index: number = 0;
  appUtils = AppUtil;
  public passwordVisibilityMap = new Map<any, boolean>();
  constant = Constants
  selectedImage: any;
  emergencyImage: any;
  password: string = ''

   permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  ngOnInit(): void {
    this.pageRequest.pageSize = 8;
    this.pageRequest.pageNo = this.getPageState();
    this.getALLOperators();

  }

  constructor(private emergencyOperatorService: OperatorService, private formBuilder: FormBuilder, public loaderService: LoaderService, private pageState: PageStateService) {
    this.emergencyOfficerForm = this.formBuilder.group({
      firstName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      lastName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      email: ['', [Validators.required], [FormsValidator.emailValidator()]],
      phoneNumber: ['',[ Validators.required, Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
      password: ['', [Validators.required]],
      emergencyServiceName: ['', Validators.required],
      description: ['', Validators.required],
      emergencyImage: ['', Validators.required],
      profilePicture: [''],
    })

    this.updateEmergencyOfficerForm = this.formBuilder.group({
      firstName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      lastName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      emergencyServiceName: ['', Validators.required],
      description: ['', Validators.required],
      emergencyImage: ['', Validators.required],
      profilePicture: [''],
     
    })
  }

  public getALLOperators() {
    this.emergencyOperatorService.getAllEmergencyOperators(this.pageRequest, this.sortIsActive).subscribe({
      next: (data: any) => {
        this.officers = data.officers.content;
        this.paginationManager.setPageData(data.officers);
        this.setPageState(this.pageRequest.pageNo)
      },
      error: (er: any) => {

      }
    })
  }

  public deleteEmergencyOperatore() {
    if (this.emergencyOperatorId && this.emergencyOperatorId != 0) {
      this.toggleLoader();
      this.emergencyOperatorService.deleteEmergencyOperator(this.emergencyOperatorId).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          AppUtil.modalDismiss('delete-modal-close');
          this.getALLOperators();
          this.toggleLoader();
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }, complete() {

        },
      })
    }
  }

  public setOfficerImage(event: any) {
  const file = event.target.files[0];
  
  // Get the correct form control based on which modal is active
  let control;
  if (this.updateEmergencyOfficerForm && document.getElementById('edit-modal')?.classList.contains('show')) {
    control = this.updateEmergencyOfficerForm.get('profilePicture');
  } else {
    control = this.emergencyOfficerForm.get('profilePicture');
  }

  if (file) {
    // Reset previous errors
    control?.setErrors(null);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      control?.setErrors({ invalidType: true });
      control?.markAsTouched();
      this.emergencyOfficer.profilePicture = null;
      this.selectedImage = null;
      return;
    }

    // Validate file size (2MB max)
    const maxSizeMB = 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
      control?.setErrors({ maxSizeExceeded: true });
      control?.markAsTouched();
      this.emergencyOfficer.profilePicture = null;
      this.selectedImage = null;
      return;
    }

    // Valid file
    this.selectedImage = URL.createObjectURL(file);
    this.emergencyOfficer.profilePicture = file;
    control?.setValue(file);
    control?.markAsTouched();
  } else {
    // No file selected, reset
    control?.setErrors(null);
    this.emergencyOfficer.profilePicture = null;
    this.selectedImage = null;
  }
}
  public changeEmergencyOfficerActiveStatus(officer: EmergencyOfficerResponse) {
    // officer.isActive = !officer.isActive
    this.emergencyOperatorService.changeEmergencyOfficerActiveStatus(officer.id).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success');
        officer.isActive = !officer.isActive;
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error');
      }
    })
  }

 // Updated setEmergencyImage method
public setEmergencyImage(event: any) {
  const file = event.target.files[0];
  
  // Determine which form is currently active
  let control;
  let isUpdateMode = false;
  
  if (this.updateEmergencyOfficerForm && document.getElementById('edit-modal')?.classList.contains('show')) {
    control = this.updateEmergencyOfficerForm.get('emergencyImage');
    isUpdateMode = true;
  } else {
    control = this.emergencyOfficerForm.get('emergencyImage');
  }

  if (file) {
    // Reset previous errors
    control?.setErrors(null);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      control?.setErrors({ invalidType: true });
      control?.markAsTouched();
      this.emergencyOfficer.emergencyImage = null;
      this.emergencyImage = null;
      return;
    }

    // Validate file size (2MB max)
    const maxSizeMB = 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
      control?.setErrors({ maxSizeExceeded: true });
      control?.markAsTouched();
      this.emergencyOfficer.emergencyImage = null;
      this.emergencyImage = null;
      return;
    }

    // Valid file - set the file and clear any errors
    this.emergencyImage = URL.createObjectURL(file);
    this.emergencyOfficer.emergencyImage = file;
    control?.setValue(file);
    control?.setErrors(null); // Clear any previous errors
    control?.markAsTouched();
  }
}

// Updated removeSelectedImage method
public removeSelectedImage() {
  // Determine which form is currently active
  let control;
  let isUpdateMode = false;
  
  if (this.updateEmergencyOfficerForm && document.getElementById('edit-modal')?.classList.contains('show')) {
    control = this.updateEmergencyOfficerForm.get('emergencyImage');
    isUpdateMode = true;
  } else {
    control = this.emergencyOfficerForm.get('emergencyImage');
  }

  // Clear the image data
  this.emergencyImage = null;
  this.emergencyOfficer.emergencyImage = null;
  
  // Reset the form control
  control?.setValue(null);
  
  // For add mode, set required error since image is mandatory
  // For update mode, don't set required error if original image exists
  if (!isUpdateMode) {
    // Add mode - emergency image is required
    control?.setErrors({ required: true });
  } else {
    // Update mode - only set error if there's no existing image
    if (!this.emergencyOfficer.emergencyImage && !this.hasExistingEmergencyImage()) {
      control?.setErrors({ required: true });
    } else {
      control?.setErrors(null);
    }
  }
  
  control?.markAsTouched();
  
  // Reset file input
  const fileInput = isUpdateMode ? 
    document.getElementById('fileuploadEdit') as HTMLInputElement :
    document.getElementById('fileupload') as HTMLInputElement;
    
  if (fileInput) {
    fileInput.value = '';
  }
}

// Helper method to check if there's an existing emergency image
private hasExistingEmergencyImage(): boolean {
  return !!(this.emergencyOfficer.emergencyImage && 
           typeof this.emergencyOfficer.emergencyImage === 'string' &&
           this.emergencyOfficer.emergencyImage.length > 0);
}

// Updated getOperator method to handle image validation properly
public getOperator(data: EmergencyOfficerResponse, index: number) {
  let emergencyOfficer = { ...data };
  this.emergencyOfficer.firstName = emergencyOfficer.firstName;
  this.emergencyOfficer.lastName = emergencyOfficer.lastName;
  this.emergencyOfficer.email = emergencyOfficer.email;
  this.emergencyOfficer.emergencyServiceName = emergencyOfficer.emergencyService.name;
  this.emergencyOfficer.emergencyImage = emergencyOfficer.emergencyService.image;
  this.emergencyOfficer.id = emergencyOfficer.id;
  this.emergencyOfficer.profilePicture = emergencyOfficer.profilePicture;
  this.emergencyOfficer.emergencyId = emergencyOfficer.emergencyService.id;
  this.emergencyOfficer.description = emergencyOfficer.emergencyService.description;
  this.selectedImage = this.emergencyOfficer.profilePicture;
  this.index = index;
  this.emergencyImage = null;

  // Reset the update form and clear any validation errors
  this.updateEmergencyOfficerForm.patchValue({
    firstName: emergencyOfficer.firstName,
    lastName: emergencyOfficer.lastName,
    emergencyServiceName: emergencyOfficer.emergencyService.name,
    description: emergencyOfficer.emergencyService.description,
    emergencyImage: emergencyOfficer.emergencyService.image,
    profilePicture: emergencyOfficer.profilePicture
  });

  // Clear validation errors for update form
  this.updateEmergencyOfficerForm.get('emergencyImage')?.setErrors(null);
  this.updateEmergencyOfficerForm.get('profilePicture')?.setErrors(null);
}

// Updated clearObject method
public clearObject() {
  this.emergencyOfficer = new EmergencyOfficerRequest();
  this.emergencyOfficerForm.reset();
  
  // Clear image-related properties
  this.selectedImage = null;
  this.emergencyImage = null;
  
  // Reset file input elements
  const fileInput2 = document.getElementById('file2') as HTMLInputElement;
  const fileUpload = document.getElementById('fileupload') as HTMLInputElement;
  
  if (fileInput2) {
    fileInput2.value = '';
  }
  if (fileUpload) {
    fileUpload.value = '';
  }
  
  // Clear validation errors but keep the required validation for emergencyImage
  this.emergencyOfficerForm.get('profilePicture')?.setErrors(null);
  this.emergencyOfficerForm.get('emergencyImage')?.setErrors(null);
  
  // Set initial form values to ensure proper validation state
  this.emergencyOfficerForm.patchValue({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    emergencyServiceName: '',
    description: '',
    emergencyImage: '',
    profilePicture: ''
  });
}

// Method to check if emergency image should show required error
public shouldShowEmergencyImageRequiredError(): boolean {
  const isUpdateMode = document.getElementById('edit-modal')?.classList.contains('show');
  
  if (isUpdateMode) {
    const control = this.updateEmergencyOfficerForm.get('emergencyImage');
    // For update mode, only show error if touched, has required error, and no existing image
    return !!(control?.touched && 
              control?.hasError('required') && 
              !this.emergencyOfficer.emergencyImage &&
              !this.emergencyImage);
  } else {
    const control = this.emergencyOfficerForm.get('emergencyImage');
    // For add mode, show error only if touched and has required error
    return !!(control?.touched && 
              control?.hasError('required'));
  }
}

  public updateEmergencyOperatore() {
    if (this.updateEmergencyOfficerForm.invalid) {
      AppUtil.checkFormValidOrNot(this.updateEmergencyOfficerForm);
      return;
    } else {
      this.toggleLoader();
      this.emergencyOperatorService.updateEmergencyOperator(this.emergencyOfficer).subscribe({
        next: (data: any) => {
          this.toggleLoader();
          AppUtil.modalDismiss('edit-modal-close');
          AppUtil.openToast('success', data.message, 'Success');
          let officer = this.officers[this.index] as EmergencyOfficerResponse
          officer.firstName = data.officer.firstName
          officer.lastName = data.officer.lastName
          officer.profilePicture = data.officer.profilePicture
          officer.emergencyService.description = data.officer.emergencyService.description
          officer.emergencyService.id = data.officer.emergencyService.id
          officer.emergencyService.name = data.officer.emergencyService.name
          officer.emergencyService.image = data.officer.emergencyService.image
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }
      })
    }
  }

//   public getOperator(data: EmergencyOfficerResponse, index: number) {
//     let emergencyOfficer = { ...data };
//     this.emergencyOfficer.firstName = emergencyOfficer.firstName
//     this.emergencyOfficer.lastName = emergencyOfficer.lastName
//     this.emergencyOfficer.email = emergencyOfficer.email
//     this.emergencyOfficer.emergencyServiceName = emergencyOfficer.emergencyService.name
//     this.emergencyOfficer.emergencyImage = emergencyOfficer.emergencyService.image
//     this.emergencyOfficer.id = emergencyOfficer.id
//     this.emergencyOfficer.profilePicture = emergencyOfficer.profilePicture;
//     this.emergencyOfficer.emergencyId = emergencyOfficer.emergencyService.id
//     this.emergencyOfficer.description = emergencyOfficer.emergencyService.description
//     this.selectedImage = this.emergencyOfficer.profilePicture;
//     this.index = index;
//     this.emergencyImage = null;

//   }

// public clearObject() {
//   this.emergencyOfficer = new EmergencyOfficerRequest();
//   this.emergencyOfficerForm.reset();
  
//   // Clear image-related properties
//   this.selectedImage = null;
//   this.emergencyImage = null;
  
//   // Reset file input elements
//   const fileInput2 = document.getElementById('file2') as HTMLInputElement;
//   const fileUpload = document.getElementById('fileupload') as HTMLInputElement;
  
//   if (fileInput2) {
//     fileInput2.value = '';
//   }
//   if (fileUpload) {
//     fileUpload.value = '';
//   }
  
//   // Clear any validation errors
//   this.emergencyOfficerForm.get('profilePicture')?.setErrors(null);
//   this.emergencyOfficerForm.get('emergencyImage')?.setErrors(null);
// }


  public togglePasswordVisibility(password: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(password) || false;
    this.passwordVisibilityMap.set(password, !currentVisibility);
  }

  public isPasswordVisible(password: any): boolean {
    return this.passwordVisibilityMap.get(password) || false;
  }

  public changePasswordIcon(refEle: any) {
    AppUtil.changePassowrdIcon(refEle);
  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }


  public addEmergencyOperator() {
    if (this.emergencyOfficerForm.invalid) {
      AppUtil.checkFormValidOrNot(this.emergencyOfficerForm)
      return;
    } else {
      this.toggleLoader();
      this.emergencyOperatorService.addEmergencyOperator(this.emergencyOfficer).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          AppUtil.modalDismiss('add-modal-close');
          this.getALLOperators();
          this.toggleLoader();
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }
      })
    }
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

    this.getALLOperators();
  }

  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
  }

// public removeSelectedImage() {
//   this.emergencyImage = null;
//   this.emergencyOfficer.emergencyImage = null;
//   this.emergencyOfficerForm.get('emergencyImage')?.reset();
// }

}