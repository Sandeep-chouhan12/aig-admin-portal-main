import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { Invoice } from '../models/invoice';

/**
 * Service for managing transactions and related operations.
 * This service communicates with the server-side APIs to perform operations related to transactions.
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {



  /**
   * Constructor for TransactionsService.
   * @param httpClient - Angular HttpClient for making HTTP requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves all transactions based on the provided page request parameters.
   * @param pageRequest - The pagination parameters for fetching a specific page of transactions.
   * @returns An observable containing the response from the server.
   */
  public getAllTransactions(pageRequest: PageRequest) {
    return this.httpClient.post<any>(ApiRoutes.GET_ALL_TRANSACTIONS, pageRequest);
  }

  /**
   * Retrieves all transactions associated with the specified user ID,
   * based on the provided page request parameters.
   * @param userId - The ID of the user for whom transactions are to be retrieved.
   * @param pageRequest - The pagination parameters for fetching a specific page of transactions.
   * @returns An observable containing the response from the server.
   */
  public getAllTransactionOfUser(userId: any, pageRequest: PageRequest) {
    return this.httpClient.post<any>(ApiRoutes.GET_ALL_TRANSACTION_OF_USER + userId, pageRequest);
  }


  // for downloading pdf 
  generatePdf(invoice: Invoice) {
    return this.httpClient.post(ApiRoutes.GENERATE_INVOICE_PDF, invoice, { responseType: 'blob' })
      .subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoice.pdf'; // Set the filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  }

  // for viewing pdf
  veiwPdf(invoice: Invoice) {
    return this.httpClient.post(ApiRoutes.GENERATE_INVOICE_PDF, invoice, { responseType: 'blob' })
      .subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        // Set the desired filename
        const filename = 'invoice.pdf';
        // Open the PDF in a new tab or window with the specified filename
        window.open(url, filename);
        // Clean up by revoking the object URL
        window.URL.revokeObjectURL(url);
      });
  }
}
