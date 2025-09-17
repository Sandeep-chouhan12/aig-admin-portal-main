import { Component, OnInit } from '@angular/core';
import { TableConfig } from 'src/app/shared/models/table-config';
import { Address, addressTableCol } from '../../models/address';
import { ModalConfig } from 'src/app/shared/models/modal-config';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { AddressesService } from '../../services/addresses.service';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Router } from '@angular/router';
import { UpdateAddressRequest } from '../../payloads/update-address-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { Constants } from 'src/app/shared/utils/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SortStatus } from '../../models/sort-status';
import { AddressDetails } from '../../models/address-details';
import { MapUtils } from 'src/app/shared/utils/map-utils';
import { AddressVerificationDetails } from '../../models/address-verification-details';
import { PageStateService } from 'src/app/shared/services/page-state.service';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
  providers: [MapUtils]
})
export class UserAddressComponent implements OnInit {

  sortIsActive: SortStatus = SortStatus.ALL;

  sortStatus = SortStatus;

  defaultPropertyImage = AppUtil.DEFAULT_PROPERTY_IMAGE;
  defaultImage = AppUtil.DEFAULT_IMAGE;
  // Pagination and data management
  pageManager: PaginationManager = new PaginationManager();
  pageRequest: PageRequest = new PageRequest();
  addressList: Address[] = [];
  public editForm: FormGroup;
  // App utilities and editing address payload
  appUtils = AppUtil;
  editAddress: UpdateAddressRequest = new UpdateAddressRequest();
  constants = Constants

  // Routes and delete operation variables
  componentRoutes = ComponentsRoutes;
  deleteId = 0;

  public location = {
    lat: 22.719568,
    long: 75.857727,
    address: '',
    aigCode: '',
  };

  addressDetails!: AddressDetails;
  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  constructor(private addressService: AddressesService, private router: Router, private fb: FormBuilder, public loaderService: LoaderService, private mapUtils: MapUtils, private pageState: PageStateService) {
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

  ngOnInit(): void {
    // Set default page size and fetch initial data
    this.pageRequest.pageSize = 10;
    this.pageRequest.pageNo = this.getPageState();
    this.getAllAddresses();
  }

  /**
   * Retrieves all addresses based on the provided page request parameters.
   * @param pageRequest - The pagination parameters for fetching a specific page of addresses.
   */
  public getAllAddresses(pageRequest: PageRequest = this.pageRequest) {
    this.pageRequest = pageRequest;
    this.addressService.getAllAddresses(this.pageRequest, this.sortIsActive).subscribe({
      next: (data: any) => {
        this.addressList = data.address.content;
        this.pageManager.setPageData(data.address);
        this.setPageState(this.pageRequest.pageNo)
      },
      error: (err) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    });
  }

  /**
   * Deletes an address based on the stored deleteId.
   */
  deleteAddress() {
    if (this.deleteId && this.deleteId !== 0) {
      this.addressService.deleteAddress(this.deleteId).subscribe({
        next: (data: any) => {
          AppUtil.openToast('success', data.message, 'Success');
        },
        error: (err: any) => {
          AppUtil.modalDismiss('close-delete-address');
          AppUtil.openToast('error', err.error.message, 'Error');
          this.deleteId = 0;
        },
        complete: () => {
          AppUtil.modalDismiss('close-delete-address');
          this.getAllAddresses();
          this.deleteId = 0;
        }
      });
    }
  }

  /**
   * Updates an address using the stored editAddress payload.
   */
  updateAddress() {
    FormsValidator.formSubmittion(this.editForm);
    if (this.editForm.invalid) {
      return;
    }
    this.toggleLoader();
    this.addressService.updateAddress(this.editAddress).subscribe({
      next: (data: any) => {
        this.toggleLoader();
        AppUtil.openToast('success', data.message, 'Success');
      },
      error: (err: any) => {
        AppUtil.modalDismiss('close-update-modal');
        AppUtil.openToast('error', err.error.message, 'Error');
        this.toggleLoader();
      },
      complete: () => {
        AppUtil.modalDismiss('close-update-modal');
        this.getAllAddresses();

      }
    });
  }

  setEditData(address: Address) {
    this.editForm.reset();
    setTimeout(() => {
      this.editAddress = { ...address };
    }, 100);
  }

  /**
   * Navigates to the specified path using Angular Router.
   * @param path - The path to navigate to.
   */
  navigate(path: string) {
    this.router.navigate(['Admin/' + path]);
  }

  // Loading indicator control
  loading = false;
  toggleLoader(): void {
    this.loading = !this.loading;
  }

  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }


  public sortByStatus(status: SortStatus) {
    switch (status) {
      case SortStatus.ALL:
        this.sortIsActive = SortStatus.ACTIVE;
        break;

      case SortStatus.ACTIVE:
        this.sortIsActive = SortStatus.IN_ACTIVE;
        break;

      case SortStatus.IN_ACTIVE:
        this.sortIsActive = SortStatus.ALL;
    }

    this.getAllAddresses();
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
        }
      });
    }
  }

  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
  }
}
