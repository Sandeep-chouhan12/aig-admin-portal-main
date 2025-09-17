import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TermsPolicyService } from '../service/terms-policy.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit, OnDestroy {
  // Form related properties
  userForm!: FormGroup;
  officerForm!: FormGroup;

  // Editor instances
  userEditor: Editor = new Editor();
  officerEditor: Editor = new Editor();

  // UI state properties
  isSubmittingUser = false;
  isSubmittingOfficer = false;
  isOfficerEditMode: boolean = false;
  isUserEditMode: boolean = false;

  // Constants
  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  // Editor toolbar configuration
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private fb: FormBuilder,
    private termsPolicyService: TermsPolicyService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadTermsData();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroyEditors();
  }

  // Initialization methods
  private initializeForms(): void {
    this.userForm = this.fb.group({
      content: ['', [this.htmlContentRequired]]
    });

    this.officerForm = this.fb.group({
      content: ['', [this.htmlContentRequired]]
    });
  }

  private destroyEditors(): void {
    this.userEditor.destroy();
    this.officerEditor.destroy();
  }

  // Data loading methods
  private loadTermsData(): void {
    this.fetchUserTerms();
    this.fetchOfficerTerms();
  }

  private fetchUserTerms(): void {
    this.termsPolicyService.getContent('termsConditions', 'user').subscribe({
      next: (res: any) => {
        this.userForm.get('content')?.setValue(res?.content || '');
        this.isUserEditMode = !!res?.content;
      },
      error: (error) => {
        this.handleDataLoadError('user', error);
      }
    });
  }

  private fetchOfficerTerms(): void {
    this.termsPolicyService.getContent('termsConditions', 'officer').subscribe({
      next: (res: any) => {
        this.officerForm.get('content')?.setValue(res?.content || '');
        this.isOfficerEditMode = !!res?.content;
      },
      error: (error) => {
        this.handleDataLoadError('officer', error);
      }
    });
  }

  private handleDataLoadError(userType: string, error: any): void {
    console.error(`Error loading ${userType} terms:`, error);
    AppUtil.openToast('error', `Failed to load ${userType} terms`, 'Error');
  }

  // Submission methods
  submitTerms(userType: 'user' | 'officer'): void {
    if (userType === 'user') {
      this.submitUserTerms();
    } else {
      this.submitOfficerTerms();
    }
  }

  private submitUserTerms(): void {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    const content = this.userForm.get('content')?.value;
    this.setSubmitting('user', true);

    this.termsPolicyService.addContent('user', content, 'termsConditions').subscribe({
      next: (res: any) => {
        this.handleSubmissionSuccess('user', res);
      },
      error: (err) => {
        this.handleSubmissionError('user', err);
      }
    });
  }

  private submitOfficerTerms(): void {
    if (this.officerForm.invalid) {
      this.markFormGroupTouched(this.officerForm);
      return;
    }

    const content = this.officerForm.get('content')?.value;
    this.setSubmitting('officer', true);

    this.termsPolicyService.addContent('officer', content, 'termsConditions').subscribe({
      next: (res: any) => {
        this.handleSubmissionSuccess('officer', res);
      },
      error: (err) => {
        this.handleSubmissionError('officer', err);
      }
    });
  }

  // Update methods
  updateTerms(userType: 'user' | 'officer'): void {
    if (userType === 'user') {
      this.updateUserTerms();
    } else {
      this.updateOfficerTerms();
    }
  }

  private updateUserTerms(): void {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    const content = this.userForm.get('content')?.value;
    this.setSubmitting('user', true);

    this.termsPolicyService.updateContent('user', content, 'termsConditions').subscribe({
      next: (res: any) => {
        this.handleUpdateSuccess('user', res);
      },
      error: (err) => {
        this.handleSubmissionError('user', err);
      }
    });
  }

  private updateOfficerTerms(): void {
    if (this.officerForm.invalid) {
      this.markFormGroupTouched(this.officerForm);
      return;
    }

    const content = this.officerForm.get('content')?.value;
    this.setSubmitting('officer', true);

    this.termsPolicyService.updateContent('officer', content, 'termsConditions').subscribe({
      next: (res: any) => {
        this.handleUpdateSuccess('officer', res);
      },
      error: (err) => {
        this.handleSubmissionError('officer', err);
      }
    });
  }

  // Response handling methods
  private handleSubmissionSuccess(userType: string, res: any): void {
    AppUtil.openToast('success', res.Message, 'Success');
    this.setSubmitting(userType, false);

    // Refresh the content after successful submission
    if (userType === 'user') {
      this.fetchUserTerms();
    } else {
      this.fetchOfficerTerms();
    }
  }

  private handleUpdateSuccess(userType: string, res: any): void {
    AppUtil.openToast('success', res.Message, 'Success');
    this.setSubmitting(userType, false);

    // Refresh the content after successful update
    if (userType === 'user') {
      this.fetchUserTerms();
    } else {
      this.fetchOfficerTerms();
    }
  }

  private handleSubmissionError(userType: string, err: any): void {
    AppUtil.openToast('error', err.error.message, 'Error');
    this.setSubmitting(userType, false);
  }

  // Utility methods
  private setSubmitting(userType: string, value: boolean): void {
    if (userType === 'user') {
      this.isSubmittingUser = value;
      this.isUserEditMode = true;
    } else {
      this.isSubmittingOfficer = value;
      this.isOfficerEditMode = true;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Validator
  htmlContentRequired(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return { required: true };

    // Remove all HTML tags and non-breaking spaces
    const text = control.value
      .replace(/<[^>]*>/g, '')   // remove HTML tags
      .replace(/&nbsp;/g, '')    // remove &nbsp;
      .trim();                   // trim spaces

    // Return an error if no visible content
    return text.length === 0 ? { required: true } : null;
  }
}