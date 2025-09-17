import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UsersService } from 'src/app/users/services/users.service';
import { BusinessType } from '../../models/business-type';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { PrivateOrganizationDetailsResponse } from 'src/app/organization/payloads/PrivateOrganizationResponse';
import { PrivateUserDetailsResponse } from 'src/app/organization/payloads/privateOrganizationDetailResponse';
import { PersonalInformationResponse } from '../../models/personal-information-response';
import { BusinessInformationResponse } from '../../payloads/BusinessInformationResponse';


@Component({
  selector: 'app-add-private-organization',
  templateUrl: './add-private-organization.component.html',
  styleUrls: ['./add-private-organization.component.scss']
})
export class AddPrivateOrganizationComponent implements OnInit, AfterViewInit, AfterViewChecked {
  registrationForm!: FormGroup;
  showIdentityTypeDropdown = true;
  showAddressVerificationDropdown = true;
  // agreeToTerms = false;
  submitted = false;
  currentSection = 1;
  appUtil = AppUtil
  organizationId: string = '';
  updateMode = false;
  privateOrganizationDetailsResponse: PrivateOrganizationDetailsResponse = new PrivateOrganizationDetailsResponse();
  public companyLogo: string = '';
  selectedBusinessTypeName: string = ''
  constructor(private sharedService: SharedService, private fb: FormBuilder, private userService: UsersService, private router: Router, private route: ActivatedRoute, private chnagedetector: ChangeDetectorRef) {
    sharedService.hideSideNav.next(true);
  }

  businessTypeId: any
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     if (!this.scriptInitialized && document.querySelector('.custom-select') && this.businessTypes.length > 0) {
  //        this.initializeScript();
  //       this.scriptInitialized = true;
  //       console.log('script initialized after data load');
  //     }
  //   }, 500)
  // }

  private scriptInitialized = false;

  ngAfterViewChecked(): void {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getBusinessTypes();

    this.route.queryParams.subscribe(params => {
      this.organizationId = params['id'];
      if (this.organizationId) {
        this.updateMode = true;
        this.sharedService.setTitle('Update Private Organization');
        this.getPrivateOrganizationDetails(this.organizationId);
      } else {
        this.updateMode = false;
        this.sharedService.setTitle('Add Private Organization');
      }
    });
    this.sharedService.setTitle('Add Private Organization');
  }

  selectedDirectorIdType: string = 'NIN_CARD';
  originalUtilityBillValuePersonal: string | null = null;
  originalAIGBlockCodeValuePersonal: string | null = null;
  originalUtilityBillValueBusiness: string | null = null;
  originalAIGBlockCodeValueBusiness: string | null = null;



  private activateDirectorIdentityTab(identityType: string): void {
    // Similar to activatePersonalIdentityTab but for director tabs
    const directorTabs = document.querySelectorAll('#director-tabs .nav-link');
    const directorTabPanes = document.querySelectorAll('#director-tabs-content .tab-pane');

    directorTabs.forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    directorTabPanes.forEach(pane => {
      pane.classList.remove('show', 'active');
    });

    let tabId = '';
    let paneId = '';

    switch (identityType) {
      case 'NIN_CARD':
        tabId = 'director-nin-tab';
        paneId = 'director-nin-pane';
        break;
      case 'PASSPORT':
        tabId = 'director-passport-tab';
        paneId = 'director-passport-pane';
        break;
      case 'DRIVERS_LICENCSE':
        tabId = 'director-license-tab';
        paneId = 'director-license-pane';
        break;
      default:
        tabId = 'director-nin-tab';
        paneId = 'director-nin-pane';
        break;
    }

    const activeTab = document.getElementById(tabId);
    const activePane = document.getElementById(paneId);

    if (activeTab && activePane) {
      activeTab.classList.add('active');
      activeTab.setAttribute('aria-selected', 'true');
      activePane.classList.add('show', 'active');
    }
  }

  // // Helper method to activate personal identity tab
  // private activatePersonalIdentityTab(identityType: string): void {
  //   // Remove active classes from personal tabs
  //   const personalTabs = document.querySelectorAll('#pills-tab .nav-link');
  //   const personalTabPanes = document.querySelectorAll('#pills-tabContent .tab-pane');

  //   personalTabs.forEach(tab => {
  //     tab.classList.remove('active');
  //     tab.setAttribute('aria-selected', 'false');
  //   });

  //   personalTabPanes.forEach(pane => {
  //     pane.classList.remove('show', 'active');
  //   });

  //   // Activate the correct tab based on identity type
  //   let tabId = '';
  //   let paneId = '';

  //   switch (identityType) {
  //     case 'NIN_CARD':
  //       tabId = 'pills-home-tab';
  //       paneId = 'pills-NINcard';
  //       break;
  //     case 'PASSPORT':
  //       tabId = 'pills-profile-tab';
  //       paneId = 'pills-Passport';
  //       break;
  //     case 'DRIVERS_LICENCSE':
  //       tabId = 'pills-contact-tab';
  //       paneId = 'pills-Driverslicense';
  //       break;
  //     default:
  //       // Default to NIN_CARD if no valid type
  //       tabId = 'pills-home-tab';
  //       paneId = 'pills-NINcard';
  //       break;
  //   }

  //   // Activate the selected tab
  //   const activeTab = document.getElementById(tabId);
  //   const activePane = document.getElementById(paneId);

  //   if (activeTab && activePane) {
  //     activeTab.classList.add('active');
  //     activeTab.setAttribute('aria-selected', 'true');
  //     activePane.classList.add('show', 'active');
  //   }
  // }

  // Helper method to set identity validators
  private setIdentityValidators(control: AbstractControl | null, identityType: string): void {
    if (!control) return;

    control.clearValidators();

    switch (identityType) {
      case 'PASSPORT':
        control.setValidators([
          Validators.required,
          Validators.pattern(/^[A-Z][0-9]{7}$/)
        ]);
        break;
      case 'NIN_CARD':
        control.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{11}$/)
        ]);
        break;
      case 'DRIVERS_LICENCSE':
        control.setValidators([
          Validators.required,
          Validators.pattern(/^[A-Za-z]{2}\d{12}$/)
        ]);
        break;
      default:
        control.clearValidators();
        break;
    }

    control.updateValueAndValidity();
  }
  //  selectedDirectorIdType: string = '';
  selectedPersonalIdType: string = '';

 

  // Simplified selectOption method
  selectOption(controlPath: string, value: any, formName: string): void {
    const control = this.registrationForm.get(controlPath);
    if (!control) return;

    // Update the selected type first
    if (formName === 'personalInformationRequest') {
      this.selectedPersonalIdType = value;
      const identityControl = this.registrationForm.get('personalInformationRequest.userIdentityNumber');
      this.updateIdentityField(identityControl, value, formName);
    } else if (formName === 'directorInformationRequest') {
      this.selectedDirectorIdType = value;
      const identityControl = this.registrationForm.get('directorInformationRequest.directorIdentityNumber');
      this.updateIdentityField(identityControl, value, formName);
    }

    // Set the control value
    control.setValue(value);
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  private updateIdentityField(control: AbstractControl | null, identityType: string, formName: string): void {
    if (!control) return;

    // Clear existing validators and value
    control.clearValidators();

    // Set new validators based on identity type
    switch (identityType) {
      case 'NIN_CARD':
        control.setValidators([Validators.required, Validators.pattern(/^[0-9]{11}$/)]);
        break;
      case 'PASSPORT':
        control.setValidators([Validators.required, Validators.pattern(/^[A-Z][0-9]{7}$/)]);
        break;
      case 'DRIVERS_LICENCSE':
        control.setValidators([Validators.required, Validators.pattern(/^[A-Za-z]{2}\d{12}$/)]);
        break;
    }

    // Set the value if updating existing data
    if (this.privateOrganizationDetailsResponse) {
      let existingValue = '';
      let existingType = '';

      if (formName === 'personalInformationRequest') {

        existingValue = this.privateOrganizationDetailsResponse.personalInformationResponse?.userIdentityNumber || '';
        existingType = this.privateOrganizationDetailsResponse.personalInformationResponse?.userIdentityType || '';
      } else if (formName === 'directorInformationRequest') {
        existingValue = this.privateOrganizationDetailsResponse.directorInformationResponse?.directorIdentityNumber || '';
        existingType = this.privateOrganizationDetailsResponse.directorInformationResponse?.directorIdentityType || '';
      }

      // Only set the existing value if the identity type matches
      if (existingValue && identityType === existingType) {
        control.setValue(existingValue);
      } else {
        control.setValue('');
      }
    }

    control.markAsTouched();
    control.updateValueAndValidity();
  }


  initializeForm(): void {
    this.registrationForm = this.fb.group({

      id: [''],
      personalInformationRequest: this.fb.group({
        companyName: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userIdentityType: ['NIN_CARD', Validators.required],
        userIdentityNumber: ['', [Validators.required, Validators.pattern(this.NIN_REGEX)]],
        userAddressVerificationType: ['UTILITY_BILL', Validators.required],
        userPhysicalAddressDetail: ['', [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
        userPhysicalAddressAIGBlockeCode: [''],
        companyLogo: ['', [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]]
      }),

      businessInformationRequest: this.fb.group({
        businessName: ['', Validators.required],
        businessPhysicalAddress: ['', Validators.required],
        registrationNumber: ['', Validators.required],
        taxIdentificationNumber: ['', Validators.required],
        businessType: ['', Validators.required],
        businessAddressVerificationType: [null, Validators.required],
        businessPhysicalAddressDetail: [null],
        businessPhysicalAddressAIGBlockeCode: ['']
      }),

      directorInformationRequest: this.fb.group({
        directorName: ['', Validators.required],
        directorIdentityType: ['NIN_CARD', Validators.required],
        directorPhysicalAddress: ['', Validators.required],
        // directorAddressVerificationType: [null, Validators.required],
        directorIdentityNumber: ['', [Validators.required, Validators.pattern(this.NIN_REGEX)]],
      }),
      reviewInfo: this.fb.group({
        finalAgreement: [null, Validators.required]
      })
    });
  }

  get userAIGBlockCode() {
    return this.personalInformationRequest.get('userPhysicalAddressAIGBlockeCode');
  }

  // Method to handle address method selectionutilityBillBackup: any = null;
  utilityBillBackup = {
    personal: null,
    business: null
  };

  aigBlockcodeBackup = {
    personal: null,
    business: null
  };
 


  originalValues: {
    personal: {
      utilityBill: string | null;
      aigBlockcode: string | null;
    };
    business: {
      utilityBill: string | null;
      aigBlockcode: string | null;
    };
  } = {
      personal: {
        utilityBill: null,
        aigBlockcode: null
      },
      business: {
        utilityBill: null,
        aigBlockcode: null
      }
    };


  // Updated selectAddressMethod function
  selectAddressMethod(
    formName: 'personal' | 'business',
    method: 'AIG_BLOCKCODE' | 'UTILITY_BILL'
  ): void {
    const formGroup = this.registrationForm.get(`${formName}InformationRequest`) as FormGroup;

    const verificationTypeField = this.getVerificationTypeField(formName);
    const addressDetailField = this.getAddressDetailField(formName);
    const blockCodeField = this.getBlockCodeField(formName);

    // Set value
    formGroup.patchValue({
      [verificationTypeField]: method,
      [addressDetailField]: null,
      [blockCodeField]: null
    });

    // Clear all validators first
    formGroup.get(addressDetailField)?.clearValidators();
    formGroup.get(blockCodeField)?.clearValidators();

    // Set validators dynamically
    if (method === 'UTILITY_BILL') {
      formGroup.get(addressDetailField)?.setValidators([
        Validators.required,
        this.fileValidator(['image/jpeg', 'image/png'], 5)
      ]);
    } else if (method === 'AIG_BLOCKCODE') {
      formGroup.get(blockCodeField)?.setValidators([
        Validators.required,
        Validators.pattern(/^(?:[A-Z0-9]{5}-)?[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}$/)
      ]);
    }

    // Get the correct field to update
    let path: AbstractControl | null = formGroup.get(
      method === 'UTILITY_BILL' ? addressDetailField : blockCodeField
    );

    // Get the correct response data based on form type
    const responseData = formName === 'personal'
      ? this.privateOrganizationDetailsResponse?.personalInformationResponse
      : this.privateOrganizationDetailsResponse?.businessInformationResponse;

    if (formName === 'personal') {
      const personalData = responseData as PersonalInformationResponse;
      if (personalData?.userAddressVerificationType === method) {
        path?.setValue(
          method === 'UTILITY_BILL'
            ? this.originalValues.personal.utilityBill
            : this.originalValues.personal.aigBlockcode
        );
      } else {
        path?.setValue('');
      }
    } else {
      const businessData = responseData as BusinessInformationResponse;
      if (businessData?.businessAddressVerificationType === method) {
        path?.setValue(
          method === 'UTILITY_BILL'
            ? this.originalValues.business.utilityBill
            : this.originalValues.business.aigBlockcode
        );
      } else {
        path?.setValue('');
      }
    }


    // Update validity
    formGroup.get(addressDetailField)?.updateValueAndValidity();
    formGroup.get(blockCodeField)?.updateValueAndValidity();
  }

  // Updated getPrivateOrganizationDetails method (key changes in the address handling section)
  getPrivateOrganizationDetails(id: any) {
    this.userService.getPrivateUserDetails(id).subscribe((data: any) => {
      const res: PrivateUserDetailsResponse = data.response;
      this.privateOrganizationDetailsResponse = res;
      this.updateMode = true;
      this.sharedService.setTitle('Update Private Organization');

      this.registrationForm.patchValue({
        id: res.organizationId,
      });

      const personalGroup = this.registrationForm.get('personalInformationRequest') as FormGroup;
      const personalIdentityType = res.personalInformationResponse?.userIdentityType || 'NIN_CARD';

      // Set personal identity type first
      this.selectedPersonalIdType = personalIdentityType;

      personalGroup.patchValue({
        companyName: res.companyName || '',
        email: res.email || '',
        phoneNumber: res.phoneNumber || '',
        profilePicture: res.profilePicture || '',
        firstName: res.personalInformationResponse?.firstName || '',
        lastName: res.personalInformationResponse?.lastName || '',
        userIdentityType: personalIdentityType,
        userIdentityNumber: res.personalInformationResponse?.userIdentityNumber || '',
        userAddressVerificationType: res.personalInformationResponse?.userAddressVerificationType || 'AIG_BLOCK',
        userPhysicalAddressDetail: res.personalInformationResponse?.userPhysicalAddressDetail || '',
        userPhysicalAddressAIGBlockeCode: res.personalInformationResponse?.userPhysicalAddressDetail || ''
      });

      // Set validators for personal identity
      const personalIdentityControl = personalGroup.get('userIdentityNumber');
      this.setIdentityValidators(personalIdentityControl, personalIdentityType);

      // Handle personal address verification types and store original values
      const personalAddressType = res.personalInformationResponse?.userAddressVerificationType;
      if (personalAddressType === 'UTILITY_BILL') {
        personalGroup.get('userPhysicalAddressDetail')?.setValidators([
          Validators.required,
          this.fileValidator(['image/jpeg', 'image/png'], 5)
        ]);
        personalGroup.get('userPhysicalAddressAIGBlockeCode')?.clearValidators();
        // Store original personal utility bill value
        this.originalValues.personal.utilityBill = res.personalInformationResponse?.userPhysicalAddressDetail || null;
      } else if (personalAddressType === 'AIG_BLOCKCODE') {
        personalGroup.get('userPhysicalAddressAIGBlockeCode')?.setValidators([
          Validators.required,
          Validators.pattern(/^(?:[A-Z0-9]{5}-)?[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}$/)
        ]);
        personalGroup.get('userPhysicalAddressDetail')?.clearValidators();
        // Store original personal AIG block code value
        this.originalValues.personal.aigBlockcode = res.personalInformationResponse?.userPhysicalAddressDetail || null;
      }
      personalGroup.get('userPhysicalAddressDetail')?.updateValueAndValidity();
      personalGroup.get('userPhysicalAddressAIGBlockeCode')?.updateValueAndValidity();

      // Business group handling...
      const businessGroup = this.registrationForm.get('businessInformationRequest') as FormGroup;
      businessGroup.patchValue({
        businessName: res.businessInformationResponse?.businessName || '',
        registrationNumber: res.businessInformationResponse?.registrationNumber || '',
        taxIdentificationNumber: res.businessInformationResponse?.taxIdentificationNumber || '',
        businessAddressVerificationType: res.businessInformationResponse?.businessAddressVerificationType,
        businessPhysicalAddress: res.businessInformationResponse?.businessPhysicalAddress || '',
        businessPhysicalAddressDetail: res.businessInformationResponse?.businessPhysicalAddressDetail || '',
        businessPhysicalAddressAIGBlockeCode: res.businessInformationResponse?.businessPhysicalAddressDetail || ''
      });

      // Handle business address verification types and store original values
      const businessAddressType = res.businessInformationResponse?.businessAddressVerificationType;
      if (businessAddressType === 'UTILITY_BILL') {
        businessGroup.get('businessPhysicalAddressDetail')?.setValidators([
          Validators.required,
          this.fileValidator(['image/jpeg', 'image/png'], 5)
        ]);
        businessGroup.get('businessPhysicalAddressAIGBlockeCode')?.clearValidators();
        // Store original business utility bill value
        this.originalValues.business.utilityBill = res.businessInformationResponse?.businessPhysicalAddressDetail || null;
      } else if (businessAddressType === 'AIG_BLOCKCODE') {
        businessGroup.get('businessPhysicalAddressAIGBlockeCode')?.setValidators([
          Validators.required,
          Validators.pattern(/^(?:[A-Z0-9]{5}-)?[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}$/)
        ]);
        businessGroup.get('businessPhysicalAddressDetail')?.clearValidators();
        // Store original business AIG block code value
        this.originalValues.business.aigBlockcode = res.businessInformationResponse?.businessPhysicalAddressDetail || null;
      }
      businessGroup.get('businessPhysicalAddressDetail')?.updateValueAndValidity();
      businessGroup.get('businessPhysicalAddressAIGBlockeCode')?.updateValueAndValidity();

      // this.businessTypeId = res.businessInformationResponse?.businessType || '';
       this.businessTypeId = res.businessInformationResponse?.businessType || '';
    
    // ADD THIS SECTION:
    if (this.businessTypeId && this.businessTypes.length > 0) {
      const selectedType = this.businessTypes.find(type => type.id === this.businessTypeId);
      if (selectedType) {
        this.selectedBusinessTypeName = selectedType.type;
        
        const businessGroup = this.registrationForm.get('businessInformationRequest') as FormGroup;
        businessGroup.patchValue({
          businessType: this.businessTypeId
        });
      }
    }

      // DIRECTOR SECTION - FIXED
      const directorGroup = this.registrationForm.get('directorInformationRequest') as FormGroup;
      const directorIdentityType: string = res.directorInformationResponse?.directorIdentityType || 'NIN_CARD';

      // Set director identity type first
      this.selectedDirectorIdType = directorIdentityType;

      directorGroup.patchValue({
        directorName: res.directorInformationResponse?.directorName || '',
        directorIdentityType: directorIdentityType,
        directorIdentityNumber: res.directorInformationResponse?.directorIdentityNumber || '',
        directorPhysicalAddress: res.directorInformationResponse?.directorPhysicalAddress || ''
      });

      // Set validators for director identity
      const directorIdentityControl = directorGroup.get('directorIdentityNumber');
      this.setIdentityValidators(directorIdentityControl, directorIdentityType);

      this.registrationForm.get('reviewInfo')?.patchValue({
        finalAgreement: null
      });

      const companyLogoControl = personalGroup.get('companyLogo');
      if (res.profilePicture) {
        this.companyLogo = res.profilePicture;
        companyLogoControl?.clearValidators();
        companyLogoControl?.updateValueAndValidity();
      }
    });
  }

  fileValidator(allowedTypes: string[], maxSizeMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (!file) return null;

      // Validate file type
      if (file.type && !allowedTypes.includes(file.type)) {
        return { invalidFiletype: true };
      }

      // Validate file size
      if (file.size && file.size > maxSizeMB * 1024 * 1024) {
        return { maxFileSizeExceeded: true };
      }

      return null;
    };
  }


  // Handle file upload
  onFileChange(event: Event, formName: 'personal' | 'business', imageId: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];

      // Set the file in the form control
      const formGroup = this.registrationForm.get(`${formName}InformationRequest`) as FormGroup;
      const addressDetailField = this.getAddressDetailField(formName);

      if (formGroup) {
        formGroup.get(addressDetailField)?.setValue(file);
        formGroup.get(addressDetailField)?.markAsTouched();
        formGroup.get(addressDetailField)?.updateValueAndValidity();
      }
      if (formGroup.get(addressDetailField)?.valid) {
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
  }

  removeFile(formName: 'personal' | 'business'): void {
    const formGroup = this.registrationForm.get(`${formName}InformationRequest`) as FormGroup;
    const addressDetailField = this.getAddressDetailField(formName);
    if (formGroup) {
      formGroup.get(addressDetailField)?.setValue(null);
      formGroup.get(addressDetailField)?.markAsUntouched();
      formGroup.get(addressDetailField)?.updateValueAndValidity();

    }
  }

  onFileChangeLogo(event: Event, imageId: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];

      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSizeMB = 5;
      const fileType = file.type;
      const fileSizeMB = file.size / (1024 * 1024);

      const formGroup = this.registrationForm.get('personalInformationRequest') as FormGroup;
      const control = formGroup.get('companyLogo');

      if (!allowedTypes.includes(fileType)) {
        if (!this.updateMode) {
          control?.setErrors({ invalidFileType: true });
          control?.markAsTouched();
          this.companyLogo = '';
          return;
        }
        control?.setErrors({ invalidFileType: true });
        control?.markAsTouched();
        return;
      }


      if (fileSizeMB > maxSizeMB) {
        if (!this.updateMode) {
          control?.setErrors({ fileTooLarge: true });
          control?.markAsTouched();
          this.companyLogo = '';
          return;
        }
        control?.setErrors({ fileTooLarge: true });
        control?.markAsTouched();
        return;
      }

      control?.setValue(file);
      control?.setErrors(null);

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


  // Show error message condition
  showAddressError(formName: 'personal' | 'business'): boolean {
    const formGroup = this.registrationForm.get(`${formName}InformationRequest`);
    if (!formGroup?.touched) return false;

    const verificationTypeField = this.getVerificationTypeField(formName);
    const addressDetailField = this.getAddressDetailField(formName);
    const blockCodeField = this.getBlockCodeField(formName);

    const method = formGroup.get(verificationTypeField)?.value;
    const file = formGroup.get(addressDetailField)?.value;
    const code = formGroup.get(blockCodeField)?.value;

    if (!method) return true;

    return (method === 'AIG blockcode') ? !code : !file;
  }

  // Get appropriate error message
  getAddressErrorMessage(formName: 'business' | 'personal'): string {

    const form = this.registrationForm.get(`${formName}InformationRequest`) as FormGroup;
    const type = form.get(this.getVerificationTypeField(formName))?.value;

    if (!type) {
      return 'Please select address verification type';
    }

    if (type === 'UTILITY_BILL' && form.get(this.getAddressDetailField(formName))?.hasError('required')) {
      return 'Utility bill is required';
    }

    if (type === 'AIG_BLOCKCODE' && form.get(this.getBlockCodeField(formName))?.hasError('required')) {
      return 'AIG blockcode is required';
    }

    return '';
  }


  // Helper methods to get field names
  private getVerificationTypeField(formName: string): string {
    if (formName === 'personal') return 'userAddressVerificationType';
    if (formName === 'business') return 'businessAddressVerificationType';

    throw new Error(`Unsupported form name: ${formName}`);
  }

  private getAddressDetailField(formName: string): string {
    if (formName === 'personal') return 'userPhysicalAddressDetail';
    if (formName === 'business') return 'businessPhysicalAddressDetail';

    throw new Error(`Unsupported form name: ${formName}`);
  }

  private getBlockCodeField(formName: string): string {
    if (formName === 'personal') return 'userPhysicalAddressAIGBlockeCode';
    if (formName === 'business') return 'businessPhysicalAddressAIGBlockeCode';
    throw new Error(`Unsupported form name: ${formName}`);
  }



  get f() {
    return this.registrationForm.controls;
  }
  get personalInformationRequest() {
    return this.registrationForm.get('personalInformationRequest') as FormGroup;
  }

  get businessInformationRequest() {
    return this.registrationForm.get('businessInformationRequest') as FormGroup;
  }

  get directorInformationRequest() {
    return this.registrationForm.get('directorInformationRequest') as FormGroup;
  }
  get reviewInfoRequest() {
    return this.registrationForm.get('reviewInfo') as FormGroup;
  }


  toggleDropdown(dropdownType: string): void {
    if (dropdownType === 'identityType') {
      this.showIdentityTypeDropdown = !this.showIdentityTypeDropdown;
      this.showAddressVerificationDropdown = false;
    } else if (dropdownType === 'addressVerification') {
      this.showAddressVerificationDropdown = !this.showAddressVerificationDropdown;
      this.showIdentityTypeDropdown = false;
    } else {
      this.showIdentityTypeDropdown = false;
      this.showAddressVerificationDropdown = false;
    }
  }
  NIN_REGEX = /^\d{11}$/;
  PASSPORT_REGEX = /^[A-Z]{1}[0-9]{7}$/;
  DRIVER_LICENCE_REGEX = /^[A-Za-z]{2}\d{12}$/;



  navigateToSection(sectionNumber: number): void {
    this.currentSection = sectionNumber;
    this.hideAllSections();
    this.showSection(sectionNumber);
  }

  private hideAllSections(): void {
    const sections = document.querySelectorAll('[id^="section"]');
    sections.forEach(section => {
      (section as HTMLElement).style.display = 'none';
    });
  }

  private showSection(sectionNumber: number): void {
    const section = document.getElementById(`section${sectionNumber}`);
    if (section) {
      section.style.display = 'block';
    }
  }



  prevSection(): void {
    if (this.currentSection > 1) {
      this.currentSection--;
      this.navigateToSection(this.currentSection);
    }
  }

  private validateCurrentSection(): boolean {
    switch (this.currentSection) {
      case 1:
        return this.registrationForm.get('personalInformationRequest')?.valid || false;
      case 2:
        return this.registrationForm.get('businessInformationRequest')?.valid || false;
      case 3:
        return this.registrationForm.get('directorInformationRequest')?.valid || false;
      default:
        return true;
    }
  }

  private markCurrentSectionAsTouched(): void {
    switch (this.currentSection) {
      case 1:
        (this.registrationForm.get('personalInformationRequest') as FormGroup).markAllAsTouched();
        this.scrollToFirstInvalidControl(this.registrationForm.get('personalInformationRequest') as FormGroup);
        break;
      case 2:
        (this.registrationForm.get('businessInformationRequest') as FormGroup).markAllAsTouched();
        this.scrollToFirstInvalidControl(this.registrationForm.get('businessInformationRequest') as FormGroup);
        break;
      case 3:
        (this.registrationForm.get('directorInformationRequest') as FormGroup).markAllAsTouched();
        this.scrollToFirstInvalidControl(this.registrationForm.get('directorInformationRequest') as FormGroup);
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


  // Add this to your component class
  get progressStatus() {
    return {
      step1: {
        completed: this.personalInformationRequest.valid,
        active: this.currentSection === 1
      },
      step2: {
        completed: this.businessInformationRequest.valid,
        active: this.currentSection === 2
      },
      step3: {
        completed: this.directorInformationRequest.valid,
        active: this.currentSection === 3
      },
      step4: {
        completed: false, // Review step is never "completed" until submission
        active: this.currentSection === 4
      }
    };
  }


  // Add this method to your component
  canProceedToNextSection(): boolean {
    switch (this.currentSection) {
      case 1:
        return this.personalInformationRequest.valid
      case 2:
        return this.businessInformationRequest.valid;
      case 3:
        return this.directorInformationRequest.valid;
      case 4:
        return this.reviewInfoRequest.valid;
      default:
        return true;
    }
  }

  // Modify your nextSection method
  nextSection(): void {
    setTimeout(() => {
      if (this.currentSection < 4 && this.canProceedToNextSection()) {
        this.currentSection++;
        this.navigateToSection(this.currentSection);
      } else {
        this.markCurrentSectionAsTouched();
      }
    }, 100);
  }

  isLoading = false;

  submitForm() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const formData = this.prepareFormData();
      this.isLoading = true;
      let method = this.updateMode ? this.userService.updatePrivateOrganization(formData) : this.userService.registerPrivateOrganization(formData);
      method.subscribe(
        response => {
          this.isLoading = false;
          this.router.navigate(['/Admin/Organization/representative-details']);
          AppUtil.openToast('success', response.message, 'Success');
          this.submitted = false;
          this.registrationForm.reset();
        },
        error => {
          this.isLoading = false;
          AppUtil.openToast('error', error.error.message, 'Error');
          setTimeout(() => {
            this.submitted = false;

          }, 100);
        }
      );
    } else {
      this.registrationForm.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }


  prepareFormData(): FormData {

    let arr: string[] = ['companyLogo', 'businessPhysicalAddressDetail', 'userPhysicalAddressDetail']
    const formData = new FormData();
    const formValues = this.registrationForm.value;

    // Add all non-file fields
    Object.keys(formValues).forEach(groupName => {
      const group = formValues[groupName];

      if (group === null || typeof group !== 'object') {
        return;
      }

      Object.keys(group).forEach(fieldName => {
        const value = group[fieldName];
        // Skip file fields and empty values
        if (!(value instanceof File) && value !== null && value !== undefined) {
          if (!arr.includes(fieldName)) {
            formData.append(`${groupName}.${fieldName}`, value);
          }
        }
      });
    });

    this.addFileToFormData(formData, 'personalInformationRequest.userPhysicalAddressDetail');
    this.addFileToFormData(formData, 'businessInformationRequest.businessPhysicalAddressDetail');
    this.addFileToFormData(formData, 'directorInformationRequest.directorPhysicalAddressDetail');
    this.addFileToFormData(formData, 'personalInformationRequest.companyLogo');
    // Set organization ID if in update mode
    if (this.updateMode && this.privateOrganizationDetailsResponse?.organizationId) {
      formData.append('id', this.privateOrganizationDetailsResponse.organizationId);
    }

    return formData;
  }

  private addFileToFormData(formData: FormData, controlPath: string): void {
    const control = this.registrationForm.get(controlPath);
    if (control?.value instanceof File) {
      formData.append(controlPath, control.value, control.value.name);
    }
  }

  private appendFileOrEmpty(formData: FormData, controlPath: string): void {
    const control = this.getControl(controlPath);
    const value = control?.value;

    if (value instanceof File) {
      formData.append(controlPath, value, value.name);
    } else {
      // If the field has a Cloudinary URL (unchanged), send blank
      formData.set(controlPath, '');
    }
  }


  private getControl(path: string): AbstractControl | null {
    const parts = path.split('.');
    let control: AbstractControl | null = this.registrationForm;

    for (const part of parts) {
      control = control?.get(part) || null;
      if (!control) break;
    }

    return control;
  }

  businessTypes: BusinessType[] = [];

  //get business types
  public getBusinessTypes() {
    this.userService.getBusinessTypes().subscribe(
      {
        next: (data: any) => {
          this.businessTypes = data.businessType;
          setTimeout(() => {
            let el = document.getElementById('businessType' + this.businessTypeId) as HTMLElement
            if (el) {
              el.click();
            }
          }, 500);
        }
      }
    )
  }
  // selectBusinessType(businessType: BusinessType): void {
  //   const control = this.registrationForm
  //     .get('businessInformationRequest.businessType');

  //   if (control) {
  //     control.setValue(businessType.id);               // Set the selected value
  //     control.markAsTouched();                         // Mark as touched (for error UI)
  //     control.updateValueAndValidity();                // Trigger validation manually
  //   }
  // }

private clickListener: ((event: MouseEvent) => void) | undefined;

// 2. Replace your selectBusinessType method
selectBusinessType(businessType: BusinessType): void {
  const control = this.registrationForm.get('businessInformationRequest.businessType');
  
  if (control) {
    control.setValue(businessType.id);
    control.markAsTouched();
    control.updateValueAndValidity();
    
    // Update the displayed name
    this.selectedBusinessTypeName = businessType.type;
    
    // Update the display text in DOM
    const displayElement = document.querySelector('#selectType span');
    if (displayElement) {
      displayElement.textContent = businessType.type;
    }
    
    // Close the dropdown
    const selectBox = document.querySelector('.custom-select');
    if (selectBox) {
      selectBox.classList.remove('active');
    }
  }
}

// 3. Update your getBusinessTypes method
// public getBusinessTypes() {
//   this.userService.getBusinessTypes().subscribe({
//     next: (data: any) => {
//       this.businessTypes = data.businessType;
      
//       // Use ChangeDetectorRef to ensure DOM is updated
//       this.chnagedetector.detectChanges();
      
//       // Initialize script after data is loaded and DOM is updated
//       setTimeout(() => {
//         this.initializeScript();
        
//         // Set pre-selected business type if in update mode
//         if (this.businessTypeId) {
//           const selectedType = this.businessTypes.find(type => type.id === this.businessTypeId);
//           if (selectedType) {
//             this.selectedBusinessTypeName = selectedType.type;
//             this.chnagedetector.detectChanges();
//           }
//         }
//       }, 100);
//     },
//     error: (error) => {
//       console.error('Error loading business types:', error);
//     }
//   });
// }

// 4. Completely rewrite the initializeScript method
initializeScript() {
  // Cleanup existing listeners
  this.cleanupEventListeners();
  
  const selectBox = document.querySelector('.custom-select');
  const display = document.querySelector('.select-display');
  
  if (!selectBox || !display) {
    console.warn('Dropdown elements not found');
    return;
  }
  
  // Remove existing active class
  selectBox.classList.remove('active');
  
  // Create new click listener for display
  const displayClickListener = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    selectBox.classList.toggle('active');
  };
  
  // Create document click listener to close dropdown
  this.clickListener = (event: Event) => {
    const target = event.target as Element;
    if (selectBox && !selectBox.contains(target)) {
      selectBox.classList.remove('active');
    }
  };
  
  // Add event listeners
  display.addEventListener('click', displayClickListener);
  document.addEventListener('click', this.clickListener);
  
  // Store references for cleanup
  (display as any)._clickListener = displayClickListener;
  
  this.scriptInitialized = true;
  console.log('Dropdown script initialized successfully');
}

// 5. Add cleanup method
private cleanupEventListeners(): void {
  const display = document.querySelector('.select-display');
  
  if (display && (display as any)._clickListener) {
    display.removeEventListener('click', (display as any)._clickListener);
    (display as any)._clickListener = null;
  }
  
  if (this.clickListener) {
    document.removeEventListener('click', this.clickListener);
    this.clickListener = undefined;
  }
}



// 7. Update ngOnDestroy (add if not exists)
// ngOnDestroy(): void {
//   this.cleanupEventListeners();
// }

// Add these properties to your component class
private displayClickListener: ((event: Event) => void) | undefined;
// private clickListener: ((event: MouseEvent) => void) | undefined;
// private scriptInitialized = false;

// Replace your existing methods with these:

// cleanupEventListeners(): void {
//   const display = document.querySelector('.select-display');
  
//   if (display && this.displayClickListener) {
//     display.removeEventListener('click', this.displayClickListener);
//   }
  
//   if (this.clickListener) {
//     document.removeEventListener('click', this.clickListener);
//   }
  
//   this.displayClickListener = undefined;
//   this.clickListener = undefined;
// }

// selectBusinessType(businessType: BusinessType): void {
//   const control = this.registrationForm.get('businessInformationRequest.businessType');
  
//   if (control) {
//     control.setValue(businessType.id);
//     control.markAsTouched();
//     control.updateValueAndValidity();
    
//     this.selectedBusinessTypeName = businessType.type;
//     this.businessTypeId = businessType.id;
    
//     const selectBox = document.querySelector('.custom-select');
//     if (selectBox) {
//       selectBox.classList.remove('active');
//     }
//   }
// }

// initializeScript(): void {
//   this.cleanupEventListeners();
  
//   const selectBox = document.querySelector('.custom-select');
//   const display = document.querySelector('.select-display');
  
//   if (!selectBox || !display) {
//     console.warn('Dropdown elements not found');
//     return;
//   }
  
//   selectBox.classList.remove('active');
  
//   this.displayClickListener = (e: Event) => {
//     e.stopPropagation();
//     e.preventDefault();
//     selectBox.classList.toggle('active');
//   };
  
//   this.clickListener = (event: Event) => {
//     const target = event.target as Element;
//     if (selectBox && !selectBox.contains(target)) {
//       selectBox.classList.remove('active');
//     }
//   };
  
//   display.addEventListener('click', this.displayClickListener);
//   document.addEventListener('click', this.clickListener);
  
//   this.scriptInitialized = true;
//   console.log('Dropdown script initialized successfully');
// }

private retryInitialization(attempts = 0, maxAttempts = 5): void {
  const delay = Math.pow(2, attempts) * 100;
  
  setTimeout(() => {
    const selectBox = document.querySelector('.custom-select');
    const hasData = this.businessTypes && this.businessTypes.length > 0;
    
    if (!this.scriptInitialized && selectBox && hasData) {
      this.initializeScript();
      console.log('Dropdown initialized successfully');
    } else if (attempts < maxAttempts) {
      console.log(`Retry attempt ${attempts + 1}/${maxAttempts}`);
      this.retryInitialization(attempts + 1, maxAttempts);
    } else {
      console.error('Failed to initialize dropdown after maximum attempts');
    }
  }, delay);
}

ngAfterViewInit(): void {
  this.retryInitialization();
}

ngOnDestroy(): void {
  this.cleanupEventListeners();
}

}


