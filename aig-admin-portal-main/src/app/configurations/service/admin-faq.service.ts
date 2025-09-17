import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class AdminFaqService {

  constructor(private http: HttpClient) { }

  addFaq(data: any) {
    return this.http.post(ApiRoutes.ADD_ADMIN_FAQ, data);
  }

  updateFaq(data: any) {
    return this.http.put(ApiRoutes.UPDATE_ADMIN_FAQ, data);
  }

  getFaqById(id: number) {
    return this.http.get(`${ApiRoutes.GET_ADMIN_FAQ}`,{ params: new HttpParams().set('id', id.toString()) }); // assuming you have this endpoint
  }

  // ✅ Get all FAQs by userType (user/officer)
  getFaqsByUserType(userType: string) {
    const params = new HttpParams().set('userType', userType);
    return this.http.get(ApiRoutes.GET_ADMIN_FAQS_BY_USER_TYPE, { params });
  }

  // ✅ Get paginated list of all FAQs
  getAllFaqs(pageRequest: PageRequest) {
    const params = new HttpParams()
      .set('pageNumber', pageRequest.pageNo.toString())
      .set('pageSize', pageRequest.pageSize.toString());
    return this.http.get(ApiRoutes.GET_ALL_FAQS_PAGINATED, { params });
  }

  // ✅ Delete FAQ by ID
  deleteFaq(id: number) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(ApiRoutes.DELETE_ADMIN_FAQ, { params });
  }

  // ✅ Toggle status (active/inactive)
  toggleFaqStatus(id: number) {
    return this.http.put(ApiRoutes.UPDATE_ADMIN_FAQ_STATUS, {}, { params: new HttpParams().set('id', id.toString()) }); // Reuses same update API
  }

}
