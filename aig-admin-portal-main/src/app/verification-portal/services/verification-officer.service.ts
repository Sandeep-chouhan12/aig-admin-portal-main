import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { VerificationOfficer } from '../models/verification-officer';
import { Officer } from 'src/app/emergency/models/officer';
import { of } from 'rxjs';
import { SortStatus } from 'src/app/users/models/sort-status';
@Injectable({
  providedIn: 'root'
})
export class VerificationOfficerService {



  constructor(private http: HttpClient) { }

  public getAllVerificationOfficers(pageRequest: PageRequest,sortStatus:SortStatus) {
    return this.http.post(ApiRoutes.GET_ALL_VERIFICATION_PORTAL_OFFICERS+sortStatus, pageRequest)
  }

  public addPortalVerificationOfficer(officer: VerificationOfficer) {
    let data = new FormData();
    data.append('firstName', officer.firstName)
    data.append('lastName', officer.lastName)
    data.append('phoneNumber', officer.phoneNumber.toString())
    if (officer.profilePicture != null)
      data.append('profilePicture', officer.profilePicture)
    data.append('password', officer.password)
    data.append('email', officer.email)

    return this.http.post(ApiRoutes.ADD_VERIFICATION_PORTAL_OFFICER, data)
  }
  public deleleAddVerificationOfficer(officerId: number) {
    return this.http.delete(ApiRoutes.DELETE_VERIFICATION_PORTAL_OFFICER + officerId)
  }

  changeVerificatioOfficerStatus(officerId: number) {
    return this.http.put(ApiRoutes.CHANGE_VERIFICATION_PORTAL_OFFICER_STATUS + officerId, null)
  }

  updateVerificationPortalOfficer(officer: VerificationOfficer) {
    let data = new FormData();
    data.append('firstName', officer.firstName)
    data.append('lastName', officer.lastName)
    data.append('id', officer.id.toString())
    if (officer.profilePicture instanceof File)
      data.append('profilePicture', officer.profilePicture)
    return this.http.put(ApiRoutes.UPDATE_VERIFICATION_PORTAL_OFFICER, data)
  }
}
