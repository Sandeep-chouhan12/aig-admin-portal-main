import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPartners } from 'src/app/organization/models/api-partners';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

/**
 * Service for fetching data related to the dashboard.
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  /**
   * Constructor to inject the HttpClient.
   * @param http - The Angular HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches the total hits of APIs from the server.
   * @returns An observable with the API hits count data.
   */
  public getTotalHitsOfApi() {
    return this.http.get<any>(ApiRoutes.GET_TOTAL_COUNT_OF_API_HITS);
  }

  /**
   * Fetches the top verification officers based on the provided page request.
   * @param pageRequest - The page request object for pagination.
   * @returns An observable with the top verification officers data.
   */
  public getTopVerificationOfficers(pageRequest: PageRequest) {
    return this.http.post<any>(ApiRoutes.GET_TOP_VERI_OFFICERS, pageRequest);
  }

  // get total application users count
  public getTotalUsersCount() {
    return this.http.get<any>(ApiRoutes.GET_TOTAL_USERS_COUNT);
  }

  public getVerificationStatistics(month: any) {
    return this.http.get<any>(ApiRoutes.GET_VERIFICATION_STATISTICS + month);
  }

  public getAllPendingAndVerifiedAddressStatis() {
    return this.http.get(ApiRoutes.GET_PENDING_AND_VERIFIED_ADDRESS_STATISC)
  }
}
