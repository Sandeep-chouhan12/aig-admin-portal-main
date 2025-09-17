import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/organization/services/faq.service';
import { AdminFaqService } from '../service/admin-faq.service';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { LoaderService } from 'src/app/shared/services/loader.service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FAQsComponent implements AfterViewInit {

  componentRoutes = ComponentsRoutes;
  faqList: any[] = [];
  pageRequest = new PageRequest();
  paginationManager = new PaginationManager();
  isDeletingFaq: boolean = false
  FaqId: number = 0;

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;
  constructor(private faqService: AdminFaqService, private cdr: ChangeDetectorRef,public loaderService: LoaderService) { }
  ngAfterViewInit(): void {
    this.loadFaqs();
  }

  ngOnInit(): void {

    this.cdr.detectChanges();
  }

  loadFaqs(): void {
    this.faqService.getAllFaqs(this.pageRequest).subscribe((res: any) => {
      this.faqList = res?.faqList.content;
      this.pageRequest.pageNo = res?.faqList.pageable.pageNumber
      this.paginationManager.setPageData(res?.faqList);

    });
  }

  toggleFaqStatus(faq: any): void {
    const updatedStatus = !faq.isActive;
    this.faqService.toggleFaqStatus(faq.id).subscribe((res: any) => {
      faq.isActive = updatedStatus;
      AppUtil.openToast('success', res.message, 'Success');
    },
      (err) => {
        faq.isActive = !updatedStatus;
        AppUtil.openToast('error', err.error.message, 'Error');
      }

    );
  }

  setId(id: number): void {
    this.FaqId = id;
  }

  deleteFaq(): void {
    this.isDeletingFaq = true

    this.faqService.deleteFaq(this.FaqId).subscribe(() => {

      if (this.faqList.length == 1 && this.pageRequest.pageNo > 0) {
        this.pageRequest.pageNo = this.pageRequest.pageNo - 1
      }
      this.loadFaqs();
      this.isDeletingFaq = false;
      this.modalClose('delete-close')
    },
      (er: any) => {
        this.isDeletingFaq = false
        AppUtil.openToast('error', er.error.message, 'Error');
      }
    );

  }

  modalClose(id: string): void {
    document.getElementById(id)?.click();
  }
  formatText(text: string): string {
    if (!text) return '';

    // Keep basic HTML tags like <p>, <br>, <ul>, etc., and truncate the visible content
    const div = document.createElement('div');
    div.innerHTML = text;

    const plainText = div.innerText || div.textContent || '';

    let truncated = plainText.trim();
    if (truncated.length > 70) {
      truncated = truncated.slice(0, 70) + '...';
    }

    // Replace the original content with truncated text, but keep tags like <p> and <br>
    return `<p>${truncated.replace(/\n/g, '<br>')}</p>`;
  }

}
