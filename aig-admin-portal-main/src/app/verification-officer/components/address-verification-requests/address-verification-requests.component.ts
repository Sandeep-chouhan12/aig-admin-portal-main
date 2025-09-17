import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PageRequest } from 'src/app/shared/models/page-request';
import { Status } from 'src/app/shared/models/status';
import { VerificationOfficerService } from '../../services/verification-officer.service';
import { AddressVerification } from '../../models/address-verification';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { Router } from '@angular/router';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AddressDetails } from 'src/app/users/models/address-details';
import { MapUtils } from 'src/app/shared/utils/map-utils';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { AddressesService } from 'src/app/users/services/addresses.service';
import { AddressVerificationDetails } from 'src/app/users/models/address-verification-details';
import { PageStateService } from 'src/app/shared/services/page-state.service';
declare var bootstrap: any; // Add at the top of your component

@Component({
  selector: 'app-address-verification-requests',
  templateUrl: './address-verification-requests.component.html',
  styleUrls: ['./address-verification-requests.component.scss'],
  providers: [MapUtils],
})
export class AddressVerificationRequestsComponent
  implements OnInit, AfterViewInit {
  addressDetails!: AddressDetails;
  bootstrap: any;
  sortIsActive: Status = Status.All;

  sortStatus = Status;

  /** The page request object for pagination */
  public pageRequest = new PageRequest();


  defaultImage = AppUtil.DEFAULT_IMAGE;

  defaultPropertyImage = AppUtil.DEFAULT_PROPERTY_IMAGE;

  /** Enumeration for status types */
  public status = Status;

  /** List of address verification requests */
  public addressVerificationRequests: AddressVerification[] = [];

  /** Pagination manager for handling page data */
  public pageManager = new PaginationManager();

  /** Selected status for filtering requests */
  public selectedStatus!: Status;

  componentRoutes = ComponentsRoutes;

  public location = {
    lat: 22.719568,
    long: 75.857727,
    address: '',
    aigCode: '',
  };

  businessFileTypeMap: any


  /**
   * Constructor to inject the VerificationOfficerService and Renderer2.
   * @param officerService - The service for managing verification officers.
   * @param renderer - The Angular Renderer2 for DOM manipulation.
   */
  constructor(
    private officerService: VerificationOfficerService,
    private renderer: Renderer2,
    private router: Router,
    public loaderService: LoaderService,
    private mapUtils: MapUtils,
    private addressService: AddressesService,
    private pageState: PageStateService,
  ) {

    this.addressDetails = new AddressDetails();
    this.addressDetails.addressVerificationDetails = new AddressVerificationDetails();
    // this.addressDetails.user = new User();
    // this.addressDetails.addressVerificationDetails.summary = new AddressVerificationSummary()

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

  /** Lifecycle hook - OnInit */
  ngOnInit(): void {
    // Initial loading of address verification requests with 'All' status
    this.pageRequest.pageNo = this.getPageState();

    this.getAddressVerificationRequests(Status.All);
  }

  /**
   * Fetches address verification requests based on the specified status and page request.
   * @param status - The status of the address verification requests.
   */
  public getAddressVerificationRequests(status: Status = Status.All): void {
    this.selectedStatus = status;
    this.officerService
      .getAddressVerificationRequests(
        this.pageRequest,
        status,
        this.sortIsActive
      )
      .subscribe({
        next: (res: any) => {
          this.addressVerificationRequests = (res.data.content || []).map((plan: any) => ({
            ...plan,
            expanded: false // for toggling description view
          }));
          this.pageManager.setPageData(res.data);
          this.setPageState(this.pageRequest.pageNo)
        },
        error: (err: any) => {
          // Handle error if needed
        },
      });
  }

  id: any
  setId(id: any) {
    if (id == this.id) {
      this.id = 0;
    } else {
      this.id = id;
    }
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
      this.getAddressVerificationRequests(this.selectedStatus);
  }

  /**
   * Sets the current page for pagination.
   * @param page - The page number to set.
   * @param status - The status of the address verification requests.
   */
  setPage(page: any): void {
    if (page - 1 !== this.pageRequest.pageNo) {
      this.pageRequest.pageNo = page - 1;
      this.getAddressVerificationRequests(this.selectedStatus);
    }
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

  /**
   * Navigates to the specified path using Angular Router.
   * @param path - The path to navigate to.
   */
  navigate(path: string) {
    this.router.navigate(['Admin/' + path]);
  }

  public sortByStatus(status: Status) {
    switch (status) {
      case Status.All:
        this.sortIsActive = Status.Pending;
        break;

      case Status.Pending:
        this.sortIsActive = Status.Rejected;
        break;

      case Status.Rejected:
        this.sortIsActive = Status.Verified;
        break;
      case Status.Verified:
        this.sortIsActive = Status.All;
    }

    this.getAddressVerificationRequests(this.selectedStatus);
  }

  public getAddressverificationDetails(addressVerificationId: any) {

    if (addressVerificationId && addressVerificationId !== 0) {
      this.addressService.getAddressverificationDetails(addressVerificationId).subscribe({
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
              this.openModal()
            }, 100);

          // this.modalService.open(this.verificationModal);
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
    }
  }

  //----------- OPEN MODELS  -------------

  openModal() {
    const modal = new bootstrap.Modal(document.getElementById('verificationModal'));
    modal.show();
  }

  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
  }
}
