import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/page-request';
import { Status } from 'src/app/shared/models/status';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { UserStatusChangeRequest } from 'src/app/users/payloads/user-status-change-request';
import { VerificationOfficer } from '../models/verification-officer';
import { SortStatus } from 'src/app/users/models/sort-status';

/**
 * Service for managing verification officers and address verification requests.
 *
 * This service provides methods to interact with the server for retrieving, updating,
 * and deleting verification officer information and address verification requests.
 */
@Injectable({
  providedIn: 'root'
})
export class VerificationOfficerService {


  constructor(private http: HttpClient) { }



  
  // add officers
  public addOfficer(addressOfficer: VerificationOfficer): Observable<any> {
    let formData = new FormData();

    typeof addressOfficer.profilePicture !== 'string' &&
      formData.append('profilePicture', addressOfficer.profilePicture);
    formData.append('firstName', addressOfficer.firstName);
    formData.append('lastName', addressOfficer.lastName);
    formData.append('email', addressOfficer.email);
    formData.append('phoneNumber', addressOfficer.phoneNumber);
    formData.append('password', addressOfficer.password);
    formData.append('userName', addressOfficer.userName);
    formData.append('placeId', addressOfficer.placeId);
    formData.append('address', addressOfficer.address);
    formData.append('latitude', addressOfficer.latitude);
    formData.append('longitude', addressOfficer.longitude);
    formData.append('lgaName', addressOfficer.lgaName);
    formData.append('stateId', addressOfficer.stateId);
    return this.http.post<any>(ApiRoutes.ADD_ADDRESS_OFFICER, formData);
  }



  /**
   * Retrieve address verification requests based on specified page request and status.
   * 
   * @param pageRequest - The pagination information.
   * @param status - The status of the address verification request.
   * @returns An observable containing the result of the HTTP request.
   */
  public getAddressVerificationRequests(pageRequest: PageRequest, status: Status,sortStatus:Status): Observable<any> {
    return this.http.post<any>(ApiRoutes.GET_ADDRESS_VERIFICATION_REQUESTS + status+'&sortStatus='+sortStatus, pageRequest);
  }

  /**
   * Retrieve all verification officers based on the specified page request.
   * 
   * @param pageRequest - The pagination information.
   * @returns An observable containing the result of the HTTP request.
   */
  public getAllVerificationOfficers(pageRequest: PageRequest,sortStatus:SortStatus): Observable<any> {
    return this.http.post<any>(ApiRoutes.GET_ALL_VERIFICATION_OFFICERS+sortStatus, pageRequest);
  }

  /**
   * Update the status of a verification officer.
   * 
   * @param officerStatusUpdate - The request payload containing the officer's status update information.
   * @returns An observable containing the result of the HTTP request.
   */
  public officerStatusUpdate(officerStatusUpdate: UserStatusChangeRequest): Observable<any> {
    return this.http.put<any>(ApiRoutes.UPDATE_VERI_OFFICER_STATUS, officerStatusUpdate);
  }

  /**
   * Delete a verification officer by their ID.
   * 
   * @param deleteId - The ID of the verification officer to be deleted.
   * @returns An observable containing the result of the HTTP request.
   */
  public deleteByOfficerId(deleteId: number): Observable<any> {
    return this.http.delete<any>(ApiRoutes.DELETE_OFFICER_BY_ID + deleteId);
  }


  /**
  * Get a verification officer by their ID.
  * 
  * @param officerId - The ID of the verification officer to be fetched.
  * @returns An observable containing the result of the HTTP request.
  */
  public getVerificationOfficerById(officerId: number): Observable<any> {
    return this.http.get<any>(ApiRoutes.GET_VERIFICATION_OFFICER_BY_ID + officerId);
  }

  /**
 * Service method to fetch address verification requests assigned to a specific officer based on the provided parameters.
 * @param pageRequest - An object containing information about the pagination (page number, size, etc.).
 * @param status - The status of the address verification requests to filter (e.g., 'pending', 'approved', 'rejected').
 * @param officerId - The unique identifier of the officer to whom the address verification requests are assigned.
 * @returns An observable with the result of the address verification requests based on the provided parameters.
 */
  public getAddressVerificationRequestsByAssignOfficer(pageRequest: PageRequest, status: Status, officerId: number): Observable<any> {
    // Constructing the endpoint URL by concatenating the status and officerId to the base URL
    const endpointUrl = ApiRoutes.GET_ADDRESS_VERI_REQ_BY_OFFICER + status + '&officerId=' + officerId;

    // Making a POST request to the constructed endpoint URL with the provided pageRequest object
    return this.http.post<any>(endpointUrl, pageRequest);
  }

  public getStatesOfNigeria(): Observable<any> {
    return this.http.get<any>(ApiRoutes.GET_STATES_NIGERIA);
  }

  // get lga Info of state by uuid
  public getLGAInfoByState(stateUUID: any): Observable<any> {
    return this.http.get<any>(ApiRoutes.GET_LGA_INFO_BY_STATE + stateUUID);
  }

  public getAllVerificationRequestsCount() {
    return this.http.get(ApiRoutes.GET_COUNT_OF_ALL_REQUEST_WEB)
  }

  public getVerificationReportSatistics(staticsRequestBar: any) {
    return this.http.post(ApiRoutes.GET_VERIFICATION_STATISTICS_MONTHLY_AND_YEARLY, staticsRequestBar);
  }

  public getVerificationOfficerAcquition(key:any){
    return this.http.post(ApiRoutes.VERIFICATION_OFFICER_ACQUITION+key,{});
  }
}
