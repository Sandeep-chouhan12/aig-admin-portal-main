import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class TermsPolicyService {
  constructor(private http: HttpClient) { }

  getContent(type: string, userType: string) {
    const params = new HttpParams()
      .set('type', type)
      .set('userType', userType);

    return this.http.get(ApiRoutes.GET_TERMS_AND_POLICY, { params });
  }

  addContent(userType: string, content: string, type: string) {
    const params = new HttpParams()
      .set('userType', userType)
      .set('content', content)
      .set('type', type);

    return this.http.post(ApiRoutes.ADD_TERMS_AND_POLICY, null, { params });
  }

  updateContent(userType: string, content: string, type: string) {
    const params = new HttpParams()
      .set('userType', userType)
      .set('content', content)
      .set('type', type);

    return this.http.put(ApiRoutes.UPDATE_TERMS_AND_POLICY, null, { params });
  }
}
