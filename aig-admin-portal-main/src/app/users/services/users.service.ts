import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { UserStatusChangeRequest } from '../payloads/user-status-change-request';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SortStatus } from '../models/sort-status';
import { UpdateUserStatusRequest } from 'src/app/organization/payloads/UpdateUserStatusRequest';
import { DeleteUserByTypeRequest } from 'src/app/organization/payloads/DeleteUserByTypeRequest';
import { UpdateOrganizatinUserRequest } from 'src/app/organization/payloads/updateOrganizationUserRequest';
import { OrganizatinUserRequest } from 'src/app/organization/payloads/organizationUserRequest';
import { User } from '../models/user';
import { CreateCustomPlanRequest } from 'src/app/organization/models/create-custom-plan-request';
import { MonthlyTransactionResponse } from 'src/app/organization/payloads/MonthlyTransactionResponse';

@Injectable({
  providedIn: 'root'
})
/**
 * Service class for managing user-related operations.
 */
export class UsersService {

  /**
   * Constructor for UsersService.
   * @param httpClient - Angular HttpClient for making HTTP requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves a list of users based on the provided page request.
   * @param pageRequest - Object containing page-related parameters.
   * @returns Observable<any> - Observable of the HTTP response containing user list.
   */
  public getUserList(pageRequest: PageRequest, sortStatus: SortStatus): Observable<any> {
    return this.httpClient.post<any>(ApiRoutes.GET_ALL_USERS + sortStatus, pageRequest);
  }

  /**
   * Updates the active status of a user.
   * @param statusUpdateRequest - Object containing user status change parameters.
   * @returns Observable<any> - Observable of the HTTP response indicating status update.
   */
  public updateActiveStatus(statusUpdateRequest: UserStatusChangeRequest): Observable<any> {
    return this.httpClient.put<any>(ApiRoutes.UPDATE_USER_STATUS, statusUpdateRequest);
  }

  /**
   * Deletes a user based on the provided user id.
   * @param userId - The unique identifier of the user to be deleted.
   * @returns Observable<any> - Observable of the HTTP response indicating deletion status.
   */
  public deleteUserById(userId: any): Observable<any> {
    return this.httpClient.delete<any>(ApiRoutes.DELETE_USER + userId);
  }


  // get user details by id
  public getUserDetailsById(userId: any) {
    return this.httpClient.get<any>(ApiRoutes.GET_USER_DETAILS + userId);
  }

  public registerPrivateOrganization(data: FormData) {
    return this.httpClient.post<any>(ApiRoutes.REGISTER_PRIVATE_ORGANIZATION, data);
  }

  public updatePrivateOrganization(data: FormData) {
    return this.httpClient.post<any>(ApiRoutes.UPDATE_PRIVATE_ORGANIZATION, data);
  }
  getBusinessTypes() {
    return this.httpClient.get<any>(ApiRoutes.GET_BUSINESS_TYPES);
  }

  registerGovernmentOrganization(formData: FormData) {
    return this.httpClient.post<any>(ApiRoutes.REGISTER_GOVERNMENT_ORGANIZATION, formData);
  }

  updateGovernmentOrganization(formData: FormData) {
    
    return this.httpClient.post<any>(ApiRoutes.UPDATE_GOVERNMENT_ORGANIZATION, formData);
  }


  //get all  orgnization users
  getAllUsersByType(pageRequest: PageRequest, userType: string) {
    let params = new HttpParams()
      .set('pageNumber', pageRequest.pageNo.toString())
      .set('pageSize', pageRequest.pageSize.toString());

    if (userType) {
      params = params.set('userType', userType);
    }
    return this.httpClient.get<any>(ApiRoutes.GET_ALL_ORGANIZATION_USERS, { params });

  }


  //change status
  changeOrganizationStatus(request: UpdateUserStatusRequest) {
    return this.httpClient.post(ApiRoutes.CHANGE_STATUS_ORGANIZATION, request);
  }


  updateUserStatus(userId: string) {
    const params = new HttpParams().set('id', userId);
    return this.httpClient.put(ApiRoutes.CHANGE_USER_STATUS, {}, { params });
  }
  //delete organization by type
  deleteOrganizationByType(request: DeleteUserByTypeRequest) {
    return this.httpClient.post(ApiRoutes.DELETE_ORGANIZATION, request);
  }

  //get organization by type
  getUserByType(id: string, userType: string) {
    const params = new HttpParams()
      .set('id', id)
      .set('userType', userType);
    return this.httpClient.get(ApiRoutes.GET_ORGANIZATION_BY_TYPE, { params });
  }


  getPrivateUserDetails(organizationId: string) {
    const params = new HttpParams().set('organizationId', organizationId);
    return this.httpClient.get(ApiRoutes.GET_PRIVATE_ORGANIZATION_DETAILS, { params });
  }

  getGovernmentOrganzationDetails(organizationId: string) {
    const params = new HttpParams().set('organizationId', organizationId);
    return this.httpClient.get(ApiRoutes.GET_GOVERNMENT_ORGANIZATION_DETAILS, { params });
  }

  getAllOrganizationUserByOrganizationId(pageRequest: PageRequest, organizationId: string) {
    let params = new HttpParams()
      .set('organizationId', organizationId)
      .set('pageNumber', pageRequest.pageNo.toString())
      .set('pageSize', pageRequest.pageSize.toString());

    return this.httpClient.get<any>(ApiRoutes.GET_ALL_ORGANIZATION_USERS_BY_ORGANIZATIONID, { params });
  }


  updateOrganizationUser(updateOrganizatinUserRequest: UpdateOrganizatinUserRequest) {
    let formData = new FormData();
    formData.append('id', updateOrganizatinUserRequest.id);
    formData.append('organizationId', updateOrganizatinUserRequest.organizationId);
    formData.append('email', updateOrganizatinUserRequest.email);
    formData.append('name', updateOrganizatinUserRequest.name);
    formData.append('phoneNumber', updateOrganizatinUserRequest.phoneNumber);
    formData.append('roleId', updateOrganizatinUserRequest.roleId);
    if (updateOrganizatinUserRequest.profilePic) {
      formData.set("profilePic", updateOrganizatinUserRequest.profilePic);
    }
    return this.httpClient.put<any>(ApiRoutes.UPDATE_ORGANIZATION_USER, formData);

  }

  public addOrganizaionUser(organizatinUserRequest: OrganizatinUserRequest) {

    let formData = new FormData();
    formData.append('organizationId', organizatinUserRequest.organizationId);
    formData.append('email', organizatinUserRequest.email);
    formData.append('name', organizatinUserRequest.name);
    formData.append('phoneNumber', organizatinUserRequest.phoneNumber);
    formData.append('roleId', organizatinUserRequest.roleId);
    if (organizatinUserRequest.profilePic) {
      formData.set("profilePic", organizatinUserRequest.profilePic);
    }
    return this.httpClient.post<any>(ApiRoutes.ADD_ORGANIZATION_USER, formData);
  }


  getAllRolesExcludeAdmin(page: PageRequest, organizationId: any): Observable<any> {
    return this.httpClient.post(ApiRoutes.GET_ALL_ROLES + '?organizationId=' + organizationId, page);
  }

  getSubscriptionByOrgId(id: string) {

    const params = new HttpParams().set('id', id);
    return this.httpClient.get(ApiRoutes.GET_API_KEYS_BY_ORGID, { params });
  }
  getAllTransactionOfApiUser(organizationId: string, page: PageRequest) {
    const params = {
      organizationId: organizationId,
      pageNumber: page.pageNo,
      pageSize: page.pageSize
    };
    return this.httpClient.get(ApiRoutes.GET_ALL_TRANSACTION, { params });
  }

  updateOrganizationUserStatus(userId: string) {
    const params = new HttpParams().set('id', userId);
    return this.httpClient.put(ApiRoutes.UPDATE_ORGANIZATION_USER_STATUS, {}, { params });
  }

  deleteUser(userId: string) {
    return this.httpClient.delete<any>(ApiRoutes.DELETE_ORGANIZATION_USER, { params: { id: userId } })
  }

  getEndPoints(organizationId: string) {
    const params = new HttpParams().set('organizationId', organizationId);
    return this.httpClient.get(ApiRoutes.GET_END_POINTS, { params });
  }

  enableEndpointsForOrganization(organizationId: string, endpointId: string) {
    const params = new HttpParams()
      .set('organizationId', organizationId)
      .set('endpointId', endpointId);
    return this.httpClient.post<any>(
      ApiRoutes.ENABLE_END_POINTS,
      null,
      { params }
    );
  }


  getAllUsers(page: PageRequest) {
    return this.httpClient.post(ApiRoutes.GET_ALL_USERS, page);
  }

  updateUser(user: User) {
    return this.httpClient.put(ApiRoutes.UPDATE_USER, user);
  }

  getTransactionSummary(body: { organizationId: string; mode: string }) {
    return this.httpClient.post<MonthlyTransactionResponse[]>(ApiRoutes.GET_ALL_TRANSACTION_COUNT, body);
  }


  public getApiRequestAnalytics(organizationId: string) {
    return this.httpClient.get<any>(`${ApiRoutes.GET_API_REQUEST_ANALYTICS}?organizationId=${organizationId}`);
  }


  getOverAllApiHistory(organizationUserId: string) {
    return this.httpClient.get<any>(`${ApiRoutes.GET_OVERALL_API_REQUEST_ANALYTICS}?organizationId=${organizationUserId}`);
  }



}