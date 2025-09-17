import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { Plan } from '../../models/plan';
import { PlanService } from '../../services/plan.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent {

  plans: Plan[] = [];
  plan = new Plan();
  planForm!: FormGroup;
  plandId!: number;
  constant = Constants;
  appUtil = AppUtil;
  id: any;
  permissionType = PermissionType
  permissionTitle = PermissionTitle

  pageRequest: PageRequest = new PageRequest()
  paginationManager: PaginationManager = new PaginationManager();

  constructor(private planService: PlanService, private formBuilder: FormBuilder, public loaderService: LoaderService, private sharedService: SharedService) {
    this.planForm = this.formBuilder.group({
      planName: ['', Validators.required],
      totalRequests: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    })

    this.sharedService.hideSideNav.next(false);
  }

  ngOnInit(): void {
    this.getAllPlans()
  }

  getAllPlans() {
    this.planService.getAllPlans(this.pageRequest).subscribe({
      next: (data: any) => {
        this.plans = (data.plans.content || []).map((plan: any) => ({
          ...plan,
          expanded: false // for toggling description view
        }));

        this.paginationManager.setPageData(data.plans);
        this.pageRequest.pageNo = data.plans.pageable.pageNumber;
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error');
      }
    });
  }
  
  setId(planId: any) {
    if (planId == this.id) {
      this.id = 0;
    } else {
      this.id = planId;
    }
  }

  deletePlan() {
    this.toggleLoader();
    this.planService.deletePlan(this.plandId).subscribe({
      next: (data: any) => {
        this.getAllPlans();
        AppUtil.modalDismiss('delete-modal-close');
        AppUtil.openToast('success', data.message, 'Success');
        this.toggleLoader();
      },
      error: (er: any) => {
        AppUtil.openToast('error', er.error.message, 'Error');
        this.toggleLoader();
      }
    })
  }

  updatePlan() {
    if (this.planForm.invalid) {
      AppUtil.checkFormValidOrNot(this.planForm);
      return;
    } else {
      this.toggleLoader();
      this.planService.updatePlan(this.plan).subscribe({
        next: (data: any) => {
          this.plans = this.plans.map(obj => obj.id == data.plan.id ? data.plan : obj)
          this.plan = new Plan();
          this.planForm.reset();
          AppUtil.modalDismiss('edit-modal-close')
          AppUtil.openToast('success', data.message, 'Success');
          this.toggleLoader();
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }
      })
    }
  }

  setPlan(plan: any) {
    this.plan = { ...plan }
  }

  addPlan() {


    if (this.planForm.valid) {

      this.toggleLoader();
      this.planService.addPlan(this.plan).subscribe({
        next: (data: any) => {
          this.plans.push(data.plan);
          this.plan = new Plan();
          this.planForm.reset();
          AppUtil.openToast('success', data.message, 'Success');
          AppUtil.modalDismiss('add-modal-close');
          this.toggleLoader();
        },
        error: (er: any) => {
          AppUtil.openToast('error', er.error.message, 'Error');
          this.toggleLoader();
        }
      })
    } else {
      AppUtil.checkFormValidOrNot(this.planForm)
      return;
    }
  }
  public clearObject() {
    this.plan = new Plan();
    this.planForm.reset();
  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }
}
