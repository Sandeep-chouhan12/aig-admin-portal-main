import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { VerificationOfficerService } from '../../services/verification-officer.service';
import { VerificationOfficer } from '../../models/verification-officer';
import { Status } from 'src/app/shared/models/status';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { AddressVerificationReqByOfficer } from '../../models/address-verification-req-by-officer';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { AddressesService } from 'src/app/users/services/addresses.service';
import { AddressDetails } from 'src/app/users/models/address-details';
import { MapUtils } from 'src/app/shared/utils/map-utils';
import { AddressVerificationDetails } from 'src/app/users/models/address-verification-details';
declare var bootstrap: any;

@Component({
  selector: 'app-verification-officer-details',
  templateUrl: './verification-officer-details.component.html',
  styleUrls: ['./verification-officer-details.component.scss'],
  providers: [MapUtils]
})
export class VerificationOfficerDetailsComponent
  implements OnInit, AfterViewInit {


  defaultImage = AppUtil.DEFAULT_IMAGE;

  defaultPropertyImage = AppUtil.DEFAULT_PROPERTY_IMAGE;

  addressDetails: AddressDetails = new AddressDetails();
  verificationOfficer = new VerificationOfficer();
  status = Status;
  pageRequest = new PageRequest();
  pageManager = new PaginationManager();
  officerId = 0;
  addressVerificationReq: AddressVerificationReqByOfficer[] = [];
  appUtil = AppUtil;
  /** Selected status for filtering requests */
  public selectedStatus!: Status;
  componetsRoute = ComponentsRoutes;
  public location = {
    lat: 22.719568,
    long: 75.857727,
    address: '',
    aigCode: '',
  };

  businessFileTypeMap: any

  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private officerService: VerificationOfficerService,
    private router: Router,
    private addressService: AddressesService,
    private mapUtils: MapUtils,
  ) {

    this.addressDetails = new AddressDetails();
    this.addressDetails.addressVerificationDetails = new AddressVerificationDetails();

    this.businessFileTypeMap = {
      CAC_CERTIFICATE: 'CAC Certificate',
      BNI_CARD: 'BNI Card',
      CAC_MEMORANDUM: 'CAC Memorandum'
    };
  }

  ngAfterViewInit(): void {
    // Open the dropdown initially
    this.openDropdown();
  }

  ngOnInit(): void {
    this.hideSideNav(true);
    this.activatedRoute.params.subscribe((param: any) => {
      this.officerId = param['officerId'];
      this.getVerificationOfficerById(this.officerId);
      this.getAddressVerificationRequestsByAssignOfficer(this.status.All);
    });
  }

  ngOnDestroy(): void {
    this.hideSideNav(false);
  }

  hideSideNav(isOn: boolean) {
    this.sharedService.hideSideNav.next(isOn);
  }

  public getVerificationOfficerById(officerId: number) {
    this.officerService.getVerificationOfficerById(officerId).subscribe({
      next: (res: any) => {
        this.verificationOfficer = res.officers;
      },
      error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
  }

  public getAddressVerificationRequestsByAssignOfficer(status: Status) {
    this.selectedStatus = status
    this.officerService
      .getAddressVerificationRequestsByAssignOfficer(
        this.pageRequest,
        status,
        this.officerId
      )
      .subscribe({
        next: (res: any) => {
          this.addressVerificationReq = (res.data.content || []).map((data: any) => ({
            ...data,
            expanded: false // for toggling description view
          }));
          this.pageManager.setPageData(res.data);
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
  }

  /**
   * Manages pagination for next and previous pages.
   * @param isNext - Indicates whether to go to the next page.
   * @param status - The status of the address verification requests.
   */
  manageNext(isNext: boolean): void {
    if (isNext) this.pageRequest.pageNo++;
    else this.pageRequest.pageNo--;

    if (
      this.pageRequest.pageNo >= 0 &&
      this.pageRequest.pageNo < this.pageManager.totalPages
    )
      this.getAddressVerificationRequestsByAssignOfficer(this.selectedStatus);
  }

  /**
   * Sets the current page for pagination.
   * @param page - The page number to set.
   * @param status - The status of the address verification requests.
   */
  setPage(page: any): void {
    if (page - 1 !== this.pageRequest.pageNo) {
      this.pageRequest.pageNo = page - 1;
      this.getAddressVerificationRequestsByAssignOfficer(this.selectedStatus);
    }
  }

  public navigateToComponent(addressId: number) {
    this.router.navigate([ComponentsRoutes.ADMIN_HOME + '/' + ComponentsRoutes.ADDRESS_DETAILS_BASE + '/' + addressId]);
  }

  /**
   * Opens the dropdown for filtering options.
   */
  public openDropdown(): void {
    // Filter options selector
    const optionMenu: any = document.querySelector('.select-menu');
    const selectBtn: any = optionMenu?.querySelector('.select-btn');
    const options: any = optionMenu?.querySelectorAll('.option');
    const sBtn_text = optionMenu?.querySelector('.sBtn-text');

    selectBtn?.addEventListener('click', () =>
      optionMenu?.classList.toggle('active')
    );

    options?.forEach((option: any) => {
      option.addEventListener('click', () => {
        let selectedOption = option?.querySelector('.option-text').innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove('active');
      });
    });
  }

  public getAddressverificationDetails(addressId: any) {
    if (addressId && addressId !== 0) {
      this.addressService.getAddressverificationDetails(addressId).subscribe({
        next: (data: any) => {
          this.addressDetails = data.address;
          this.location.long = this.addressDetails.longitude;
          this.location.lat = this.addressDetails.latitude;
          this.location.address = this.addressDetails.address;
          this.location.aigCode = this.addressDetails.aigcode;


          if (document.getElementById('map'))
            setTimeout(() => {
              let element = document.getElementById('map');
              this.mapUtils.initMap(element, this.location);

            }, 10);
          this.openModal();
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        }
      });
    }

  }

  openModal() {
    const modal = new bootstrap.Modal(document.getElementById('verificationModal'));
    modal.show();
  }

  id: any
  setId(id: any) {
    if (id == this.id) {
      this.id = 0;
    } else {
      this.id = id;
    }
  }

}
