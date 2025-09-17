import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppUtil } from 'src/app/shared/utils/app-util';

@Component({
  selector: 'app-private-organization-details',
  templateUrl: './private-organization-details.component.html',
  styleUrls: ['./private-organization-details.component.scss']
})
export class PrivateOrganizationDetailsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  appUtil = AppUtil
  constructor(private sharedService: SharedService) {
    sharedService.hideSideNav.next(true);
    sharedService.setTitle('Organization Details')
  }
}
