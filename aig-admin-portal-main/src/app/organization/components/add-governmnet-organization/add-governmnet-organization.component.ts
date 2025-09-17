import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { concat } from 'rxjs';
import { GovernmentOrganizationDetailResponse } from 'src/app/organization/payloads/GovernmentOrganizationDetailResponse';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-add-governmnet-organization',
  templateUrl: './add-governmnet-organization.component.html',
  styleUrls: ['./add-governmnet-organization.component.scss']
})
export class AddGovernmnetOrganizationComponent implements OnInit, AfterViewInit {

  // Form state variables
  currentSection: number = 1;
  isSubmitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;
  componentRoute = ComponentsRoutes;

  // Form group references
  registrationForm!: FormGroup;

  // UI state variables
  showIdentityTypeDropdown: boolean = false;
  showAddressVerificationDropdown: boolean = false;

  // File preview variables
  companyLogoPreview: string | ArrayBuffer | null = null;

  // Add file preview properties
  letterOfIntentPreview: string | ArrayBuffer | null = null;
  mouAgreementPreview: string | ArrayBuffer | null = null;

  showGovtBodyTypeDropdown = false;
  appUtils = AppUtil


  validationMessages = {
    agencyName: { required: 'Agency name is required' },
    govtBodyType: { required: 'Please select a government body type' },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address'
    },
    phoneNumber: {
      required: 'Phone number is required',
      pattern: 'Please enter a valid 8-digit phone number'
    },
    tinNumber: { required: 'TIN number is required' },
    stateLGA: { required: 'State & LGA is required' },
    officialWebsite: {
      required: 'Official website is required',
      url: 'Please enter a valid URL'
    },
    address: { required: 'Address is required' },
    companyLogo: {
      required: 'Company logo is required',
      invalidFileType: 'Only JPG/PNG images are allowed',
      fileTooLarge: 'Logo must be less than 5MB'
    },
    authorizedOfficer: {
      fullName: { required: 'Full name is required' },
      designation: { required: 'Designation is required' },
      phoneNumber: {
        required: 'Phone number is required',
        pattern: 'Please enter a valid 8-digit phone number'
      },
      email: {
        required: 'Email is required',
        email: 'Please enter a valid email address'
      },
      idNumber: { required: 'ID number is required' },
      introductionLetter: {
        required: 'Introduction letter is required',
        invalidFileType: 'Only JPG/PNG images are allowed',
        fileTooLarge: 'File must be less than 5MB'
      },
      authorizationLetter: {
        required: 'Authorization letter is required',
        invalidFileType: 'Only JPG/PNG images are allowed',
        fileTooLarge: 'File must be less than 5MB'
      }
    }, documentationUploads: {
      introLetterUrl: {
        required: 'Introduction letter is required',
        invalidFileType: 'Only JPG/PNG images are allowed',
        fileTooLarge: 'File must be less than 5MB'
      },
      certificateUrl: {
        required: 'CAC/Gazette Certificate is required',
        invalidFileType: 'Only JPG/PNG images are allowed',
        fileTooLarge: 'File must be less than 5MB'
      },
      letterOfIntentUrl: {
        invalidFileType: 'Only JPG/PNG images are allowed',
        fileTooLarge: 'File must be less than 5MB',
        required: 'letterOfIntentUrl letter is required',
      },
      mouUrl: {
        invalidFileType: 'Only JPG/PNG images are allowed',
        fileTooLarge: 'File must be less than 5MB',
        required: 'MouUrl letter is required',
      },
      ndprCompliant: { required: 'You must be NDPR compliant' },
      termsAccepted: { required: 'You must accept the terms' },
      authorizedUse: { required: 'You must confirm authorized use' },
      securityProtocols: { required: 'You must accept security protocols' }
    },
    reviewInfo: {
      finalAgreement: { required: 'You must agree to the final terms' }
    }
  };

  // ID type options
  idTypeOptions = [
    { value: 'NATIONAL_ID', label: 'National ID' },
    { value: 'STAFF_ID', label: 'Staff ID' },
    { value: 'PASSPORT_BIO_PAGE', label: 'Passport Bio Page' }
  ];

  // Government body type options
  govtBodyTypeOptions = [
    { value: 'FEDERAL_MINISTRY', label: 'Federal Ministry' },
    { value: 'STATE_MINISTRY', label: 'State Ministry' },
    { value: 'LOCAL_GOVERNMENT_AUTHORITY', label: 'Local Government Authority' },
    { value: 'PARASTATAL', label: 'Parastatal' },
    { value: 'SECURITY_AGENCY', label: 'Security Agency' },
    { value: 'OTHER', label: 'Other' }
  ];

  organizationId: string = '';
  governmentOrganizationDetailResponse: GovernmentOrganizationDetailResponse = new GovernmentOrganizationDetailResponse();
  updateMode = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.organizationId = params['id'];
      if (this.organizationId) {
        this.updateMode = true;
        this.sharedService.setTitle('Update Government Organization');
        this.getGovernmentOrganzationDetails(this.organizationId);
      } else {
        this.updateMode = false;
        this.sharedService.setTitle('Add Government Organization');
      }
    });
  }

  constructor(private sharedService: SharedService, private fb: FormBuilder, private userService: UsersService, private cd: ChangeDetectorRef,
    private route: ActivatedRoute, private router: Router
  ) {
    this.sharedService.hideSideNav.next(true);
    this.initializeForm();
  }
  ngAfterViewInit(): void {
    this.initializeScript();

  }

  
  introductionLetterPreview: string | null = null;
officialLetterPreview: string | null = null;
originalIdNumber: string | null = null;
originalIntroductionLetter: string | null = null;
originalAuthorizationLetter: string | null = null;
originalIdType: string | null = null;

  getGovernmentOrganzationDetails(id: any) {
    this.userService.getGovernmentOrganzationDetails(id).subscribe((data: any) => {
      const res = data.response;
      this.governmentOrganizationDetailResponse = res;
      this.updateMode = true;
      this.sharedService.setTitle('Update Government Organization');
      this.registrationForm.patchValue({
        id: res.organizationId
      });
      const identityGroup = this.registrationForm.get('identityVerification') as FormGroup;
      identityGroup.patchValue({
        agencyName: res.identityVerificationResponse?.agencyName || '',
        bodyType: res.identityVerificationResponse?.bodyType || '',
        email: res.identityVerificationResponse?.email || '',
        phoneNumber: res.identityVerificationResponse?.phoneNumber || '',
        tinNumber: res.identityVerificationResponse?.tinNumber || '',
        rcNumber: res.identityVerificationResponse?.rcNumber || '',
        stateOrLga: res.identityVerificationResponse?.stateOrLga || '',
        officialWebsite: res.identityVerificationResponse?.officialWebsite || '',
        address: res.identityVerificationResponse?.address || '',
        profilePic: null
      });
      this.selectedIdType = res.authorizedOfficerResponse?.officialIdType || 'NATIONAL_ID';
      this.selectIdType(this.selectedIdType);
      if (res.profilePicture) {
        identityGroup.get('profilePic')?.clearValidators();
        identityGroup.get('profilePic')?.updateValueAndValidity();
        this.companyLogoPreview = res.profilePicture;
      }

      // Patch other groups...
      this.registrationForm.get('authorizedOfficer')?.patchValue({
        fullName: res.authorizedOfficerResponse?.fullName || '',
        designation: res.authorizedOfficerResponse?.designation || '',
        phoneNumber: res.authorizedOfficerResponse?.phoneNumber || '',
        email: res.authorizedOfficerResponse?.email || '',
        idType: res.authorizedOfficerResponse?.officialIdType || 'NATIONAL_ID',
        idNumber: res.authorizedOfficerResponse?.idNumber || '',
        //introductionLetter: null,
        introductionLetter: res.authorizedOfficerResponse?.officialUploadPath || null,
        authorizationLetter: res.authorizedOfficerResponse?.officialLetter || null
      });
       this.introductionLetterPreview = res.authorizedOfficerResponse?.officialUploadPath || null;

       this.officialLetterPreview = res.authorizedOfficerResponse?.officialLetter || null;
const authGroup = this.registrationForm.get('authorizedOfficer');

if (authGroup?.get('introductionLetter')?.value) {
  authGroup.get('introductionLetter')?.setValidators([this.fileValidator(['image/jpeg', 'image/png'], 5)]);
  authGroup.get('introductionLetter')?.clearValidators();
  authGroup.get('introductionLetter')?.updateValueAndValidity();
}

if (authGroup?.get('authorizationLetter')?.value) {
  authGroup.get('introductionLetter')?.setValidators([this.fileValidator(['image/jpeg', 'image/png'], 5)]);
  authGroup.get('authorizationLetter')?.clearValidators();
  authGroup.get('authorizationLetter')?.updateValueAndValidity();
}
// Store originals from API only once
this.originalIdType = res.authorizedOfficerResponse?.officialIdType || 'NATIONAL_ID';
this.originalIdNumber = res.authorizedOfficerResponse?.idNumber || null;
this.originalIntroductionLetter = res.authorizedOfficerResponse?.officialUploadPath || null;
this.originalAuthorizationLetter = res.authorizedOfficerResponse?.officialLetter || null;

      const docsGroup = this.registrationForm.get('documentationUploads') as FormGroup;

      docsGroup.patchValue({
        introLetterUrl: res.documentationUploadsResponse?.introLetterUrl || null,
        certificateUrl: res.documentationUploadsResponse?.certificateUrl || null,
        letterOfIntentUrl: res.documentationUploadsResponse?.letterOfIntentUrl || null,
        mouUrl: res.documentationUploadsResponse?.mouUrl || null,
        ndprCompliance: res.documentationUploadsResponse?.ndprCompliance || false,
        acceptedTerms: res.documentationUploadsResponse?.acceptedTerms || false,
        authorizedUseOnly: res.documentationUploadsResponse?.authorizedUseOnly || false,
        nonDisclosureAccepted: res.documentationUploadsResponse?.nonDisclosureAccepted || false
      });

      /*— If a URL already exists we don’t want “required” errors —*/
      // ['introLetterUrl', 'certificateUrl', 'letterOfIntentUrl', 'mouUrl'].forEach(ctrl => {
      //   if (docsGroup.get(ctrl)?.value) {
      //     docsGroup.get(ctrl)?.clearValidators();
      //     docsGroup.get(ctrl)?.updateValueAndValidity();
      //   }
      // });
      const fileControls = ['introLetterUrl', 'certificateUrl', 'letterOfIntentUrl', 'mouUrl'];

fileControls.forEach(ctrl => {
  const control = docsGroup.get(ctrl);
  if (control?.value) {
    control.clearValidators();
  } else {
    control?.setValidators(Validators.required);
  }
  control?.updateValueAndValidity();
});
      this.registrationForm.get('reviewInfo')?.reset();

      // Optionally set preview for other docs
      this.letterOfIntentPreview = res.documentationUploadsResponse?.letterOfIntentUrl || null;
      this.mouAgreementPreview = res.documentationUploadsResponse?.mouUrl || null;
    });
  }


  initializeForm(): void {
    this.registrationForm = this.fb.group({
      id: [''],
      identityVerification: this.fb.group({
        agencyName: ['', Validators.required],
        bodyType: ['', Validators.required], 
        email: ['', [Validators.required, Validators.email]], 
        phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
        tinNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
        rcNumber: ['', [
          Validators.required,
          Validators.pattern(/^RC\d{6,7}$/i)  
        ]], 
        stateOrLga: ['', Validators.required], 
        officialWebsite: ['', [Validators.required, this.urlValidator]], 
        address: ['', Validators.required], 
        profilePic: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]] // Changed from File to null

      }),
      authorizedOfficer: this.fb.group({
        fullName: ['', Validators.required], 
        designation: ['', Validators.required],
         phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
        email: ['', [Validators.required, Validators.email]], 
        idType: ['NATIONAL_ID', Validators.required], 
        idNumber: ['', Validators.required],
        introductionLetter: [null],
        authorizationLetter: [null]
      }),
      documentationUploads: this.fb.group({
        introLetterUrl: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
        certificateUrl: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
        letterOfIntentUrl: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
        mouUrl: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
        ndprCompliance: [false],
        acceptedTerms: [false],
        authorizedUseOnly: [false],
        nonDisclosureAccepted: [false]
      }),
      reviewInfo: this.fb.group({
        finalAgreement: [null, Validators.required]
      })
    });
  }

  // Progress tracking
  sectionStatus = {
    1: { completed: false, visited: true },
    2: { completed: false, visited: false },
    3: { completed: false, visited: false },
    4: { completed: false, visited: false }
  };

  // Progress bar steps
  progressSteps = [
    { id: 1, label: 'Organization Info', icon: 'organization-icon' },
    { id: 2, label: 'Representative', icon: 'user-icon' },
    { id: 3, label: 'Verification', icon: 'verification-icon' },
    { id: 4, label: 'Review & Finish', icon: 'review-icon' }
  ];
  // Address verification options
  addressVerificationMethods = [
    { value: 'UTILITY_BILL', label: 'Utility Bill' },
    { value: 'AIG_BLOCKCODE', label: 'AIG Blockcode' }
  ];

  // Current verification method
  currentVerificationMethod = {
    organization: '',
    representative: ''
  };

  // URL Validator
  urlValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return pattern.test(control.value) ? null : { invalidUrl: true };
  }

  getGovtBodyTypeLabel(): string {
    const value = this.identityVerification.get('bodyType')?.value;
    return this.govtBodyTypeOptions.find(obj => obj.value === value)?.label || 'Select Type';
  }


 

onLogoUpload(event: Event): void {
  const input = event.target as HTMLInputElement;
  const control = this.registrationForm.get(['identityVerification', 'profilePic']);

  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    const maxSizeInMB = 5;
    const allowedTypes = ['image/jpeg', 'image/png'];

    // Clear previous value & preview
    control?.reset();
    // this.companyLogoPreview = '';

    if (!allowedTypes.includes(file.type)) {
      if(!this.updateMode){
      control?.setErrors({ invalidFileType: true });
      control?.markAsTouched();
      this.companyLogoPreview='';
      }
      control?.setErrors({ invalidFileType: true });
      control?.markAsTouched();
      return;
    } else if (file.size > maxSizeInMB * 1024 * 1024) {
      if(!this.updateMode){
      control?.setErrors({ invalidFileType: true });
      control?.markAsTouched();
      this.companyLogoPreview='';
      }
      control?.setErrors({ fileTooLarge: true });
      control?.markAsTouched();
      return;
    } else {
      control?.setValue(file);
      control?.markAsTouched();
      control?.updateValueAndValidity();
      this.companyLogoPreview = URL.createObjectURL(file); // ✅ Only set preview if valid
    }
  }

  input.value = ''; // Reset file input
}


  // File Validator
  fileValidator(allowedTypes: string[], maxSizeMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
 
      const file = control.value as File;
      const fileType = file.type;
      const fileSize = file.size / (1024 * 1024); // Convert to MB
 
      if (!allowedTypes.includes(fileType)) {
        return { invalidFileType: true };
      }
 
      if (fileSize > maxSizeMB) {
        return { fileTooLarge: true };
      }
 
      return null;
    };
  }

  // Toggle dropdown
  toggleDropdown() {
    this.showGovtBodyTypeDropdown = !this.showGovtBodyTypeDropdown;
  }
  // Select government type
  selectGovtType(type: string) {
    this.registrationForm.get('identityVerification.bodyType')?.setValue(type);
    this.showGovtBodyTypeDropdown = false;
  }
  // Convenience getters for form sections
  get identityVerification(): FormGroup {
    return this.registrationForm.get('identityVerification') as FormGroup;
  }

  get authorizedOfficer(): FormGroup {
    return this.registrationForm.get('authorizedOfficer') as FormGroup;
  }

  get documentationUploads(): FormGroup {
    return this.registrationForm.get('documentationUploads') as FormGroup;
  }

  get reviewInfo(): FormGroup {
    return this.registrationForm.get('reviewInfo') as FormGroup;
  }

  // Form control accessor
  formControl(section: string, control: string): AbstractControl {
    return this.registrationForm.get(`${section}.${control}`)!;
  }
  // Navigation methods
  totalSections = 4; // Update this based on your actual sections

  // Add this method to handle continue button
  nextSection(): void {

    // Validate current section before proceeding
    if (this.validateCurrentSection()) {
      if (this.currentSection < this.totalSections) {
        this.currentSection++;
        // this.updateProgressBar();
        this.hideAllSections();
        this.showCurrentSection();
        this.cd.detectChanges();

      } else {
        this.submitForm();
      }
    } else {
      this.markCurrentSectionAsTouched();
    }
  }

  private validateCurrentSection(): boolean {
    switch (this.currentSection) {
      case 1: return this.identityVerification.valid;
      case 2: return this.authorizedOfficer.valid;
      case 3: return this.documentationUploads.valid;
      case 4: return this.reviewInfo.valid;
      default: return true;
    }
  }

  private markCurrentSectionAsTouched(): void {
    switch (this.currentSection) {
      case 1: this.identityVerification.markAllAsTouched();
        this.scrollToFirstInvalidControl(this.registrationForm.get('identityVerification') as FormGroup);
        break;
      case 2: this.authorizedOfficer.markAllAsTouched();
        this.scrollToFirstInvalidControl(this.registrationForm.get('authorizedOfficer') as FormGroup);
        ; break;
      case 3: this.documentationUploads.markAllAsTouched();
        this.scrollToFirstInvalidControl(this.registrationForm.get('documentationUploads') as FormGroup);
        break;
      case 4: this.reviewInfo.markAllAsTouched();
        this.scrollToFirstInvalidControl(this.registrationForm.get('reviewInfo') as FormGroup);
        break;
    }
  }

  private scrollToFirstInvalidControl(form: FormGroup): void {
    const invalidControl = Object.keys(form.controls).find(controlName => {
      return form.get(controlName)?.invalid;
    });

    if (invalidControl) {
      // Find the form control in the DOM using name or id
      const element = document.querySelector(`[formControlName="${invalidControl}"]`);
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        (element as HTMLElement).focus(); // Optional
      }
    }
  }

  private updateProgressBar(): void {
    // const progressSteps = document.querySelectorAll('.progressBar .step');
    // progressSteps.forEach((step, index) => {
    //   step.classList.remove('active', 'completed');

    //   if (index < this.currentSection - 1) {
    //     step.classList.add('completed');
    //   } else if (index === this.currentSection - 1) {
    //     step.classList.add('active');
    //   }
    // });
  }

  private hideAllSections(): void {
    document.querySelectorAll('[id^="section"]').forEach(section => {
      (section as HTMLElement).style.display = 'none';
    });
  }

  private showCurrentSection(): void {
    const section = document.getElementById(`section${this.currentSection}`);
    if (section) {
      section.style.display = 'block';
    }
    this.updateButtonVisibility();
  }

  private updateButtonVisibility(): void {
    const btnNext = document.querySelector('.btn-next') as HTMLElement;
    const btnSubmit = document.querySelector('.btn-submit') as HTMLElement;

    if (this.currentSection === this.totalSections) {
      btnNext.style.display = 'none';
      btnSubmit.style.display = 'block';
    }
    // else {
    //   btnNext.style.display = 'block';
    //   btnSubmit.style.display = 'none';
    // }
  }



  selectedIdType: string = 'NATIONAL_ID';
  idDataCache: { [key: string]: any } = {};

selectIdType(idType: string): void {
  const representative = this.registrationForm.get('authorizedOfficer') as FormGroup;

  this.selectedIdType = idType;
  representative.get('idType')?.setValue(idType);

  // Always clear validators first
  representative.get('introductionLetter')?.clearValidators();
  representative.get('authorizationLetter')?.clearValidators();
  representative.get('idNumber')?.clearValidators();

  // Reset fields
  representative.get('introductionLetter')?.reset();
  representative.get('authorizationLetter')?.reset();
  representative.get('idNumber')?.reset();

  if (idType === 'PASSPORT_BIO_PAGE') {
    // Set validators for passport uploads
    representative.get('introductionLetter')?.setValidators([
      Validators.required,
      this.fileValidator(['image/jpeg', 'image/png'], 5),
    ]);
    representative.get('authorizationLetter')?.setValidators([
      Validators.required,
      this.fileValidator(['image/jpeg', 'image/png'], 5),
    ]);

    // Restore only if originally selected as passport
    if (this.originalIdType === 'PASSPORT_BIO_PAGE') {
      representative.get('introductionLetter')?.setValue(this.originalIntroductionLetter);
      representative.get('authorizationLetter')?.setValue(this.originalAuthorizationLetter);
       representative.get('authorizationLetter')?.clearValidators();
       representative.get('introductionLetter')?.clearValidators();
    }

  } else {
    // Set validator for ID number
    representative.get('idNumber')?.setValidators([Validators.required]);

    // Restore ID number only if same original type
    if (this.originalIdType === idType && this.originalIdNumber) {
      representative.get('idNumber')?.setValue(this.originalIdNumber);
    }
  }

  // Update validators
  representative.get('idNumber')?.updateValueAndValidity();
  representative.get('introductionLetter')?.updateValueAndValidity();
  representative.get('authorizationLetter')?.updateValueAndValidity();
}




  // private handleFileUpload(event: Event, controlName: string, allowedTypes: string[], maxSizeMB: number, formName: string, imageId: string): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     if (file.type.includes('image')) {
  //       this.registrationForm.get(formName)?.get(controlName)?.setValue(file);
  //       this.documentationUploads.get(formName)?.get(controlName)?.markAsTouched();
  //       this.registrationForm.get(formName)?.get(controlName)?.updateValueAndValidity();

  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const img = document.getElementById(imageId) as HTMLImageElement;
  //         if (img) {
  //           img.src = reader.result as string;
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }


  // }

  private handleFileUpload(
  event: Event,
  controlName: string,
  allowedTypes: string[],
  maxSizeMB: number,
  formName: string,
  imageId: string
): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const fileSizeMB = file.size / (1024 * 1024);

    const control = this.registrationForm.get(formName)?.get(controlName);

    // Clear previous value and errors before new upload
    control?.setValue(null);
    control?.setErrors(null);
    control?.markAsTouched();

    // Custom validations
    if (!allowedTypes.includes(file.type)) {
      control?.setErrors({ invalidFileType: true });
      return;
    }

    if (fileSizeMB > maxSizeMB) {
      control?.setErrors({ fileTooLarge: true });
      return;
    }

    // Only set value if file is valid
    control?.setValue(file);
    control?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      const img = document.getElementById(imageId) as HTMLImageElement;
      if (img) {
        img.src = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}

  initializeScript() {
    document.querySelectorAll('.custom-select').forEach(selectBox => {
      const display = selectBox.querySelector('.select-display');
      const options = selectBox.querySelectorAll('.dropdown-options-list');

      if (display) {
        // Show/hide dropdown
        display.addEventListener('click', (e) => {
          e.stopPropagation();
          selectBox.classList.toggle('active');
        });

        // Handle option selection
        options.forEach(option => {

          option.addEventListener('click', () => {
            display.querySelector('span')!.textContent = option.textContent;
            selectBox.classList.remove('active');
          });
        });

        // Close dropdown on clicking outside
        document.addEventListener('click', (event: any) => {
          if (!selectBox.contains(event.target)) {
            selectBox.classList.remove('active');
          }
        });
      }
    });
  }

  // File upload handlers
  onPresentativeIntroLetterUpload(event: Event, imageId: string): void {
    this.handleFileUpload(event, 'introductionLetter', ['image/jpeg', 'image/png'], 5, 'authorizedOfficer', imageId);
  }
  onPresentativeAuthLetterUpload(event: Event, imageId: string): void {
    this.handleFileUpload(event, 'authorizationLetter', ['image/jpeg', 'image/png'], 5, 'authorizedOfficer', imageId);
  }
  onIntroLetterUpload(event: Event, imageId: string): void {
    this.handleFileUpload(event, 'introLetterUrl', ['image/jpeg', 'image/png'], 5, 'documentationUploads', imageId);
  }

  onCacCertificateUpload(event: Event, imageId: string): void {
    this.handleFileUpload(event, 'certificateUrl', ['image/jpeg', 'image/png'], 5, 'documentationUploads', imageId);
  }

  onLetterOfIntentUpload(event: Event, imageId: string): void {
    this.handleFileUpload(event, 'letterOfIntentUrl', ['image/jpeg', 'image/png'], 5, 'documentationUploads', imageId);
  }

  onMouAgreementUpload(event: Event, imageId: string): void {
    this.handleFileUpload(event, 'mouUrl', ['image/jpeg', 'image/png'], 5, 'documentationUploads', imageId);
  }

  navigateToSection(sectionNumber: number): void {
    this.currentSection = sectionNumber;
    this.hideAllSections();
    this.showSection(sectionNumber);
  }
  private showSection(sectionNumber: number): void {
    const section = document.getElementById(`section${sectionNumber}`);
    if (section) {
      section.style.display = 'block';
    }
  }

  convertFormGroupToFormData(
    formGroup: FormGroup,
    formData = new FormData(),
    parentKey = ''
  ): FormData {

    //  let arr :string[] =['companyLogo','businessPhysicalAddressDetail','userPhysicalAddressDetail']
    const fileOnlyKeys = ['introLetterUrl', 'certificateUrl', 'letterOfIntentUrl', 'mouUrl','introductionLetter','authorizationLetter','profilePic'];

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (control instanceof FormGroup) {
        this.convertFormGroupToFormData(control, formData, fullKey); 
      } else {
        const value = control?.value;

        // Skip null/undefined unless it's a file
        if (value === null || value === undefined) return;

        const isFile = value instanceof File || value instanceof Blob;

        // Extract the plain key without parent prefix
        const plainKey = key;

        // If this key should only be included as file, and it's not a file — skip
        if (fileOnlyKeys.includes(plainKey) && !isFile) return;

        // Append files directly
        if (isFile) {
          formData.append(fullKey, value);
        } else {
          // For booleans/numbers/strings — skip keys already handled or listed in fileOnlyKeys
          if (!this.fileObjects.includes(fullKey)) {
            formData.append(fullKey, value.toString());
          }
        }
      }
    });

    return formData;
  }


  fileObjects = ['introLetterUrl', 'certificateUrl', 'letterOfIntentUrl', 'mouUrl']


  // removeFile(formName: string, controllName: string) {

  //   this.registrationForm.get(formName)?.get(controllName)?.setValue(null);
  // }

  removeFile(formName: string, controlName: string) {
  const control = this.registrationForm.get(formName)?.get(controlName);
  if (control) {
    control.setValue(null);
    control.setValidators(Validators.required);
    control.updateValueAndValidity();
    control.markAsTouched(); // Optional: to show error immediately
  }
}

isLoading = false;
  submitForm() {
    if (this.registrationForm.valid) {
      const formData = this.convertFormGroupToFormData(this.registrationForm);
       this.isLoading = true;
      let method = this.updateMode ? this.userService.updateGovernmentOrganization(formData) : this.userService.registerGovernmentOrganization(formData);
      method.subscribe(
        response => {
           this.isLoading = false;
          AppUtil.openToast('success', response.message, 'Success');
          this.router.navigate(['/Admin/Organization/representative-details']);
        },
        error => {
           this.isLoading = false;
          AppUtil.openToast('error', error.error.message, 'Error');
        }
      );
    } else {
      this.markCurrentSectionAsTouched();
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

}
