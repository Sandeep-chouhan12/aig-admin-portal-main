import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  constructor(private http: HttpClient) { }

  getAll(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(ApiRoutes.GET_ALL_AVATAR, { params });
  }

  add(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(ApiRoutes.ADD_AVATAR, formData);
  }

  update(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    if (file instanceof File) {
      formData.append('avatar', file);
    }
    return this.http.put(ApiRoutes.UPDATE_AVATAR, formData);
  }

  delete(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.delete(ApiRoutes.DELETE_AVATAR, { params });
  }

  toggleStatus(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.put(ApiRoutes.TOGGLE_AVATAR_STATUS, null, { params });
  }
}
