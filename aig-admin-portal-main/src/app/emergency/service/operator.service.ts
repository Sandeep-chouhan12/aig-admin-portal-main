import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { EmergencyOfficerRequest } from '../payload/emergency-officer-request';
import { SortStatus } from 'src/app/users/models/sort-status';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http: HttpClient) { }

  public getAllEmergencyOperators(pageRequest: PageRequest,sortStatus:SortStatus) {
    return this.http.post(ApiRoutes.GET_ALL_EMERGENCY_OPERATORS+sortStatus, pageRequest)
  }

  public changeEmergencyOfficerActiveStatus(userId: number) {
    return this.http.put(ApiRoutes.CHANGE_EMERGENCY_OPERATORS_ACTIVE_STATUS + userId, null)
  }

  public deleteEmergencyOperator(userId: number) {
    return this.http.delete(ApiRoutes.DELETE_EMERGENCY_OPERATORS + userId)
  }

  public addEmergencyOperator(emergencyOfficer: EmergencyOfficerRequest) {
    let data: FormData = new FormData()
    if (emergencyOfficer.profilePicture)
      data.append('profilePicture', emergencyOfficer.profilePicture)
    data.append('firstName', emergencyOfficer.firstName)
    data.append('lastName', emergencyOfficer.lastName)
    data.append('email', emergencyOfficer.email)
    data.append('phoneNumber', emergencyOfficer.phoneNumber.toString())
    data.append('password', emergencyOfficer.password)
    data.append('emergencyServiceName', emergencyOfficer.emergencyServiceName)
    data.append('description', emergencyOfficer.description);
    data.append('emergencyImage', emergencyOfficer.emergencyImage)
    return this.http.post(ApiRoutes.ADD_EMERGENCY_OPERATOR, data);
  }

  public updateEmergencyOperator(emergencyOfficer: EmergencyOfficerRequest) {
    let data: FormData = new FormData()
    if (emergencyOfficer.profilePicture instanceof File)
      data.append('profilePicture', emergencyOfficer.profilePicture)
    data.append('firstName', emergencyOfficer.firstName)
    data.append('lastName', emergencyOfficer.lastName)
    data.append('id', emergencyOfficer.id.toString())
    data.append('emergencyServiceName', emergencyOfficer.emergencyServiceName)
    data.append('description', emergencyOfficer.description);
    if (emergencyOfficer.emergencyImage instanceof File)
      data.append('emergencyImage', emergencyOfficer.emergencyImage)
    data.append('emergencyId', emergencyOfficer.emergencyId.toString())
    return this.http.put(ApiRoutes.UPDATE_EMERGENCY_OPERATOR, data);
  }

  public getEmergencyOperatorDetailsById(operatorId: number) {
    return this.http.get(ApiRoutes.GET_EMERGENCY_OPERATOR_BY_ID + operatorId)
  }

  getTotalEmergencyOperatorRequest(totalPageRequest: PageRequest, id: number, status: any) {
    let data: FormData = new FormData();
    data.append('id', id.toString())
    data.append('pageNo', totalPageRequest.pageNo.toString())
    data.append('pageSize', totalPageRequest.pageSize.toString());
    data.append('requestStatus', status)
    return this.http.post(ApiRoutes.GET_TOTAL_EMERGENCY_OPERATOR_REQUEST, data)
  }
}
