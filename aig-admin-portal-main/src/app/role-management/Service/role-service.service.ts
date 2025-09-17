import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Permission } from '../model/permission';
import { RoleRequest } from '../model/role-request';
import { PageRequest } from 'src/app/shared/models/page-request';
import { User } from 'src/app/users/models/user';
import { UserResponse } from '../model/user-response';
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  public BASE_URL = environment.hostUrl + "/admin/roles";
  constructor(private http: HttpClient) { }

  // 1. Add Role
  addRole(role: RoleRequest): Observable<any> {
    return this.http.post(`${this.BASE_URL}/add`, role);
  }
  // 2. Get all roles with pagination
  getAllRoles(page: PageRequest, sortIsActiveOrder: boolean, isActive?: boolean): Observable<any> {
    let params = new HttpParams()
    if (isActive != null) {
      params = params.set('isActive', isActive ? isActive : false);
    }
    if (sortIsActiveOrder != null) {
      params = params.set('sortStatus', sortIsActiveOrder.toString());
    }
    return this.http.post(`${this.BASE_URL}/getAllRolesExcludeAdmin`, page, { params: params });
  }

  getAllRolesExculdeAdminWithoutPagination(sortIsActiveOrder: boolean, isActive?: boolean){

    let params = new HttpParams()
    if (isActive != null) {
      params = params.set('isActive', isActive ? isActive : false);
    }
    if (sortIsActiveOrder != null) {
      params = params.set('sortStatus', sortIsActiveOrder.toString());
    }
    return this.http.post(`${this.BASE_URL}/getAllRolesExcludeAdmin`,null, { params: params });
  
  }

  // 3. Delete a role
  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete/${id}`);
  }

  // 4. Update a role
  updateRole(id: number, role: RoleRequest): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, role);
  }

  // 5. Get permissions of a role
  getPermissionsByRoleId(roleId: number, page: PageRequest): Observable<Permission[]> {
    return this.http.post<Permission[]>(`${this.BASE_URL}/${roleId}/permissions`, page);
  }

  // 6. Update permissions of a role
  updateSinglePermission(permissionId: number, payload: {
    canRead: boolean;
    canCreate: boolean;
    canDelete: boolean;
    canUpdate: boolean;
  }): Observable<any> {
    return this.http.put(`${this.BASE_URL}/permissions/${permissionId}`, payload);
  }

  updateRoleStatus(roleId: number) {
    return this.http.put(`${this.BASE_URL}/${roleId}/status`, null);
  }

  updatePermissions(permissionList: any[]) {
    return this.http.post(`${this.BASE_URL}/permissions/bulk-update`, permissionList);
  }
  addUser(user: UserResponse) {
    const formData = new FormData();

    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('roleId', user.roleId.toString());

    if (user.profilePicture instanceof File) {
      formData.append('profilePicture', user.profilePicture);
    }

    return this.http.post(`${this.BASE_URL}/addUser`, formData);
  }


  updateUser(user: UserResponse) {

    let formData = new FormData();
    formData.append('userId', user.id.toString());
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('roleId', user.roleId.toString());


    if (user.profilePicture instanceof File)
      formData.append('profilePicture', user.profilePicture);


    return this.http.put(`${this.BASE_URL}/updateUser`, formData);
  }

  deleteUserById(userId: number) {
    return this.http.delete(`${this.BASE_URL}/deleteUser?userId=${userId}`);
  }

  getAllUsers(page: PageRequest) {
    return this.http.post(`${this.BASE_URL}/getAllUser`, page);
  }


  updateUserStatus(userId: number) {
    return this.http.put(`${this.BASE_URL}/updateUserStatus?userId=${userId}`, null);
  }

}
