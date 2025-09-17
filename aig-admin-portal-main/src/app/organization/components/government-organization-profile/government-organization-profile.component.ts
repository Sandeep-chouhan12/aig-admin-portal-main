import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationResponse } from 'src/app/organization/models/OrganizationResponse';
import { GovernmentOrganizationDetailResponse } from 'src/app/organization/payloads/GovernmentOrganizationDetailResponse';
import { UpdateUserStatusRequest } from 'src/app/organization/payloads/UpdateUserStatusRequest';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-government-organization-profile',
  templateUrl: './government-organization-profile.component.html',
  styleUrls: ['./government-organization-profile.component.scss']
})
export class GovernmentOrganizationProfileComponent {

  userId: string = ''
  userType: string = 'GOVERNMENT'
  user: OrganizationResponse = new OrganizationResponse()
  updateUserStatusRequest: UpdateUserStatusRequest = new UpdateUserStatusRequest()
  governmentOrganizationDetailResponse: GovernmentOrganizationDetailResponse = new GovernmentOrganizationDetailResponse();
 OfficialIdType = {
  NATIONAL_ID: 'NATIONAL_ID',
  STAFF_ID: 'STAFF_ID',
  PASSPORT_BIO_PAGE: 'PASSPORT_BIO_PAGE'
} as const;
  constructor(private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private userService: UsersService, private fb: FormBuilder,) {

  }


  @Input() organizationId: string = '';

  ngOnInit(): void {
    if (this.organizationId) {
      this.getGovernmentOrganzationDetails();
    }
  }

  getGovernmentOrganzationDetails() {

    this.userService.getGovernmentOrganzationDetails(this.organizationId).subscribe((data: any) => {
      this.governmentOrganizationDetailResponse = data.response;
    });
  }

}
