import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { Plan } from '../models/plan';
import { UpdatePlanRequest } from '../payloads/update-plan-request';
import { CreateCustomPlanRequest } from 'src/app/organization/models/create-custom-plan-request';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  public getAllPlans(pageRequest: PageRequest) {
    let params = {
      pageSize: pageRequest.pageSize.toString(),
      pageNo: pageRequest.pageNo.toString()
    }
    return this.http.get(ApiRoutes.GET_ALL_PLANS, { params })
  }

  public deletePlan(planId: number) {
    return this.http.delete(ApiRoutes.DELETE_API_PLAN + '?id=' + planId)
  }
  public updatePlan(plan: UpdatePlanRequest) {
    return this.http.put(ApiRoutes.UPDATE_PLAN, plan)
  }

  public addPlan(plan: Plan) {
    return this.http.post(ApiRoutes.ADD_PLAN, plan)
  }

  //create custom plan
    public createCustomPlan(plan: CreateCustomPlanRequest) {
    return this.http.post(ApiRoutes.ADD_CUSTOM_PLAN, plan)
  }
}
