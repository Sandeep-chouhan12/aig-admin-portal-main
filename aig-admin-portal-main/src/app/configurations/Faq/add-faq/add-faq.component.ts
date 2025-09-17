import { Component, OnInit } from '@angular/core';
// import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqService } from 'src/app/organization/services/faq.service';
import { AdminFaqService } from '../../service/admin-faq.service';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent {

  public editorConfig = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'blockQuote', 'imageUpload', '|', 'undo', 'redo'
    ]
  };

  faqForm!: FormGroup;
  isSubmitting = false;

  faqId: number | null = null;
  userType = 'user'; // default


  permissionTitle = PermissionTitle;
  permissionType = PermissionType;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private faqService: AdminFaqService, private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.extractQueryParams();
  }

  private initForm(): void {
    this.faqForm = this.fb.group({
      title: ['',[this.htmlContentRequired]],
      description: ['',[this.htmlContentRequired]],
      userType: ['user'] // default value
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
  private extractQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      this.faqId = params['id'] ? +params['id'] : null;
      this.userType = params['userType'] || 'user';
      this.faqForm.patchValue({ userType: this.userType });

      if (this.faqId) {
        this.loadFaqData(this.faqId);
      }
    });
  }

  private loadFaqData(id: number): void {
    this.faqService.getFaqById(id).subscribe((res: any) => {
      this.faqForm.patchValue({
        title: res.faq.title,
        description: res.faq.description
      });
    });
  }

  onSubmit(): void {

    if (this.faqForm.invalid) {
      this.faqForm.markAllAsTouched();
      this.faqForm.updateValueAndValidity();
      return
    }

    const payload = {
      id: this.faqId,
      ...this.faqForm.value
    };

    this.isSubmitting = true;

    const request$ = this.faqId
      ? this.faqService.updateFaq(payload)
      : this.faqService.addFaq(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false
        this.faqForm.reset();
        this.faqId = null;

        // navigate to faq list
        this.router.navigate(['/Admin/' + ComponentsRoutes.FAQ_BASE_ROUTE]);
      },
      error: (err) => {
        this.isSubmitting = false
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }


  titleEditor: Editor = new Editor();
  descriptionEditor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
}
