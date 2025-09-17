import { Component, isDevMode, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AvatarService } from '../service/avatar.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-avtar',
  templateUrl: './avtar.component.html',
  styleUrls: ['./avtar.component.scss']
})
export class AvtarComponent implements OnInit {
  avtarForm!: FormGroup;
  submitted = false;
  // simageFile: File | null = null;
  avatars: any[] = [];
  deleteId: number = 0;
  isLoading: boolean = false;
  paginationManager: PaginationManager = new PaginationManager();
  page: PageRequest = new PageRequest();
  permissionTitle = PermissionTitle;
  permissionType = PermissionType;


  constructor(private fb: FormBuilder, private avatarService: AvatarService,public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.avtarForm = this.fb.group({
      image: [null, [Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]],
    });
    this.loadAvatars();
  }

  get f() {
    return this.avtarForm.controls;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSizeMB = 5;

    if (!file) return;

    const fileType = file.type;
    const fileSize = file.size;

    const control = this.avtarForm.get('image');

    // Validate file type
    if (!allowedTypes.includes(fileType)) {
      control?.setErrors({ invalidFileType: true });
      control?.markAsTouched();
      this.imagePreviewUrl = '';
      return;
    }

    // Validate file size
    if (fileSize > maxSizeMB * 1024 * 1024) {
      control?.setErrors({ fileTooBig: true });
      control?.markAsTouched();
      this.imagePreviewUrl = '';
      return;
    }

    // If valid file
    this.imagePreviewUrl = URL.createObjectURL(file);
    this.avtarForm.patchValue({ image: file });
    control?.updateValueAndValidity();
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.avtarForm.invalid) {
      this.avtarForm.markAllAsTouched();
      return
    };

    this.isLoading = true
    let image = this.avtarForm.get('image')?.value
    let method = this.editMode ? this.avatarService.update(this.editId, image ?? '') : this.avatarService.add(image);
    method.subscribe({
      next: (res) => {
        this.isLoading = false
        this.clodeModal('modal-close');
        // handle success
        this.clearForm();
        this.loadAvatars();
        AppUtil.openToast('success', res.message, 'Success');
      },
      error: (err) => {
        // handle error
        this.isLoading = false;
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }

  deleteAvatar(): void {
    this.isLoading = true;
    this.avatarService.delete(this.deleteId).subscribe({
      next: (res) => {

        // refresh list, show success
        this.isLoading = false;

        // close modal
        this.clodeModal('delete-close');

        // show success
        AppUtil.openToast('success', res.message, 'Success');

        // back to the privious page is no data on current page
        if (this.avatars.length == 1 && this.page.pageNo > 0) this.page.pageNo--

        // refresh list
        this.loadAvatars();
      },
      error: () => {
        // show error
        this.isLoading = false;
      }
    });
  }

  toggleAvatarStatus(avtar: any): void {
    let status = avtar.isActive;
    this.avatarService.toggleStatus(avtar.id).subscribe({
      next: (res) => {
        // success toast, reload list
        avtar.isActive = !status;
        AppUtil.openToast('success', res.message, 'Success');
      },
      error: () => {
        // handle error
        avtar.isActive = status;
      }
    });
  }

  loadAvatars(): void {
    this.avatarService.getAll(this.page.pageNo, this.page.pageSize).subscribe({
      next: (res) => {
        this.avatars = res.avatars.content;
        this.paginationManager.setPageData(res?.avatars);
        this.page.pageNo = res?.avatars.pageable.pageNumber;
      }
    });
  }

  setDeleteId(id: number): void {
    this.deleteId = id;
  }

  editAvatar(avatar: any): void {
    this.imagePreviewUrl = avatar.url;
    this.editMode = true;
    this.editId = avatar.id;
    this.avtarForm.patchValue({ image: avatar.url });
    this.removeValidator();
  }

  addValidator() {
    this.avtarForm.get('image')?.setValidators([Validators.required, this.fileValidator(['image/jpeg', 'image/png'], 5)]);
    this.avtarForm.get('image')?.updateValueAndValidity();
  }
  fileValidator(allowedTypes: string[], maxSize: number): any {
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
  removeValidator() {
    this.avtarForm.get('image')?.clearValidators();
    this.avtarForm.get('image')?.updateValueAndValidity();
  }
  removeFile() {
    this.imagePreviewUrl = '';
    // this.editMode = true;
    // this.editId = 0;
    this.addValidator();
    this.avtarForm.patchValue({ image: null });
    this.avtarForm.get('image')?.setErrors({ required: true });
  }


  imagePreviewUrl: string = '';
  editMode: boolean = false;
  editId: number = 0;

  clodeModal(id: string) {
    document.getElementById(id)?.click();
  }

  clearForm() {
    this.avtarForm.reset();
    this.imagePreviewUrl = '';
    this.editMode = false;
    this.editId = 0;
    this.addValidator();
  }

}
