
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiUserTransaction } from 'src/app/organization/models/api-user-transaction';
import { OrganizationResponse } from 'src/app/organization/models/OrganizationResponse';
import { Subscription } from 'src/app/organization/models/subscription';
import { ApiEndpointsResponse } from 'src/app/organization/payloads/api-endpoints-response';
import { GovernmentOrganizationDetailResponse } from 'src/app/organization/payloads/GovernmentOrganizationDetailResponse';
import { OrganizatinUserRequest } from 'src/app/organization/payloads/organizationUserRequest';
import { OrganizationUserResponse, Role } from 'src/app/organization/payloads/OrganizationUserResponse';
import { UpdateOrganizatinUserRequest } from 'src/app/organization/payloads/updateOrganizationUserRequest';
import { UpdateUserStatusRequest } from 'src/app/organization/payloads/UpdateUserStatusRequest';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { UsersService } from 'src/app/users/services/users.service';
import { ChartOptions, ReportApiBarChartComponent } from '../report-api-bar-chart/report-api-bar-chart.component';
import { areaChartConfig } from 'src/app/shared/charts/areaChartConfig';
import { ChartComponent } from 'ng-apexcharts';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CreateCustomPlanRequest } from '../../models/create-custom-plan-request';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { PlanService } from 'src/app/organization/services/plan.service';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Cons } from 'rxjs';
import { Constants } from 'src/app/shared/utils/constants';
declare var bootstrap: any;

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements AfterViewInit {
  // userId: string = '';
  // userType: string = 'GOVERNMENT';
  user: OrganizationResponse = new OrganizationResponse();
  updateUserStatusRequest: UpdateUserStatusRequest = new UpdateUserStatusRequest();
  governmentOrganizationDetailResponse: GovernmentOrganizationDetailResponse = new GovernmentOrganizationDetailResponse();
  pageRequest: PageRequest = new PageRequest();
  organizationUserResponse: OrganizationUserResponse[] = [];
  userId: string = '';
  organizationUserId: string = '';
  userType: string = '';
  organizationDetails: any;
  subscription: Subscription = new Subscription();
  transactionList: ApiUserTransaction[] = [];
  form!: FormGroup;
  isEditMode = false;
  selectedUserId = '';
  selectedProfilePic: File | null = null;
  selectedProfileFile: File | null = null;  // actual file
  updateOrganizatinUserRequest: UpdateOrganizatinUserRequest = new UpdateOrganizatinUserRequest();
  organizatinUserRequest: OrganizatinUserRequest = new OrganizatinUserRequest();
  selectedRoleName: string = '';
  selectedRoleId: string = '';
  endpoints: ApiEndpointsResponse[] = [];
  paginationManager: PaginationManager = new PaginationManager();
  appUtils = AppUtil
  userPicUrl: any;
  selectedFile: File | null = null;
  constant = Constants
  componentRoutes = ComponentsRoutes

  isDropdownOpen = false;
  errorMessage: string = '';
  isSubmitting = false;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions1: Partial<ChartOptions>;

  public customPlan = new CreateCustomPlanRequest()
  priceForm !: FormGroup;
  total_falied_api: number = 0
  total_success_api: number = 0

  constructor(private sharedService: SharedService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private router: Router, private userService: UsersService,
    private fb: FormBuilder, public loaderService: LoaderService, private planService: PlanService) {
    sharedService.hideSideNav.next(true);
    sharedService.setTitle('Organization Details')
    this.chartOptions1 = areaChartConfig;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const selectBoxes = document.querySelectorAll('.custom-select');
      selectBoxes.forEach(selectBox => {
        const display = selectBox.querySelector('.select-display') as HTMLElement;
        const options = selectBox.querySelectorAll('.dropdown-options-list');

        // Toggle dropdown on display click
        display?.addEventListener('click', (e) => {
          e.stopPropagation();
          selectBox.classList.toggle('active');
        });
        options.forEach(option => {
          option.addEventListener('click', () => {
            const selectedText = option.textContent?.trim() || '';
            display.querySelector('span')!.textContent = selectedText;
            this.selectedRoleName = selectedText;
            selectBox.classList.remove('active');
          });
        });
        document.addEventListener('click', (event) => {
          if (!selectBox.contains(event.target as Node)) {
            selectBox.classList.remove('active');
          }
        });
      });
    }, 500);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.userType = params['type'];

      if (this.userId && this.userType) {
        this.getUserByType(this.userId, this.userType);
      }
    });
    this.getAllOrganizationUsersByOrgId();
    this.initializeForm();
    this.initializePriceForm();
    this.fetchRoles();
    this.getOverAllApiHistory()
  }

  // fetch overall api history of current year
  getOverAllApiHistory() {
    this.userService.getOverAllApiHistory(this.userId).subscribe((data: any) => {
      this.total_falied_api = data.response.total_falied_api || 0
      this.total_success_api = data.response.total_success_api || 0
      this.chartOptions1 = {
        series: [
          {
            name: "Net Profit",
            data: data.response.apiHistory || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
        ],
        colors: ["#1A3275"],
        grid: {
          strokeDashArray: 7,
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        chart: {
          zoom: {
            enabled: false,
            allowMouseWheelZoom: false,

          },
          toolbar: {
            show: false
          },
          type: "bar",
          height: 300
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            borderRadiusApplication: 'end',
            horizontal: false,
            columnWidth: "55%",
          }
        }
        ,
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          show: false,
        },
        yaxis: {
          show: false
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return "$ " + val + " thousands";
            }
          }
        }
      };
    });
  }

  getUserByType(userId: any, userType: any) {
    this.userService.getUserByType(userId, userType).subscribe((data: any) => {
      this.user = data.response;

    });
  }
  changeOrgnizationStatus(item: any) {
    this.updateUserStatusRequest.organizationId = item.organizationId;
    this.updateUserStatusRequest.userType = item.userType;
    this.userService.changeOrganizationStatus(this.updateUserStatusRequest).subscribe({
      next: (response: any) => {
        AppUtil.openToast('success', response.message, 'Success');
      },
      error: (error: any) => {
        //toast.error(error.error.message);
      },
    });
  }


  changeUserStatus(item: any) {
    // this.userId = item.id;
    this.userService.updateUserStatus(item.id).subscribe({
      next: (response: any) => {
        AppUtil.openToast('success', response.message, 'Success');
      },
      error: (error: any) => {
        // toast.error(error.error.message);
      },
    });
  }
  getGovernmentOrganzationDetails() {
   
    this.userService.getGovernmentOrganzationDetails(this.userId).subscribe((data: any) => {
      this.governmentOrganizationDetailResponse = data.response;
    })
  }

  getAllOrganizationUsersByOrgId() {
    // alert(this.userId);
    this.userService.getAllOrganizationUserByOrganizationId(this.pageRequest, this.userId).subscribe({
      next: (res: any) => {
        this.organizationUserResponse = res.response.content;
        this.paginationManager.setPageData(res.response);
        this.pageRequest.pageNo = res.response.pageNumber;

      },
      error: err => {
        console.error('Failed to fetch organization users', err);
      }
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")
        ]
      ],

      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
      roleId: [null, Validators.required],
      profilePic: [null]
    });
  }

  initializePriceForm() {
    this.priceForm = this.fb.group({
      price: [, [Validators.required, Validators.min(1)]],
      numberOfRequests: [, [Validators.required, Validators.min(1)]]
    });
  }

  resetForm() {
    this.form.reset();
    this.selectedRoleName = '';
  }
  isAdminRole: boolean = false;


  toggleDropdown() {
    if (!this.isAdminRole) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  openModalForAdd() {
    this.isEditMode = false;
    this.selectedUserId = '';
    this.selectedProfilePic = null;
    this.userPicUrl = null;
    this.selectedRoleName = '';
    this.isAdminRole = false; // reset
    this.isDropdownOpen = false;
    this.form.reset();
    this.errorMessage='';
    this.cdRef.detectChanges();
  }

  openModalForEdit(user: any) {
    this.isEditMode = true;
    this.selectedUserId = user.id;
    this.errorMessage='';
    this.form.patchValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roleId: user.role.roleId,
      profilePic: user.profilePic
    });
    this.selectedRoleName = user.role.roleName;
    this.userPicUrl = user.profilePic || '';
    this.isAdminRole = user.role.roleName === 'ADMIN'; // important
    this.isDropdownOpen = false;
  }




  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSizeInMB = 2; // Example: 2 MB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        this.errorMessage = 'Only JPG, PNG, or GIF images are allowed.';
        // this.userPicUrl = '';
        this.selectedFile = null;
        return;
      }

      if (file.size > maxSizeInBytes) {
        this.errorMessage = `File size should not exceed ${maxSizeInMB} MB.`;
        // this.userPicUrl = '';
        this.selectedFile = null;
        return;
      }

    this.errorMessage = '';

    if (this.userPicUrl) {
      URL.revokeObjectURL(this.userPicUrl);
    }

    if (this.isEditMode) {
      this.updateOrganizatinUserRequest.profilePic = file;
    } else {
      this.organizatinUserRequest.profilePic = file;
    }

    this.userPicUrl = URL.createObjectURL(file);
    this.selectedFile = file;
  }
}



  selectRole(roleId: any, roleName: string) {
    this.selectedRoleId = roleId;
    this.selectedRoleName = roleName;
    this.form.get('roleId')?.setValue(roleId);
    this.isDropdownOpen = false;
  }



  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formValue = this.form.value;
    this.updateOrganizatinUserRequest = formValue;
    this.updateOrganizatinUserRequest.profilePic = this.selectedFile;
    if (this.isEditMode) {
      this.updateOrganizatinUserRequest.id = this.selectedUserId;
      this.userService.updateOrganizationUser(this.updateOrganizatinUserRequest).subscribe({
        next: (res) => {
          AppUtil.openToast('success', res.message, 'Success');
          this.getAllOrganizationUsersByOrgId();
          this.closeModal();
          this.resetFormState();
          this.isSubmitting = false;
        }
        , error: (err) => {
          this.isSubmitting = false;
          const errorMessage = err?.error?.message || 'Something went wrong!';
          AppUtil.openToast('error', errorMessage, 'Error');
        }
      });

    } else {
      this.organizatinUserRequest = formValue;
      this.organizatinUserRequest.organizationId = this.userId;
      this.organizatinUserRequest.profilePic = this.selectedFile;
      this.userService.addOrganizaionUser(this.organizatinUserRequest).subscribe({
        next: (res) => {
          AppUtil.openToast('success', res.message, 'Success');
          this.getAllOrganizationUsersByOrgId();
          this.closeModal();
          this.resetFormState();
          this.isSubmitting = false;
        }
        , error: (err) => {
          this.isSubmitting = false;
          const errorMessage = err?.error?.message || 'Something went wrong!';
          AppUtil.openToast('error', errorMessage, 'Error');
        }
      });
    }
  }
  resetFormState() {
    this.form.reset();
    this.form.get('roleId')?.setValue(null);
    this.isDropdownOpen = false;
    this.selectedRoleName = '';
    this.userPicUrl = null;
    this.selectedFile = null;
    this.isEditMode = false;
    const fileInput = document.getElementById('file1') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  closeModal() {
    (document.getElementById('closeModalDelete') as HTMLElement).click();
  }
  roles: Role[] = [];
  role: Role = new Role();
  rolesLoaded = false;
  noRolesAvailable: boolean = false;
  fetchRoles(): void {
    this.userService.getAllRolesExcludeAdmin(this.pageRequest, this.userId).subscribe(res => {
      this.roles = res.response.content;
      this.noRolesAvailable = this.roles.length === 0;
      this.rolesLoaded = true;
    });
  }


  loadProfileTabCalled = false;

  loadProfileTab(orgId: string, type: string) {
    this.userId = orgId;
    this.userType = type;

    this.loadProfileTabCalled = true;
  }


  public getAPiKeyData() {
    this.userService.getSubscriptionByOrgId(this.userId).subscribe((data: any) => {
      this.subscription = data.subscription;

      // Add expanded = false to each API key
      if (this.subscription?.apiKeys?.length) {
        this.subscription.apiKeys = this.subscription.apiKeys.map((item: any) => ({
          ...item,
          expanded: false
        }));
      }
    });
  }


  getAllApiUserTransactions() {
    this.userService.getAllTransactionOfApiUser(this.userId, this.pageRequest)
      .subscribe({
        next: (res: any) => {
          this.transactionList = res.transactions.content;
        },
        error: (err) => {
          console.error('Error fetching transactions:', err);
        }
      });
  }

  closeDeleteModal() {
    let ele = document.getElementById('deleteModalClose') as HTMLElement;
    ele && ele.click();
  }



  deleteUser() {
    this.userService.deleteUser(this.organizationUserId).subscribe((response: any) => {
      AppUtil.openToast('success', response.message, 'Success');
      this.getAllOrganizationUsersByOrgId();
      this.closeDeleteModal();
    }, (error: any) => {
      //toast.error(error.error.message);
    })
  }

  setUserId(userId: string) {
    this.organizationUserId = userId;
  }

  public getEndPoints() {
    this.userService.getEndPoints(this.userId).subscribe({
      next: (res: any) => {
        this.endpoints = res.response;
      },
      error: (err) => {
        console.error('Error fetching endpoints:', err);
      }
    });
  }

  changeEndpointStatus(endpoint: any) {
    this.userService.enableEndpointsForOrganization(this.userId, endpoint.endPointId).subscribe({
      next: (res: any) => {
        this.getEndPoints();
        AppUtil.openToast('success', res.message, 'Success');
      },
      error: (err) => {
        console.error('Error fetching endpoints:', err);
      }
    });
  }

  public createCustomPlan() {
    if (this.priceForm.invalid) {
      this.priceForm.markAllAsTouched();
      return;
    }
    const formValue = this.priceForm.value;
    this.customPlan.amount = formValue.price;
    this.customPlan.totalRequests = formValue.numberOfRequests;
    this.customPlan.organizationId = this.userId;
    this.planService.createCustomPlan(this.customPlan).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success');
        this.priceForm.reset();
      }
      , error: (err: any) => {
      }
    });

  }

  clickTab(){
    this.priceForm.reset();
  }
  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }

    id: any;

    setId(id: any) {
      if (id == this.id) {
        this.id = 0;
      } else {
        this.id = id;
      }
    }

}