import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPartners } from 'src/app/organization/models/api-partners';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { UpdateAddressRequest } from '../payloads/update-address-request';
import { BehaviorSubject } from 'rxjs';
import { SortStatus } from '../models/sort-status';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  /**
   * Constructor to inject the HttpClient service.
   * @param httpClient The HTTP client service for making API requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves a list of all addresses based on the provided page request parameters.
   * @param pageRequest The pagination parameters for fetching a specific page of addresses.
   * @returns An observable containing the response from the server.
   */
  public getAllAddresses(pageRequest: PageRequest,sortStatus:SortStatus) {
    return this.httpClient.post<any>(ApiRoutes.GET_ALL_ADDRESSES+sortStatus, pageRequest);
  }

  /**
   * Retrieves addresses associated with the specified user ID, based on the provided page request parameters.
   * @param userId The ID of the user for whom addresses are to be retrieved.
   * @param pageRequest The pagination parameters for fetching a specific page of addresses.
   * @returns An observable containing the response from the server.
   */
  public getAllAddressesOfUser(userId: any, pageRequest: PageRequest) {
    return this.httpClient.post<any>(ApiRoutes.GET_ADDRESSES_OF_USER + userId, pageRequest);
  }

  /**
   * Retrieves address verification requests for the specified user ID, based on the provided page request parameters.
   * @param userId The ID of the user for whom address verification requests are to be retrieved.
   * @param pageRequest The pagination parameters for fetching a specific page of verification requests.
   * @returns An observable containing the response from the server.
   */
  public getVerificationRequestsOfUser(userId: any, pageRequest: PageRequest) {
    return this.httpClient.post<any>(ApiRoutes.GET_ADDRESSES_VERIFICATION_OF_USER + userId, pageRequest);
  }

  /**
   * Deletes an address based on the provided address ID.
   * @param addressId The ID of the address to be deleted.
   * @returns An observable containing the response from the server.
   */
  public deleteAddress(addressId: any) {
    return this.httpClient.delete<any>(ApiRoutes.DELETE_ADDRESSES + addressId);
  }

  /**
   * Retrieves detailed information about an address based on the provided address ID.
   * @param addressId The ID of the address for which details are to be retrieved.
   * @returns An observable containing the response from the server.
   */
  public getAddressDetails(addressId: any) {
    return this.httpClient.get<any>(ApiRoutes.GET_ADDRESS_DETAILS + addressId);
  }

  public getAddressverificationDetails(addressVerificationId: any) {
    return this.httpClient.get<any>(ApiRoutes.GET_ADDRESS_VERIFICATION_DETAILS + addressVerificationId);
  }


  /**
   * Deletes a voice direction based on the provided UUID.
   * @param uuid The UUID of the voice direction to be deleted.
   * @returns An observable containing the response from the server.
   */
  public deleteVoiceDirection(uuid: any) {
    return this.httpClient.delete<any>(ApiRoutes.DELETE_VOICE_DIRECTION + uuid);
  }

  /**
   * Deletes a route video based on the provided UUID.
   * @param uuid The UUID of the route video to be deleted.
   * @returns An observable containing the response from the server.
   */
  public deleteRouteVideo(uuid: any) {
    return this.httpClient.delete<any>(ApiRoutes.DELETE_ROUTE_VIDEO + uuid);
  }

  /**
   * Updates an address based on the provided UpdateAddressRequest.
   * @param address The updated address information.
   * @returns An observable containing the response from the server.
   */
  public updateAddress(address: UpdateAddressRequest) {
    return this.httpClient.put<any>(ApiRoutes.UPDATE_ADDRESS, address);
  }
}
