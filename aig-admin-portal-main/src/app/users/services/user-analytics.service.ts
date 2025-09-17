import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class UserAnalyticsService {

  constructor(private httpClient: HttpClient) { }

  public getUserAcquition(month:any){
    return this.httpClient.post<any>(ApiRoutes.GET_USER_ACQUITION+month,null)
  }

  public getAddressStatics(month:any){
    return this.httpClient.post<any>(ApiRoutes.GET_ADDRESS_STATICS+month,null);
  }

  public getVerifiedRequestRaised(month:any){
    return this.httpClient.post<any>(ApiRoutes.GET_VERIFICATION_REQUESTS+month,null);
  }
}
