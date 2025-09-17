import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({ providedIn: 'root' })
export class GeneralSuggestionService {

  constructor(private http: HttpClient) { }

  // GET with pagination
  getAll(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(ApiRoutes.GET_ALL_GENERAL_SUGGESTION, { params });
  }

  // POST with @RequestParam
  add(info: string): Observable<any> {
    const params = new HttpParams().set('info', info);
    return this.http.post(ApiRoutes.ADD_GENERAL_SUGGESTION, null, { params });
  }

  // PUT with @RequestParam
  update(id: number, info: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id)
      .set('info', info);
    return this.http.put(ApiRoutes.UPDATE_GENERAL_SUGGESTION, null, { params });
  }

  // DELETE with @RequestParam
  delete(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.delete(ApiRoutes.DELETE_GENERAL_SUGGESTION, { params });
  }


  updateStatus(id: number): Observable<any> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.put(ApiRoutes.UPDATE_GENERAL_SUGGESTION_STATUS, null, { params });
  }
}
