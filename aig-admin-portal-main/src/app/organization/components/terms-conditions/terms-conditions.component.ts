import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Editor, Toolbar } from 'ngx-editor';
import { TermsPolicyService } from '../../services/terms-policy.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent {
  isOrganizationEditeMode: boolean = false;

  organizationForm!: FormGroup

  isSubmittingOrganization = false;

  public editorConfig = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'blockQuote', 'imageUpload', '|', 'undo', 'redo'
    ]
  };

  userEditor: Editor = new Editor();
  officerEditor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
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
    this.organizationForm = this.fb.group({
      content: ['', [this.htmlContentRequired]]
    });

    this.organizationForm = this.fb.group({
      content: ['', [this.htmlContentRequired]]
    });
  }

  private loadInitialData(): void {
    this.fetchTermsCondition();
    this.cdr.detectChanges()
  }

  private fetchTermsCondition(): void {
    this.termsPolicyService.getContent('terms', 'organization').subscribe((res: any) => {
      let content = res?.content || '';

      // Decode URL-encoded content if needed
      if (content && content.includes('%')) {
        try {
          content = decodeURIComponent(content);
        } catch (e) {
          console.error('Error decoding content:', e);
        }
      }

      // Additional HTML entity decoding if needed
      if (content && (content.includes('&lt;') || content.includes('&gt;'))) {
        content = this.decodeHtmlEntities(content);
      }
      this.organizationForm.get('content')?.setValue(content);
      if (content) {
        this.isOrganizationEditeMode = true;
      }
      this.cdr.detectChanges();
    });
  }

  // Helper method to decode HTML entities
  private decodeHtmlEntities(text: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  // Helper method to ensure content is properly formatted
  private sanitizeContent(content: string): string {
    if (!content) return '';

    // Remove any extra encoding
    let cleanContent = content;

    // Decode URL encoding if present
    if (cleanContent.includes('%')) {
      try {
        cleanContent = decodeURIComponent(cleanContent);
      } catch (e) {
        console.warn('Could not decode URL-encoded content');
      }
    }

    // Decode HTML entities if present
    if (cleanContent.includes('&lt;') || cleanContent.includes('&gt;')) {
      cleanContent = this.decodeHtmlEntities(cleanContent);
    }

    return cleanContent;
  }
  submitTermsCondition(): void {

    if (this.organizationForm.invalid) {
      this.organizationForm.markAllAsTouched();
      return
    }

    const content = this.organizationForm.get('content')?.value

    this.isSubmittingOrganization = true;
    this.termsPolicyService.addContent('organization', content, 'terms').subscribe({
      next: (res: any) => {
        this.isSubmittingOrganization = false;
        AppUtil.openToast('success', 'organization' + ' ' + res.Message, 'Success')
      },
      error: (error) => {
        this.isSubmittingOrganization = false;
        AppUtil.openToast('error', error.error.message, 'Error');
      }
    });
  }

  updateTermsCondition(): void {
    this.isSubmittingOrganization = true;
    const content = this.organizationForm.get('content')?.value;
    this.termsPolicyService.updateContent('organization', content, 'terms').subscribe({
      next: (res: any) => {
        this.fetchTermsCondition(); // reload updated content
        this.isSubmittingOrganization = false;
        AppUtil.openToast('success', 'organization' + ' ' + res.Message, 'Success')

      },
      error: (err) => {
        this.isSubmittingOrganization = false;
        AppUtil.openToast('error', err.error.message, 'Error');
      }
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



}
