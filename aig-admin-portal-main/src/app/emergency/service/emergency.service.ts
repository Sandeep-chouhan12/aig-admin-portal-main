import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestStatus } from 'src/app/organization/models/request-status';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(private http: HttpClient) { }

  public getAllEmergencyServiceHistory(pageRequest: PageRequest,sortStatus:RequestStatus) {
    return this.http.post(ApiRoutes.GET_ALL_EMERGENCY_HISTORY+sortStatus, pageRequest)
  }

  public deleteEmergencyServiceHistory(emergencyId: number) {
    return this.http.delete(ApiRoutes.DELET_EMERGENCY_HISTORY + emergencyId)
  }

}
