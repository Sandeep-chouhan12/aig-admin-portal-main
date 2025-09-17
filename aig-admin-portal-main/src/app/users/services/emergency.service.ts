import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

/**
 * Service for managing emergency requests and related operations.
 * This service communicates with the server-side APIs to perform operations related to emergency requests.
 */
@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  /**
   * Constructor for EmergencyService.
   * @param httpClient - Angular HttpClient for making HTTP requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves all emergency requests associated with the specified user ID,
   * based on the provided page request parameters.
   * @param userId - The ID of the user for whom emergency requests are to be retrieved.
   * @param pageRequest - The pagination parameters for fetching a specific page of emergency requests.
   * @returns An observable containing the response from the server.
   */
  public getEmergencyRequestsOfUser(userId: any, pageRequest: PageRequest) {
    return this.httpClient.post<any>(ApiRoutes.GET_ALL_EMERGENCY_REQUEST_OF_USER + userId, pageRequest);
  }

}
