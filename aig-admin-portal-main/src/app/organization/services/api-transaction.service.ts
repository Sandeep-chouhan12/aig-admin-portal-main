import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class ApiTransactionService {


  constructor(private http: HttpClient) { }

  public getAllTransaction(userId: number, transactionPageRequest: PageRequest) {
    let data: FormData = new FormData();
    data.append('id', userId.toString())
    data.append('pageNo', transactionPageRequest.pageNo.toString())
    data.append('pageSize', transactionPageRequest.pageSize.toString())
    return this.http.post(ApiRoutes.GET_API_USER_TRANSACTION, data);
  }
}
