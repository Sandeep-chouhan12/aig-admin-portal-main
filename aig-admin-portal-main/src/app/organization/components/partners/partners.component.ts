import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiUsersService } from '../../services/api-users.service';
import { Partnerservice } from '../../services/partner.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Partner } from '../../models/partner';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { Constants } from 'src/app/shared/utils/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  // Models and FormGroups
  apiPartnersCol: any; // Assuming it's an interface or class for partner columns
  partner = new Partner();
  partners: Partner[] = [];
  partnerForm!: FormGroup;
  updatePartnerForm!: FormGroup;
  partnerId: number = 0;


  // Pagination
  pageRequest = new PageRequest();
  paginationManager: PaginationManager = new PaginationManager();
  constant = Constants;
  appUtil = AppUtil;

  permissionType = PermissionType
  permissionTitle = PermissionTitle

  constructor(
    private partnerService: Partnerservice,
    private formBuilder: FormBuilder,
    public loaderService: LoaderService,
  ) {
    // Initialize form groups
    this.partnerForm = this.formBuilder.group({
      partnerName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      partnerImage: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
    });
    this.updatePartnerForm = this.formBuilder.group({
      partnerName: ['', [Validators.required], [FormsValidator.nameValidator()]],
    });
  }

  ngOnInit(): void {
    // Load partners on component initialization
    this.getAllPartners();
  }

  public getAllPartners() {
    // Fetch all partners from the service
    this.partnerService.getAllPartners(this.pageRequest).subscribe({
      next: (data: any) => {
        // Update component properties
        this.partners = data.partners.content;
        this.paginationManager.setPageData(data.partners);
        this.pageRequest.pageNo = data.partners.pageable.pageNumber;
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error');
      },
    });
  }

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

  public addPartner() {
    // Validate form before adding a partner
    if (this.partnerForm.invalid) {
      AppUtil.checkFormValidOrNot(this.partnerForm);
      return;
    } else {
      // Add a new partner
      this.toggleLoader();
      this.partnerService.addPartner(this.partner).subscribe({
        next: (data: any) => {
          // Reset form and update partners list
          this.partnerForm.reset();
          this.partner.partnerImage = null;
          this.imagePreview = null;
          this.getAllPartners();
          // Dismiss modal and show success toast
          AppUtil.modalDismiss('add-modal-close');
          AppUtil.openToast('success', data.message, 'Success');
          this.toggleLoader();
        },
        error: (er: any) => {
          // Show error toast
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        },
      });
    }
    
  }

  public deletePartner() {
    // Delete a partner
    this.toggleLoader();
    this.partnerService.deletePartner(this.partnerId).subscribe({
      next: (data: any) => {
        // Update partners list, dismiss modal, and show success toast
        if (this.partners.length == 1 && this.pageRequest.pageNo > 0) this.pageRequest.pageNo--
        this.getAllPartners();

        AppUtil.modalDismiss('delete-modal-close');
        AppUtil.openToast('success', data.message, 'Success');
        this.toggleLoader();
      },
      error: (er: any) => {
        // Show error toast
        AppUtil.openToast('error', er.error.message, 'Error');
        this.toggleLoader();
      },
    });
  }

  public updatePartner() {
    // Update an existing partner
    if (this.updatePartnerForm.invalid) {
      AppUtil.checkFormValidOrNot(this.updatePartnerForm);
      return;
    } else {
      this.toggleLoader();
      this.partnerService.updatePartner(this.partner).subscribe({
        next: (data: any) => {
          this.getAllPartners();
          this.partner.partnerImage = null;
          this.imagePreview = null;
          AppUtil.modalDismiss('edit-modal-close');
          AppUtil.openToast('success', data.message, 'Success');
          this.toggleLoader();
        },
        error: (er: any) => {
          // Show error toast
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        },
      });
    }
  }
  imageError: any;
  imagePreview: any;

  setImage(
    event: any): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSizeMB = file.size / (1024 * 1024);

      const control = this.partnerForm.get('partnerImage');
      const allowedTypes = ['image/jpeg', 'image/png'];

      // Clear previous value and errors before new upload
      control?.setValue(null);
      control?.setErrors(null);
      control?.markAsTouched();

      // Custom validations
      if (!allowedTypes.includes(file.type)) {
        control?.setErrors({ invalidFileType: true });
        return;
      }

      if (fileSizeMB > 5) {
        control?.setErrors({ fileTooLarge: true });
        return;
      }

      // Only set value if file is valid
      control?.setValue(file);
      control?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.partner.partnerImage = file
      };
      reader.readAsDataURL(file);
    }
  }
  resetFileInput(event: Event) {
    // Clear file input so selecting the same file will still trigger change
    (event.target as HTMLInputElement).value = '';
  }

  public getPartnerById(data: any) {
    this.partner = JSON.parse(JSON.stringify(data));
    this.imagePreview = this.partner.partnerImage || null;
  }

  public resetPartner() {
    // Reset the partner object
    this.imageError = '';
    this.partner = new Partner();
    this.partnerForm.reset();
  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }
}
