import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UsersService } from 'src/app/users/services/users.service';
import { PrivateUserDetailsResponse } from 'src/app/organization/payloads/privateOrganizationDetailResponse';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PhysicalAddressVerification } from 'src/app/organization/models/physical-address-verification';

@Component({
  selector: 'app-private-organization-profile',
  templateUrl: './private-organization-profile.component.html',
  styleUrls: ['./private-organization-profile.component.scss']
})
export class PrivateOrganizationProfileComponent {
@Input() organizationId: string = '';
privateOrganizationDetailResponse:PrivateUserDetailsResponse=new PrivateUserDetailsResponse();
physicalAddressVerification  = PhysicalAddressVerification;
 constructor(private sharedService: SharedService, private route: ActivatedRoute,private userService: UsersService, 
 public loaderService: LoaderService) {}
  ngOnInit(): void {
  
    if (this.organizationId) {
      this.getPrivateOrganzationDetails();
    }
  }

  getPrivateOrganzationDetails() {
   
    this.userService.getPrivateUserDetails(this.organizationId).subscribe((data: any) => {
      this.privateOrganizationDetailResponse = data.response;
    });
  }
}
