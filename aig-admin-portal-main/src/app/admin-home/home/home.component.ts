import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PermissionManagementService } from 'src/app/shared/services/permission-management.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() hideSideNav = false;
  title = '';

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private changeDetect: ChangeDetectorRef,
    private permissionService: PermissionManagementService,
    private location: Location, private router: Router,
    public loader: LoaderService
  ) {
    this.permissionService.loadPermissions();
  }

  ngOnInit(): void {
    this.isHideSideNav();
    if (this.hideSideNav) {
      setTimeout(() => {
        this.getPath();
      }, 200);
    }
  }

  public getTitleName(event: any) {
    this.title = event;
  }

  isLoggedIn = false;

  public setLogged(event: any) {
    this.isLoggedIn = event;
  }

  isHideSideNav() {
    this.sharedService.hideSideNavEvent.subscribe((r: any) => {
      this.hideSideNav = r;
      this.changeDetect.detectChanges();
    });
  }

  public getPath(): void {
    const fullPath = this.location.path();

    // Remove '/Admin/' prefix (7 characters) if present
    const pathWithoutAdmin = fullPath.startsWith('/Admin/')
      ? fullPath.substring(7)
      : fullPath;

    // Get the first segment after Admin
    const segments = pathWithoutAdmin.split('/').filter(segment => segment.length > 0);

    // Set checkPath with proper formatting
    this.title = segments.length > 0
      ? segments[0].split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : '';



    // Trigger change detection
    this.changeDetect.detectChanges();
  }
}
