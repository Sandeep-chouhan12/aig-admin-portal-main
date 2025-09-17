import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Editor, Toolbar } from 'ngx-editor';
import { TermsPolicyService } from '../../services/terms-policy.service';
import { iif } from 'rxjs';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

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
    this.fetchPrivacyPolicy();
    this.cdr.detectChanges()
  }

  private fetchPrivacyPolicy(): void {
    this.termsPolicyService.getContent('privacy', 'organization').subscribe((res: any) => {
      if (res && res.content) {
        let content = res.content;

        // Decode URL-encoded content if needed
        if (content && content.includes('%')) {
          try {
            content = decodeURIComponent(content);
          } catch (e) {
            console.error('Error decoding privacy policy content:', e);
            // Use original content if decoding fails
            content = res.content;
          }
        }

        // Decode HTML entities if needed
        if (content && (content.includes('&lt;') || content.includes('&gt;') || content.includes('&amp;'))) {
          content = this.decodeHtmlEntities(content);
        }

        // Set the processed content to the form control
        this.organizationForm.get('content')?.setValue(content);

        // Set edit mode if content exists
        this.isOrganizationEditeMode = true;
      } else {
        // No content found, set empty and stay in create mode
        this.organizationForm.get('content')?.setValue('');
        this.isOrganizationEditeMode = false;
      }
    }, (error) => {
      console.error('Error fetching privacy policy:', error);
      // Handle error case
      this.organizationForm.get('content')?.setValue('');
      this.isOrganizationEditeMode = false;
    });
  }

  // Helper method to decode HTML entities
  private decodeHtmlEntities(text: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  submitPrivacyPolicy(): void {

    if (this.organizationForm.invalid) {
      this.organizationForm.markAllAsTouched();
      return
    }

    const content = this.organizationForm.get('content')?.value
    this.isSubmittingOrganization = true;
    this.termsPolicyService.addContent('organization', content, 'privacy').subscribe({
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

  updatePrivacyPolicy(): void {

    if (this.organizationForm.invalid) {
      this.organizationForm.markAllAsTouched();
      return
    }
    const content = this.organizationForm.get('content')?.value;
    this.isSubmittingOrganization = true;
    this.termsPolicyService.updateContent('organization', content, 'privacy').subscribe({
      next: (res: any) => {
        this.fetchPrivacyPolicy(); // reload updated content
        this.isSubmittingOrganization = false;
        AppUtil.openToast('success', 'organization' + ' ' + res.Message, 'Success')

      },
      error: (err) => {
        this.isSubmittingOrganization = false;
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }




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