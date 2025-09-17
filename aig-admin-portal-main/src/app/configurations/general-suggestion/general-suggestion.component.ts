import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralSuggestionService } from '../service/general-suggestion.service';
import { GeneralSuggestion } from '../model/general-suggestion';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-general-suggestion',
  templateUrl: './general-suggestion.component.html',
  styleUrls: ['./general-suggestion.component.scss']
})
export class GeneralSuggestionComponent {


  suggestions: any[] = [];
  generalSuggetionForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  currentEditId: number | null = null;
  page: PageRequest = new PageRequest();
  isLoading = false;
  paginationManager: PaginationManager = new PaginationManager();

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  constructor(private fb: FormBuilder, private suggestionService: GeneralSuggestionService,public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.generalSuggetionForm = this.fb.group({
      info: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.loadSuggestions();
  }

  get f() {
    return this.generalSuggetionForm.controls;
  }

  loadSuggestions(): void {
    this.suggestionService.getAll(this.page.pageNo, this.page.pageSize).subscribe(res => {
      this.suggestions = res.suggestions.content || res;
      this.paginationManager.setPageData(res.suggestions);
      this.page.pageNo = res.suggestions.pageable.pageNumber;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.generalSuggetionForm.invalid) {
      this.generalSuggetionForm.markAllAsTouched();
      return;
    };
    this.isLoading = true
    const info = this.generalSuggetionForm.value.info;

    const request = this.isEditMode
      ? this.suggestionService.update(this.currentEditId!, info)
      : this.suggestionService.add(info);

    request.subscribe(
      (res) => {
        this.resetForm();
        this.loadSuggestions();
        this.closeModal('addSuggestion');
        AppUtil.openToast('success', res.message, 'Success')
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false
        AppUtil.openToast('error', error.error.message, 'Error');
      }
    );
  }

  editSuggestion(suggestion: any): void {
    this.isEditMode = true;
    this.currentEditId = suggestion.id;
    this.generalSuggetionForm.patchValue({ info: suggestion.info });
    this.submitted = false;
    // this.openModal('addSuggestion');
  }

  confirmDelete(id: number): void {
    this.currentEditId = id;
  }

  deleteSuggestion(): void {
    this.isLoading = true
    this.suggestionService.delete(this.currentEditId!).subscribe((res) => {

      // back to the privious page is no data on current page
      if (this.suggestions.length == 1 && this.page.pageNo > 0) this.page.pageNo--
      //load data
      this.loadSuggestions();
      //close model
      this.closeModal('delete-modal');

      // reset data
      this.currentEditId = null;

      this.isLoading = false

      // fire toast
      AppUtil.openToast('success', res.message, 'Success')
    },
      (error) => {
        this.isLoading = false;
        AppUtil.openToast('error', error.error.message, 'Error');
      }
    );
  }

  resetForm(): void {
    this.generalSuggetionForm.reset();
    this.submitted = false;
    this.isEditMode = false;
    this.currentEditId = null;
    this.isLoading = false;
  }

  closeModal(id: string): void {
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById(id));
    modal.hide();
  }
  clearForm() {
    this.generalSuggetionForm.reset();
    this.submitted = false;
    this.isEditMode = false;
    this.currentEditId = null;
  }

  //update status
  public updateStatus(data: GeneralSuggestion): void {
    let isActive = data.isActive
    this.suggestionService.updateStatus(data.id).subscribe((res) => {
      // this.loadSuggestions();
      data.isActive = isActive
      AppUtil.openToast('success', res.message, 'Success')
    },
      (error: any) => {
        data.isActive = !isActive
        AppUtil.openToast('error', error.error.message, 'Error');
      }
    );
  }


  formateName(type: string) {

    if (type.length > 80) {
      return type.slice(0, 80) + '...'
    }
    return type
  }
}
