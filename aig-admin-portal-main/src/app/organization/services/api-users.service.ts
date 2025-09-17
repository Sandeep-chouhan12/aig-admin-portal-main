import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { UserResponse } from '../models/user-response';
import { PageRequest } from 'src/app/shared/models/page-request';
import { SortStatus } from 'src/app/users/models/sort-status';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {





  constructor(private http: HttpClient) { }

  public getAllApiUsers(pageRequest: PageRequest,sortStatus:SortStatus) {
    return this.http.post(ApiRoutes.GET_ALL_API_USERS+sortStatus, pageRequest);
  }

  public deleteUser(userId: number) {
    return this.http.delete(ApiRoutes.DELETE_API_USER + '?userId=' + userId);
  }

  public changeUserApiRequestStatus(userId: number) {
    return this.http.put(ApiRoutes.CHANGE_USER_API_STATUS + '?userId=' + userId, null);
  }
  public updateUser(user: UserResponse) {
    let data: FormData = new FormData()
    data.append('id', user.id.toString())
    if (user.profilePicture instanceof File)
      data.append('profilePicture', user.profilePicture)
    data.append('firstName', user.personalInformationResponse.firstName)
    data.append('lastName', user.personalInformationResponse.lastName)
    return this.http.put(ApiRoutes.UPDATE_USER, data);
  }

  public getApiUserById(userId: number) {
    return this.http.get(ApiRoutes.GET_API_USER + userId);
  }

  getUserApiKeys(userId: number, ApiKeyPageReqeust: PageRequest) {
    let data: FormData = new FormData();
    data.append('id', userId.toString())
    data.append('pageNo', ApiKeyPageReqeust.pageNo.toString())
    data.append('pageSize', ApiKeyPageReqeust.pageSize.toString())
    return this.http.post(ApiRoutes.GET_USER_API_KEYS, data)
  }

  public getApiDocUserAcquition(key: number) {
    return this.http.post<any>(ApiRoutes.API_USER_ACQUITION + key, {});
  }

  public getApiCallSummary(key: number) {
    return this.http.post<any>(ApiRoutes.API_CALL_SUMMARY + key, {});
  }

  getTopCollaborators() {
    return this.http.get(ApiRoutes.TOP_COLLABORATORS)
  }


}
