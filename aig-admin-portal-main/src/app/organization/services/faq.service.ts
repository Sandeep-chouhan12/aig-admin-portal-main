import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { Faq } from '../models/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {


  constructor(private http: HttpClient) { }

  public getAllFaq() {
    return this.http.get(ApiRoutes.GET_FAQ)
  }
  public addFaq(data: any) {
    return this.http.post(ApiRoutes.ADD_FAQ, data)
  }
  updateFaq(faq: Faq) {
    return this.http.put(ApiRoutes.UPDATE_FAQ, faq)
  }
  deleteFaq(faqId: number) {
    return this.http.delete(ApiRoutes.DELETE_FAQ + faqId)
  }

}
