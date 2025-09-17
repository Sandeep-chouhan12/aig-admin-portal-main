import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit {
  ngOnInit(): void {
  
  }    
  constructor(private sharedService: SharedService) {
    sharedService.hideSideNav.next(false);
  }

}
