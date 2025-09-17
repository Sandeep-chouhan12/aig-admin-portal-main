
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressTypeService } from '../service/address-type.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { AddressType } from '../model/address-type';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { LoaderService } from 'src/app/shared/services/loader.service';


@Component({
  selector: 'app-address-type',
  templateUrl: './address-type.component.html',
  styleUrls: ['./address-type.component.scss']
})
export class AddressTypeComponent {

  addressForm!: FormGroup;
  submitted = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  name: string = '';
  pageRequest: PageRequest = new PageRequest();
  isLoading: boolean = false;
  paginationManager: PaginationManager = new PaginationManager();

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  constructor(private fb: FormBuilder, private addressTypeService: AddressTypeService,public loaderService:LoaderService) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      image: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      id: [null]
    });

    this.loadAddressTypes();
  }


  fileValidator(allowedTypes: string[], maxSize: number) {
    return (control: AbstractControl) => {
      const file = control.value;
      if (file) {
        const fileType = file.type;
        if (!allowedTypes.includes(fileType)) {
          return { invalidFileType: true };
        }
        if (file.size > maxSize * 1024 * 1024) {
          return { fileTooBig: true };
        }
      }
      return null;
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Validate manually before patching
    if (!allowedTypes.includes(file.type)) {
      this.addressForm.get('image')?.setErrors({ invalidFileType: true });
      this.addressForm.get('image')?.markAsTouched();
      return;
    }

    if (file.size > maxSize) {
      this.addressForm.get('image')?.setErrors({ fileTooBig: true });
      this.addressForm.get('image')?.markAsTouched();
      return;
    }

    // If all validations pass
    this.addressForm.patchValue({ image: file });
    this.addressForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addressForm.controls;
  }

  // removeFile() {
  //   // this.addressForm.get('image')?.setValue(null);
  //   // if (this.isEditMode) this.addImageValidator();
  // }

  removeFile() {
    this.addressForm.patchValue({ image: null });
    this.addressForm.get('image')?.setErrors({ required: true });
    this.imagePreviewUrl = '';
    if (this.isEditMode) this.addImageValidator();
  }




  get form(): FormGroup {
    return this.addressForm as FormGroup;
  }

  isEditMode = false;

  deleteType(): void {

    this.isLoading = true
    this.addressTypeService.deleteAddressType(this.name).subscribe({
      next: () => {
        document.getElementById('delete-close')?.click();
        if (this.addressTypes.length == 1 && this.pageRequest.pageNo > 0) this.pageRequest.pageNo--
        this.loadAddressTypes();
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
      }
    });

  }


  onSubmit(): void {
    this.submitted = true;
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return
    };
    this.isLoading = true
    const formData = new FormData();
    formData.append('name', this.addressForm.get('name')?.value);
    formData.append('id', this.addressForm.get('id')?.value);

    //set image only if it is a file and on add form
    if (this.addressForm.get('image')?.value instanceof File) {
      const image = this.addressForm.get('image')?.value;
      formData.append('image', image);
    }



    const request = this.isEditMode
      ? this.addressTypeService.updateAddressType(formData)
      : this.addressTypeService.addAddressType(formData);

    request.subscribe({
      next: (data: any) => {
        this.addressForm.reset();
        this.imagePreviewUrl = null;
        this.submitted = false;
        this.isEditMode = false;
        this.loadAddressTypes();
        document.getElementById('modal-close')?.click();
        this.isLoading = false
        AppUtil.openToast('success', data.message, 'Success');
      },
      error: err => {
        this.isLoading = false
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }


  addressTypes: AddressType[] = [];

  loadAddressTypes(): void {
    this.addressTypeService.getAllAddressTypes(this.pageRequest).subscribe({

      next: (res) => {
        this.addressTypes = res.addressTypes.content || [];
        this.paginationManager.setPageData(res.addressTypes);
        this.pageRequest.pageNo = res.addressTypes.pageable.pageNumber
      },
      error: (err) => {
        console.error('Failed to fetch address types', err);
      }
    });
  }


  editAddressType(type: AddressType): void {


    // remove img validator
    this.removeImageValidator();

    this.isEditMode = true;

    this.addressForm.patchValue({
      name: type.name,
      image: type.image,
      id: type.id
    });
    this.imagePreviewUrl = type.image;
  }

  clearForm() {

    this.isEditMode = false;
    this.addressForm.reset();
    this.imagePreviewUrl = null;

    this.addImageValidator();
  }

  addImageValidator() {
    // add img validator
    this.addressForm.get('image')?.setValidators([Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]);
    this.addressForm.get('image')?.updateValueAndValidity();
  }
  removeImageValidator() {
    // remove img validator
    this.addressForm.get('image')?.clearValidators();
    this.addressForm.get('image')?.updateValueAndValidity();
  }

  formateName(type: string) {

    if (type.length > 60) {
      return type.slice(0, 60) + '...'
    }
    return type
  }
}
