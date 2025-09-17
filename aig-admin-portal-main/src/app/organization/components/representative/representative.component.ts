import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrganizationResponse } from 'src/app/organization/models/OrganizationResponse';
import { UserResponse } from 'src/app/organization/models/user-response';
import { DeleteUserByTypeRequest } from 'src/app/organization/payloads/DeleteUserByTypeRequest';
import { UpdateUserStatusRequest } from 'src/app/organization/payloads/UpdateUserStatusRequest';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PermissionTitle } from 'src/app/shared/models/permission-title';
import { PermissionType } from 'src/app/shared/models/permission-type';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Constants } from 'src/app/shared/utils/constants';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.scss']
})
export class RepresentativeComponent implements OnInit {

  componentRoute = ComponentsRoutes
  usersResponse: OrganizationResponse[] = [];
  pageRequest: PageRequest = new PageRequest();
  userType: string = 'GOVERNMENT';
  userId: string = '';
  appUtil = AppUtil
  updateUserStatusRequest: UpdateUserStatusRequest = new UpdateUserStatusRequest();
  deleteUserByTypeRequest: DeleteUserByTypeRequest = new DeleteUserByTypeRequest();
  paginationManager: PaginationManager = new PaginationManager();
  appUtils = AppUtil
 constant = Constants

  permissionTitle = PermissionTitle;
  permissionType = PermissionType;
  ngOnInit(): void {
    this.getAllUsersByType();
    this.sharedService.hideSideNav.next(false);
  }

  constructor(private userService: UsersService, public loaderService: LoaderService, private sharedService: SharedService, private cdr: ChangeDetectorRef) { }


 

  getAllUsersByType() {
    this.userService.getAllUsersByType(this.pageRequest, this.userType).subscribe((data: any) => {
      this.usersResponse = data.users.content;
      this.paginationManager.setPageData(data.users);
      this.pageRequest.pageNo = data.users.pageable.pageNumber;
    })
  }

  onTabChange(userType: string) {
    this.userType = userType;
    this.getAllUsersByType();
  }

  changeOrganizationStatus(item: any) {
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

  deleteOrganization() {
    // this.deleteUserByTypeRequest.organizationId = item.organizationId;
    // this.deleteUserByTypeRequest.userType = item.userType;
    this.userService.deleteOrganizationByType(this.deleteUserByTypeRequest).subscribe((response: any) => {
      AppUtil.openToast('success', response.message, 'Success');
      this.getAllUsersByType();
      this.closeDeleteModal();
    }, (error: any) => {
      // toast.error(error.error.message);
    })
  }

  setUserId(item: any) {
    this.deleteUserByTypeRequest.organizationId = item.organizationId;
    this.deleteUserByTypeRequest.userType = item.userType
  }

  closeDeleteModal() {
    let ele = document.getElementById('closeModalDelete') as HTMLElement;
    ele && ele.click();
  }
}
