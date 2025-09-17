import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class SupportService {


  constructor(private http: HttpClient) { }

  public getSupports(pageRequest: PageRequest) {
    return this.http.post(ApiRoutes.GET_SUPPORT, pageRequest);
  }
  deleteSupport(supportId: number) {
    return this.http.delete(ApiRoutes.DELETE_SUPPORT + supportId)
  }
}
