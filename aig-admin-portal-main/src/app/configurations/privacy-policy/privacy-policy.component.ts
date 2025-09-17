import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { TermsPolicyService } from '../service/terms-policy.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Editor, Toolbar } from 'ngx-editor';
import { EmergencyOfficerRequest } from 'src/app/emergency/payload/emergency-officer-request';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

  isUserAddType: boolean = false;

  isOfficerEditeMode: boolean = false;
  isUserEditeMode: boolean = false;

  isSubmmittingUserPrivacy: boolean = false;
  isSubmmittingOfficerPrivacy: boolean = false;

  userForm!: FormGroup
  officerForm!: FormGroup

  isSubmittingUser = false;
  isSubmittingOfficer = false;

  public editorConfig = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'blockQuote', 'imageUpload', '|', 'undo', 'redo'
    ]
  };

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  constructor(
    private termsPolicyService: TermsPolicyService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForms();
    this.loadInitialData();
  }

  private initializeForms(): void {
    this.userForm = this.fb.group({
      content: ['', [this.htmlContentRequired]]
    });
    this.officerForm = this.fb.group({
      content: ['', [this.htmlContentRequired]]
    });
  }


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

  private loadInitialData(): void {
    this.fetchPrivacyPolicy('user');
    this.fetchPrivacyPolicy('officer');
    this.cdr.detectChanges()
  }

  private fetchPrivacyPolicy(userType: string): void {
    this.termsPolicyService.getContent('privacyPolicy', userType).subscribe((res: any) => {
      if (userType === 'user') {
        this.userForm.get('content')?.setValue(res?.content || '');
        if (res?.content) {
          this.isUserEditeMode = true
        }
      } else {
        this.officerForm.get('content')?.setValue(res?.content || '');
        if (res?.content) {
          this.isOfficerEditeMode = true
        }
      }
    });
  }

  submitPrivacyPolicy(userType: 'user' | 'officer'): void {

    if (userType === 'user' && this.userForm.invalid) {

      this.userForm.markAllAsTouched();
      return
    } else if (userType === 'officer' && this.officerForm.invalid) {
      this.officerForm.markAllAsTouched();
      return
    }

    const content = userType === 'user' ? this.userForm.get('content')?.value : this.officerForm.get('content')?.value;

    this.setSubmittingState(userType, true);

    this.termsPolicyService.addContent(userType, content, 'privacyPolicy').subscribe({
      next: (res: any) => {
        this.setSubmittingState(userType, false);
        AppUtil.openToast('success', res.Message, 'Success')
      },
      error: (error) => {
        this.setSubmittingState(userType, false)
        AppUtil.openToast('error', error.error.message, 'Error');
      }
    });
  }

  updatePrivacyPolicy(userType: 'user' | 'officer'): void {

    if (userType === 'user' && this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return
    } else if (userType === 'officer' && this.officerForm.invalid) {
      this.officerForm.markAllAsTouched();
      return
    }

    const content = userType === 'user' ? this.userForm.get('content')?.value : this.officerForm.get('content')?.value;

    this.setSubmittingState(userType, true);

    this.termsPolicyService.updateContent(userType, content, 'privacyPolicy').subscribe({
      next: (res: any) => {

        this.setSubmittingState(userType, false);
        this.fetchPrivacyPolicy(userType); // reload updated content
        AppUtil.openToast('success', res.Message, 'Success')

      },
      error: (err) => {
        this.setSubmittingState(userType, false)
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }

  private setSubmittingState(userType: string, state: boolean): void {
    if (userType === 'user') {
      this.isSubmittingUser = state;
    } else {
      this.isSubmittingOfficer = state;
    }
  }


  userEditor: Editor = new Editor();
  officerEditor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
}
