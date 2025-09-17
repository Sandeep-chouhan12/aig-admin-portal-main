import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { User } from '../../models/user';
import { VerificationRequestStatus } from '../../models/verification-request-status';
import { VerificationRequests } from '../../models/verification-requests';
import { AddressesService } from '../../services/addresses.service';
import { TransactionsService } from '../../services/transactions.service';
import { UsersService } from '../../services/users.service';
import { EmergencyService } from '../../services/emergency.service';
import { Address } from '../../models/address';
import { Transaction } from '../../models/transaction';
import { Emergency } from 'src/app/emergency/models/emergency';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { UpdateAddressRequest } from '../../payloads/update-address-request';
import { Constants } from 'src/app/shared/utils/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { AddressDetails } from '../../models/address-details';
import { MapUtils } from 'src/app/shared/utils/map-utils';
import { AddressVerificationDetails } from '../../models/address-verification-details';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';
declare var bootstrap: any;
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [MapUtils]
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user!: User;
  addressDetails!: AddressDetails;
  appUtils = AppUtil;
  constants = Constants

  defaultPropertyImage = AppUtil.DEFAULT_PROPERTY_IMAGE;
  defaultImage = AppUtil.DEFAULT_IMAGE;

  // Pagination for Address List
  addressPageManager: PaginationManager = new PaginationManager();
  addressPageRequest: PageRequest = new PageRequest();
  addressList: Address[] = [];
  deleteAddressId = 0;
  editAddress: UpdateAddressRequest = new UpdateAddressRequest();
  public editForm: FormGroup;

  // Pagination for Transaction List
  transactionPageManager: PaginationManager = new PaginationManager();
  transactionList: Transaction[] = [];
  transactionPageRequest: PageRequest = new PageRequest();

  // Pagination for Emergency List
  emergencyPageManager: PaginationManager = new PaginationManager();
  emergencyPageRequest: PageRequest = new PageRequest();
  emergencyList: Emergency[] = [];

  // Pagination for Verification Requests List
  verificationPageManager: PaginationManager = new PaginationManager();
  userId = 0;
  verificationRequestsStatus = VerificationRequestStatus;
  verificationPageRequest: PageRequest = new PageRequest();
  verificationRequestList: VerificationRequests[] = [];

  componentRoutes = ComponentsRoutes;

  public location = {
    lat: 22.719568,
    long: 75.857727,
    address: '',
    aigCode: '',
  };

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private addressService: AddressesService,
    private transactionService: TransactionsService,
    private emergencyService: EmergencyService,
    private router: Router,
    private mapUtils: MapUtils,
    private fb: FormBuilder) {
    this.editForm = this.fb.group({
      addressType: ['', Validators.required],
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      buildingNo: ['', Validators.required],
      locality: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
    });

    this.addressDetails = new AddressDetails();
    this.addressDetails.addressVerificationDetails = new AddressVerificationDetails();
  }

  ngOnDestroy(): void {
    this.hideSideNav(false);
  }

  ngOnInit(): void {
    this.hideSideNav(true);
    this.addressPageRequest.pageSize = 5;
    this.transactionPageRequest.pageSize = 5;
    this.emergencyPageRequest.pageSize = 5;
    this.verificationPageRequest.pageSize = 5;
    this.activatedRoute.params.subscribe((param: any) => {
      this.userId = param['userId'];
      this.getUserDetails();
    });
  }

  hideSideNav(isOn: boolean) {
    this.sharedService.hideSideNav.next(isOn);
  }

  // Get user details
  public getUserDetails() {
    if (this.userId) {
      this.usersService.getUserDetailsById(this.userId).subscribe({
        next: (data: any) => {

          this.user = data.user;
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
        complete: () => {

          this.getAddressOfUser();
          this.getTransactionOfUser();
          this.getAddressVerificationRequestsOfUser();
          this.getEmergencyOfUser();
        }
      });
    }
  }

  // Get address of user
  public getAddressOfUser(pageRequest: PageRequest = this.addressPageRequest) {
    this.addressPageRequest = pageRequest;

    if (this.userId) {
      this.addressService.getAllAddressesOfUser(this.userId, this.addressPageRequest).subscribe({
        next: (data: any) => {
          this.addressPageManager.setPageData(data.address);
          this.addressList = data.address.content;

        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }
  }

  // Get transaction of user
  public getTransactionOfUser(pageRequest: PageRequest = this.transactionPageRequest) {
    this.transactionPageRequest = pageRequest;

    if (this.userId) {
      this.transactionService.getAllTransactionOfUser(this.userId, this.transactionPageRequest).subscribe({
        next: (data: any) => {

          this.transactionList = data.transactions.content;
          this.transactionPageManager.setPageData(data.transactions);

        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }
  }

  // Get emergency request of user
  public getEmergencyOfUser(pageRequest: PageRequest = this.emergencyPageRequest) {
    this.emergencyPageRequest = pageRequest;

    if (this.userId) {
      this.emergencyService.getEmergencyRequestsOfUser(this.userId, this.emergencyPageRequest).subscribe({
        next: (data: any) => {

          this.emergencyPageManager.setPageData(data.requests);
          this.emergencyList = data.requests.content;

        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }
  }

  // Get address verification of user
  public getAddressVerificationRequestsOfUser(pageRequest: PageRequest = this.verificationPageRequest) {
    this.verificationPageRequest = pageRequest;



    if (this.userId) {
      this.addressService.getVerificationRequestsOfUser(this.userId, this.verificationPageRequest).subscribe({
        next: (data: any) => {
          this.verificationRequestList = data.vertfications.content;
          this.verificationPageManager.setPageData(data.vertfications);
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }
  }

  // Delete address
  public deleteAddress() {
    if (this.deleteAddressId && this.deleteAddressId != 0) {
      this.addressService.deleteAddress(this.deleteAddressId).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
          AppUtil.modalDismiss('close-delete-address');
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
          this.deleteAddressId = 0;
        },
        complete: () => {

          this.getAddressOfUser();
          this.deleteAddressId = 0;
        }
      });
    }
  }

  // Manage pagination for Address List
  manageAddressNext(isNext: boolean) {
    if (isNext) {
      this.addressPageRequest.pageNo++;
    } else {
      this.addressPageRequest.pageNo--;
    }
    if (this.addressPageRequest.pageNo >= 0 && this.addressPageRequest.pageNo < this.addressPageManager.totalPages) {
      this.getAddressOfUser();
    }
  }

  // Set page for Address List
  setAddressPage(page: any) {
    if (page - 1 != this.addressPageRequest.pageNo) {
      this.addressPageRequest.pageNo = page - 1;
      this.getAddressOfUser();
    }
  }

  // Manage pagination for Transaction List
  manageTransactionNext(isNext: boolean) {
    if (isNext) {
      this.transactionPageRequest.pageNo++;
    } else {
      this.transactionPageRequest.pageNo--;
    }
    if (this.transactionPageRequest.pageNo >= 0 && this.transactionPageRequest.pageNo < this.transactionPageManager.totalPages) {
      this.getTransactionOfUser();
    }
  }

  // Set page for Transaction List
  setTransactionPage(page: any) {
    if (page - 1 != this.transactionPageRequest.pageNo) {
      this.transactionPageRequest.pageNo = page - 1;
      this.getTransactionOfUser();
    }
  }

  // Manage pagination for Emergency List
  manageEmergencyNext(isNext: boolean) {
    if (isNext) {
      this.emergencyPageRequest.pageNo++;
    } else {
      this.emergencyPageRequest.pageNo--;
    }
    if (this.emergencyPageRequest.pageNo >= 0 && this.emergencyPageRequest.pageNo < this.emergencyPageManager.totalPages) {
      this.getEmergencyOfUser();
    }
  }

  // Set page for Emergency List
  setEmergencyPage(page: any) {
    if (page - 1 != this.emergencyPageRequest.pageNo) {
      this.emergencyPageRequest.pageNo = page - 1;
      this.getEmergencyOfUser();
    }
  }

  // Manage pagination for Verification Requests List
  manageVerificationNext(isNext: boolean) {
    if (isNext) {
      this.verificationPageRequest.pageNo++;
    } else {
      this.verificationPageRequest.pageNo--;
    }
    if (this.verificationPageRequest.pageNo >= 0 && this.verificationPageRequest.pageNo < this.verificationPageManager.totalPages) {
      this.getAddressVerificationRequestsOfUser();
    }
  }

  // Set page for Verification Requests List
  setVerificationPage(page: any) {
    if (page - 1 != this.verificationPageRequest.pageNo) {
      this.verificationPageRequest.pageNo = page - 1;
      this.getAddressVerificationRequestsOfUser();
    }
  }


  /**
 * Updates an address using the stored editAddress payload.
 */
  updateAddress() {
    FormsValidator.formSubmittion(this.editForm);
    if (this.editForm.invalid)
      return;

    this.toggleLoader();
    this.addressService.updateAddress(this.editAddress).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success');
      },
      error: (err: any) => {
        AppUtil.modalDismiss('close-update-modal');
        AppUtil.openToast('error', err.error.message, 'Error');
        this.toggleLoader();
      },
      complete: () => {
        AppUtil.modalDismiss('close-update-modal');
        this.getAddressOfUser();
        this.toggleLoader();
      }
    });
  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }

  // Navigate to specified path
  navigate(path: string) {
    this.router.navigate(['Admin/' + path]);
  }

  setEditData(address: Address) {
    this.editForm.reset();
    setTimeout(() => {
      this.editAddress = { ...address };
    }, 100);
  }

  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }

  public getAddressDetails(addressId: any) {
    if (addressId && addressId !== 0) {
      this.addressService.getAddressDetails(addressId).subscribe({
        next: (data: any) => {
          this.addressDetails = data.address;
          this.location.long = this.addressDetails.longitude;
          this.location.lat = this.addressDetails.latitude;
          this.location.address = this.addressDetails.address;
          this.location.aigCode = this.addressDetails.aigcode;
          setTimeout(() => {
            let element = document.getElementById('map');
            this.mapUtils.initMap(element, this.location);
          }, 100);

        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
        complete: () => {
          this.openModal();
        }
      });
    }

  }


  public getAddressverificationDetails(verificationId: any) {
    if (verificationId && verificationId !== 0) {
      this.addressService.getAddressverificationDetails(verificationId).subscribe({
        next: (data: any) => {
          this.addressDetails = data.address;
          this.location.long = this.addressDetails.longitude;
          this.location.lat = this.addressDetails.latitude;
          this.location.address = this.addressDetails.address;
          this.location.aigCode = this.addressDetails.aigcode;
          setTimeout(() => {
            let element = document.getElementById('map');

            this.mapUtils.initMap(element, this.location);
          }, 100);
          this.openModal();
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }, complete: () => {

        }
      },
      )
    }
  }


  openModal() {
    let el = document.getElementById('VerificationSummary')
    if (el) {
      const modal = new bootstrap.Modal(el);
      modal.show();
    }

  }
}
