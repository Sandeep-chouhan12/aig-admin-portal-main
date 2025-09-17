import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { Faq } from '../../models/faq';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/shared/utils/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private faqService: FaqService, private formBuilder: FormBuilder, public loaderService: LoaderService) {
    this.faqForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  faq: Faq = new Faq();
  faqForm!: FormGroup;
  faqList: Faq[] = [];
  faqId: number = 0;
  id: any
  constant = Constants;
  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  ngOnInit(): void {
    this.getAllFaq();
  }

  public addFaq() {

    if (this.faqForm.invalid) {
      AppUtil.checkFormValidOrNot(this.faqForm);
      return;
    } else {
      this.toggleLoader();
      this.faqService.addFaq(this.faq).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          this.toggleLoader();
          // this.faqList.push(data.faq)
          this.getAllFaq();
          AppUtil.modalDismiss('add-modal-close')
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }
      })
    }
  }

  setId(planId: any) {
    if (planId == this.id) {
      this.id = 0;
    } else {
      this.id = planId;
    }
  }

  public updateFaq() {

    if (this.faqForm.invalid) {
      AppUtil.checkFormValidOrNot(this.faqForm);
      return;
    } else {
      this.toggleLoader();
      this.faqService.updateFaq(this.faq).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          AppUtil.modalDismiss('edit-modal-close')
          this.toggleLoader();
          this.getAllFaq();
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }
      })
    }
  }
  public getAllFaq() {
    this.faqService.getAllFaq().subscribe({
      next: (data: any) => {
        this.faqList = (data.faqList || []).map((faq: any) => ({
          ...faq,
          expanded: false
        }));
      },
      error: (er: any) => {
        console.error('Error fetching FAQ:', er);
      }
    });
  }


  public deletFaq() {
    this.toggleLoader();
    this.faqService.deleteFaq(this.faqId).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success');
        this.toggleLoader();
        this.getAllFaq();
        AppUtil.modalDismiss('delete-modal-close')

      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error');
        this.toggleLoader();
      }
    })
  }

  public clearObject() {
    this.faq = new Faq();
    this.faqForm.reset();
  }

  public setFaq(faq: any) {
    this.faq = { ...faq }
  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }
}
