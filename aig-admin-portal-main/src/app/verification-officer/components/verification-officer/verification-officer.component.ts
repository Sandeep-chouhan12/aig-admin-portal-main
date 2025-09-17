import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VerificationOfficer } from '../../models/verification-officer';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { VerificationOfficerService } from '../../services/verification-officer.service';
import { UserStatusChangeRequest } from 'src/app/users/payloads/user-status-change-request';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Router } from '@angular/router';
import { FormsValidator } from 'src/app/shared/utils/forms-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../models/state';
import { LGAInfo } from '../../models/lgainfo';
import { Constants } from 'src/app/shared/utils/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SortStatus } from 'src/app/users/models/sort-status';
import { PageStateService } from 'src/app/shared/services/page-state.service';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
declare var google: any;
declare var $: any;
/**
 * Component for managing and displaying verification officers.
 */
@Component({
  selector: 'app-verification-officer',
  templateUrl: './verification-officer.component.html',
  styleUrls: ['./verification-officer.component.scss'],
})
export class VerificationOfficerComponent implements OnInit, AfterViewInit {
  /** List of verification officers */
  verificationOfficers: VerificationOfficer[] = [];

  appUtil = AppUtil;

  sortIsActive: SortStatus = SortStatus.ALL;

  sortStatus = SortStatus;

  /** Page request object for pagination */
  pageRequest = new PageRequest();

  /** Pagination manager for handling page data */
  pageManager = new PaginationManager();

  /** Request payload for updating officer status */
  officerStatusUpdate = new UserStatusChangeRequest();

  /** ID of the officer to be deleted */
  deleteId = 0;

  loading: boolean = false;

  addForm: FormGroup;

  verificationOfficer: VerificationOfficer = new VerificationOfficer();

  imagePreview: any = AppUtil.DEFAULT_IMAGE;

  states: State[] = []; //  used to hold state list of nigeria
  stateList: State[] = []; //  used to filter the search state

  stateSelected: any; // selected state
  lgaSearch: string = '';
  lgaInfo: LGAInfo[] = []; // used to hold the lgainfo list of state
  lgaSearchingList: LGAInfo[] = []; // used to filter the search lga info
  search: any = ''; //  search field of state
  // This variable is likely used to define or manage routes within the component
  componentRoutes = ComponentsRoutes;
  constants = Constants;

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;

  /**
   * Constructor to inject the VerificationOfficerService.
   * @param officerService - The service for managing verification officers.
   */
  constructor(
    private officerService: VerificationOfficerService,
    private router: Router,
    private builder: FormBuilder,
    public loaderService: LoaderService,
    private pageState: PageStateService
  ) {
    this.addForm = this.builder.group({
      firstName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      lastName: ['', [Validators.required], [FormsValidator.nameValidator()]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required], [FormsValidator.emailValidator()]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\+234|234|0)?(7|8|9)(0|1)\\d{8}$')]],
      address: ['', Validators.required],
      lgaName: ['', Validators.required],
      state: ['', Validators.required],
      profilePicture: [null],
    });
  }

  ngAfterViewInit(): void {
    this.selectBoxJs();
  }

  /** Lifecycle hook - OnInit */
  ngOnInit(): void {
    // Initial loading of verification officers
    this.pageRequest.pageNo = this.getPageState();
    this.getAllVerificationOfficers();

    this.getStatesOfNigeria();
  }

  /**
   * Fetches all verification officers based on the current page request.
   */
  public getAllVerificationOfficers(): void {
    this.officerService.getAllVerificationOfficers(this.pageRequest, this.sortIsActive).subscribe({
      next: (res: any) => {
        this.verificationOfficers = (res.officers.content || []).map((data: any) => ({
          ...data,
          expanded: false // for toggling description view
        }));
        this.pageManager.setPageData(res.officers);
        this.setPageState(this.pageRequest.pageNo)
      },
      error: (err: any) => {
        // Handle error if needed
      },
    });
  }

  /**
   * Manages pagination for next and previous pages.
   * @param isNext - Indicates whether to go to the next page.
   */
  public manageNext(isNext: boolean): void {
    if (isNext) this.pageRequest.pageNo++;
    else this.pageRequest.pageNo--;

    if (
      this.pageRequest.pageNo >= 0 &&
      this.pageRequest.pageNo < this.pageManager.totalPages
    )
      this.getAllVerificationOfficers();
  }

  /**
   * Sets the current page for pagination.
   * @param page - The page number to set.
   */
  public setPage(page: any): void {
    if (page - 1 !== this.pageRequest.pageNo) {
      this.pageRequest.pageNo = page - 1;
      this.getAllVerificationOfficers();
    }
  }

  /**
   * Updates the status of a verification officer.
   * @param isActive - The current status of the officer.
   * @param officerId - The ID of the verification officer.
   */
  public updateOfficerStatus(isActive: boolean, officerId: number): void {
    this.officerStatusUpdate.isActive = !isActive;
    this.officerStatusUpdate.userId = officerId;

    this.officerService
      .officerStatusUpdate(this.officerStatusUpdate)
      .subscribe({
        next: (res: any) => {
          AppUtil.openToast('success', res.message, 'Success');
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
  }

  /**
   * Deletes a verification officer by their ID.
   */
  public deleteByOfficerId(): void {
    this.officerService.deleteByOfficerId(this.deleteId).subscribe({
      next: (res: any) => {
        AppUtil.openToast('success', res.message, 'Success');
        AppUtil.modalDismiss('close-verification-officer-modal');
        this.getAllVerificationOfficers();
      },
      error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
  }

  public navigateToComponent(userId: number) {
    this.router.navigate([
      ComponentsRoutes.ADMIN_HOME +
      '/' +
      ComponentsRoutes.VERI_OFFI_DETAILS_BASE +
      '/' +
      userId,
    ]);
  }

  public checkFieldValid(fieldName: any, form: any) {
    return FormsValidator.formValidCheck(fieldName, form);
  }

  public changePasswordIcon(refEle: any) {
    AppUtil.changePassowrdIcon(refEle);
  }

  public addVerificationOfficer() {
    this.formSubmittion(this.addForm);

    if (this.addForm.valid && this.checkValidation()) {
      this.officerService.addOfficer(this.verificationOfficer).subscribe({
        next: (data: any) => {
          this.getAllVerificationOfficers();
          AppUtil.modalDismiss('cancel-add');
          AppUtil.openToast('success', data.message, 'Success');
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
    }
  }

  // public setImage(event: any) {
  //   this.verificationOfficer.profilePicture = event.target.files[0];
  //   this.imagePreview = URL.createObjectURL(event.target.files[0]);
  // }
  errorMessage: any;
  public setImage(event: any) {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2 MB
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Only JPG and PNG images are allowed';
      this.addForm.get('profilePicture')?.setErrors({ invalidType: true });
      this.imagePreview = null;
      event.target.value = ''; // reset file input
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      this.errorMessage = 'File size too large. Maximum allowed size is 2 MB.';
      this.addForm.get('profilePicture')?.setErrors({ maxSizeExceeded: true });
      this.imagePreview = null;
      event.target.value = ''; // reset file input
      return;
    }

    // If valid
    this.errorMessage = '';
    this.verificationOfficer.profilePicture = file;
    this.imagePreview = URL.createObjectURL(file);
    this.addForm.patchValue({ profilePicture: file });
    this.addForm.get('profilePicture')?.setErrors(null); // clear errors
  }
  public formSubmittion(form: any) {
    FormsValidator.formSubmittion(form);
  }

  // check validation for select state and lga name
  checkValidation(): Boolean {
    if (
      this.verificationOfficer.latitude === undefined ||
      this.verificationOfficer.latitude === '' ||
      this.verificationOfficer.longitude === '' ||
      this.verificationOfficer.longitude === undefined
    ) {
      this.verificationOfficer.address = '';
      return false;
    }

    let isPresent = this.stateList.filter((f) => {
      return f.name === this.verificationOfficer.state.name;
    });
    if (isPresent.length == 0) return false;

    let islgaName = this.lgaInfo.filter((f) => {
      return f.lgaName === this.verificationOfficer.lgaName;
    });
    if (islgaName.length == 0) return false;
    return true;
  }

  public addressAutoComplete(id: any) {
    const options = {
      fields: ['formatted_address', 'geometry', 'name', 'place_id'],
      strictBounds: false,
    };
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(
      inputElement,
      options
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      this.verificationOfficer.placeId = place.place_id;
      this.verificationOfficer.latitude = place.geometry.location.lat();
      this.verificationOfficer.longitude = place.geometry.location.lng();
      this.verificationOfficer.address = place.formatted_address;
    });
  }

  // get states of nigeria
  public getStatesOfNigeria() {
    this.officerService.getStatesOfNigeria().subscribe({
      next: (data: any) => {
        this.states = data.states;
        this.stateList = data.states;
      },
      error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      },
    });
    this.lgaSearch = '';
    this.verificationOfficer.lgaName = '';
  }

  selectBoxJs() {
    const wrapper = document.querySelector('.wrapper') as HTMLDivElement,
      selectBtn = wrapper.querySelector('.select-btn') as HTMLDivElement,
      searchInp = wrapper.querySelector('input') as HTMLInputElement,
      options = wrapper.querySelector('.options') as HTMLUListElement;
    const wrapper2 = document.getElementById('wrapper2') as HTMLDivElement,
      selectBtn2 = wrapper2.querySelector('.select-btn-2') as HTMLDivElement,
      searchInp2 = wrapper.querySelector('input') as HTMLInputElement,
      options2 = wrapper.querySelector('.options') as HTMLUListElement;

    selectBtn.addEventListener('click', () =>
      wrapper.classList.toggle('active')
    ); // add form state

    selectBtn2.addEventListener('click', () =>
      wrapper2.classList.toggle('active')
    ); // add form lga name
  }

  modelDissmiss(id: any) {
    AppUtil.modalDismiss(id);
  }

  toggleLoader(): void {
    this.loading = !this.loading;
  }

  // set lga property
  public setLgaProperty(lga: any) {
    this.verificationOfficer.lgaName = lga.lgaName;
    this.lgaSearch = lga.lgaName;
  }

  searching() {
    if (this.search !== '') {
      this.stateList = this.states.filter((s) => {
        return s.name
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase());
      });
      return;
    } else {
      this.verificationOfficer.state.name = this.search;
      // if state is not selected then empty lga list
      this.lgaSearch = '';
      this.lgaInfo = [];
      this.lgaSearchingList = [];
      this.verificationOfficer.lgaName = '';
    }
    this.stateList = this.states;
  }

  searchingLgaName() {
    if (this.lgaSearch !== '') {
      this.lgaSearchingList = this.lgaInfo.filter((s) => {
        return s.lgaName
          .toLocaleLowerCase()
          .includes(this.lgaSearch.toLocaleLowerCase());
      });
      return;
    } else this.verificationOfficer.lgaName = this.lgaSearch;
    this.lgaSearchingList = this.lgaInfo;
  }

  // get lga info of state by state uuid
  public getLgaInfoOfState(state: any, edit = false) {
    this.setStateProperty(state, edit);

    if (this.stateSelected)
      this.officerService.getLGAInfoByState(this.stateSelected).subscribe({
        next: (data: any) => {
          this.lgaInfo = data.lgaInfo;
          this.lgaSearchingList = data.lgaInfo;
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
  }

  // property set after click on state
  public setStateProperty(state: any, edit = false) {
    this.stateSelected = state.uuid;
    if (!edit) this.verificationOfficer.lgaName = '';
    this.verificationOfficer.stateId = state.id;
    this.verificationOfficer.state.name = state.name;
    this.search = state.name;
  }

  clearForm() {
    this.verificationOfficer = new VerificationOfficer();
    this.addForm.reset();
    this.lgaSearchingList = [];
    this.imagePreview = null;
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

    this.getAllVerificationOfficers();
  }


  public setPageState(pageNo: any) {
    this.pageState.pageNo = pageNo;
  }
  public getPageState() {
    return this.pageState.pageNo;
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
