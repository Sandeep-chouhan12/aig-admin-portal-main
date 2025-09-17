import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class AddressTypeService {

  // private baseUrl = 'http://localhost:8080/addressType'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  addAddressType(formData: FormData): Observable<any> {
    return this.http.post(ApiRoutes.ADD_ADDRESS_TYPE, formData);
  }

  getAllAddressTypes(pageRequest: PageRequest): Observable<any> {
    //set page number and page size
    let params = new HttpParams().set('page', pageRequest.pageNo.toString()).set('size', pageRequest.pageSize.toString());

    return this.http.get(ApiRoutes.GET_ALL_ADDRESS_TYPES, { params });
  }

  deleteAddressType(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.delete(ApiRoutes.DELETE_ADDRESS_TYPE, { params });
  }
  updateAddressType(formData: FormData): Observable<any> {
    return this.http.put(ApiRoutes.UPDATE_ADDRESS_TYPE, formData);
  }

}
