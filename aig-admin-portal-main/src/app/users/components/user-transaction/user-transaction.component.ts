import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TableConfig } from 'src/app/shared/models/table-config';
import { ModalConfig } from 'src/app/shared/models/modal-config';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { TransactionsService } from '../../services/transactions.service';
import { Router } from '@angular/router';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DatePipe } from '@angular/common';
import { PageStateService } from 'src/app/shared/services/page-state.service';
import { Invoice, } from '../../models/invoice';
import { PdfgeneratorComponent } from 'src/app/shared/components/pdfgenerator/pdfgenerator.component';

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.scss'],
  providers: [DatePipe]
})
export class UserTransactionComponent implements OnInit, AfterViewInit {

  // Utility functions
  appUtils = AppUtil;
  componentRoutes = ComponentsRoutes

  // Pagination configuration
  pageManager = new PaginationManager();
  pageRequest: PageRequest = new PageRequest();

  // List of transactions
  transactionList: Transaction[] = [];


  constructor(private elementRef: ElementRef, private container: ViewContainerRef, private transactionService: TransactionsService, private router: Router, public loaderService: LoaderService, private pageState: PageStateService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    // Set default page size
    this.pageRequest.pageSize = 10;
    // Fetch initial transaction list
    this.pageRequest.pageNo = this.getPageState();
    this.getAllTransactions();
  }

  // Get all transactions with pagination
  getAllTransactions(pageRequest: PageRequest = this.pageRequest) {
    this.pageRequest = pageRequest;
    this.transactionService.getAllTransactions(this.pageRequest).subscribe({
      next: (data: any) => {
        this.transactionList = data.transactions.content;
        this.pageManager.setPageData(data.transactions);
        this.setPageState(this.pageRequest.pageNo)
      },
      error: (err) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }

  // Navigate to specified path
  navigate(path: string) {
    this.router.navigate(['Admin/' + path]);
  }
  generatePdf(transaction: Transaction, type: string) {
    let envoice: Invoice = new Invoice();
    envoice.invoice_Date = transaction.createdDate
    envoice.invoice_To = transaction.firstName + ' ' + transaction.lastName;
    envoice.price = transaction.amount;
    envoice.subtotal = transaction.amount;
    envoice.transaction_Id = transaction.txnId;
    envoice.invoice_No = 34434;
    envoice.invoice_Date = transaction.createdDate;
    envoice.invoiceType = 'USERINVOICE';
    envoice.description = transaction.description;
    if (type == 'download')
      this.transactionService.generatePdf(envoice);
    else if (type == 'view')
      this.transactionService.veiwPdf(envoice);
  }
  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
  }

}

