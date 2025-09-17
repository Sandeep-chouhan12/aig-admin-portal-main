import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Constants } from '../../utils/constants';
import { ComponentsRoutes } from '../../utils/components-routes';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppUtil } from '../../utils/app-util';
import { PageStateService } from '../../services/page-state.service';
import { PermissionManagementService } from '../../services/permission-management.service';
import { PermissionType } from '../../models/permission-type';
import { PermissionTitle } from '../../models/permission-title';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [Constants, ComponentsRoutes]
})
export class SideBarComponent implements OnInit, AfterViewInit {

  @Output() setTitleName = new EventEmitter();

  checkPath: string = '';

  activeClass = '';

  constants = Constants;
  componentRoutes = ComponentsRoutes;
  permissionType = PermissionType;
  permissionTitle = PermissionTitle




  constructor(private cdr: ChangeDetectorRef,
    private location: Location,
    private router: Router,
    private pageState: PageStateService,
    private permissionService: PermissionManagementService,
    private sharedService: SharedService) {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.manageSideBar();
      this.router.events.subscribe((event: any) => {
        this.activeClassCss();
        this.getPath();
      });
    }, 200);
  }

  ngOnInit(): void {

  }

  public getTitleName(titleName: string) {
    this.setTitleName.emit(titleName);
  }

  activeClassCss() {
    const path = this.location.path();
    this.activeClass = path.toString().substring(7);
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
    this.checkPath = segments.length > 0
      ? segments[0].split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : 'Dashboard';

    // Update title using shared service
    this.sharedService.setTitle(this.checkPath);

    // Trigger change detection
    this.cdr.detectChanges();
  }

  public navigateToDashboard() {
    AppUtil.modalDismiss('dashbaord')
  }


  notClick = ["dashbaord", "verification-portal"]

  public manageSideBar() {
    const path = this.location.path();
    let key = path.toString().substring(7).split("/")[0];
    if (!this.notClick.includes(key))
      document.getElementById(key)?.click();

    this.cdr.detectChanges();
  }

  public clearPage() {
    this.pageState.clearAll();
    document.getElementById('sidebar-close-icon')?.click()
  }


  loadPermission() {
    this.permissionService.loadPermissions().subscribe();
  }


  @HostListener('shown.bs.collapse', ['$event'])
  onAccordionOpen(event: any) {
    this.loadPermission();
  }

}
