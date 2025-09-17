import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { RoleServiceService } from '../../Service/role-service.service';
import { Permission } from '../../model/permission';
import { PermissionTitle } from '../../model/permission-title';
import { PaginationManager } from 'src/app/shared/models/pagination-manager';
import { PageRequest } from 'src/app/shared/models/page-request';

@Component({
  selector: 'app-role-privileges',
  templateUrl: './role-privileges.component.html',
  styleUrls: ['./role-privileges.component.scss']
})
export class RolePrivilegesComponent implements OnInit, AfterViewInit {

  constructor(private sharedService: SharedService, private route: ActivatedRoute,
    private roleService: RoleServiceService) {
    sharedService.hideSideNav.next(true);
    sharedService.setTitle('Set Privileges')
  }


  roleId!: number;
  permissions: Permission[] = [];
  paginationManager: PaginationManager = new PaginationManager();
  page: PageRequest = { pageNo: 0, pageSize: 10 }

  ngOnInit(): void {
    this.roleId = +this.route.snapshot.paramMap.get('roleId')!;
    this.loadPermissions();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const selectBoxes = document.querySelectorAll('.custom-select');
      selectBoxes.forEach(selectBox => {
        const display = selectBox.querySelector('.select-display') as HTMLElement;
        const options = selectBox.querySelectorAll('.dropdown-options-list');

        // Toggle dropdown on display click
        display?.addEventListener('click', (e) => {
          e.stopPropagation();
          selectBox.classList.toggle('active');
        });

        // Select option and close dropdown
        options.forEach(option => {
          option.addEventListener('click', () => {
            const selectedText = option.textContent?.trim() || '';
            display.querySelector('span')!.textContent = selectedText;
            selectBox.classList.remove('active');
          });
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
          if (!selectBox.contains(event.target as Node)) {
            selectBox.classList.remove('active');
          }
        });
      });
    }, 500);
  }


  loadPermissions(): void {
    this.roleService.getPermissionsByRoleId(this.roleId, this.page).subscribe((res: any) => {
      this.permissions = res.permissions.content;
      this.paginationManager.setPageData(res.permissions);
      this.page.pageNo = res.permissions.pageable.pageNumber;
    });
  }


  updatePermission(permission: any): void {
    const payload = {
      canRead: permission.canRead,
      canCreate: permission.canCreate,
      canDelete: permission.canDelete,
      canUpdate: permission.canUpdate
    };

    this.roleService.updateSinglePermission(permission.id, payload).subscribe({
      next: (data) => {
        AppUtil.openToast('success', data.message, 'Success');
        this.hasChanges = false;
      },
      error: (err) => {
        AppUtil.openToast('error', err.error.message, 'Error')
        this.loadPermissions();
        this.hasChanges = false;
      }
    });
  }


  getAllPermissionTitles(): string[] {
    return Object.values(PermissionTitle);
  }

  allSelected = false;
  hasChanges: boolean = false

  toggleAll() {
    this.permissions.forEach(p => p.selected = this.allSelected);
    this.hasChanges = true;
  }

  onSelectionChange() {
    const allChecked = this.permissions.every(p => p.selected);
    this.allSelected = allChecked;
    this.hasChanges = true;
  }

  getSelectedPermissions() {
    return this.permissions.filter(p => p.selected);
  }


  dropdownOpen = false;

  filters = {
    all: false,
    canRead: false,
    canCreate: false,
    canUpdate: false,
    canDelete: false
  };

  filteredPermissions: any[] = [];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  resetFilters() {
    this.filters = { all: false, canRead: false, canCreate: false, canUpdate: false, canDelete: false };
    this.filteredPermissions = this.permissions.filter(p => p.selected);
    this.dropdownOpen = false;
  }


  onFilterChange(changedKey?: string) {
    if (changedKey === 'all' && this.filters.all) {
      this.filters.canRead = true;
      this.filters.canCreate = true;
      this.filters.canUpdate = true;
      this.filters.canDelete = true;
    } else if (changedKey === 'all' && !this.filters.all) {
      this.filters.canRead = false;
      this.filters.canCreate = false;
      this.filters.canUpdate = false;
      this.filters.canDelete = false;
    }
  }

  applyBulkPermissionUpdate() {
    // Step 1: Get all selected permissions
    const selectedPermissions = this.permissions.filter(p => p.selected);
    
    if (selectedPermissions.length === 0) {
      AppUtil.openToast('warning', 'Please select at least one permission', 'Warning')
      return;
    }

    // Step 2: Apply selected types (read/create/update/delete) to each selected permission
    const updatedPermissions = selectedPermissions.map(permission => {
      const updated = { ...permission };


      if (this.filters.canRead) {
        updated.canRead = true
      } else {
        updated.canRead = false
      }

      if (this.filters.canCreate) {
        updated.canCreate = true
      } else {
        updated.canCreate = false
      }

      if (this.filters.canUpdate) {
        updated.canUpdate = true
      } else {
        updated.canUpdate = false
      }
      if (this.filters.canDelete) {
        updated.canDelete = true
      } else {
        updated.canDelete = false
      }

      return updated;
    });

    // Step 3: Call backend once with all updated permissions
    this.roleService.updatePermissions(updatedPermissions).subscribe({
      next: (data: any) => {
        AppUtil.openToast('success', data.message, 'Success')
        this.dropdownOpen = false;
        this.allSelected = false;
        this.hasChanges = false;
        this.loadPermissions();
      },
      error: (err) => {
        this.hasChanges = false;
        AppUtil.openToast('error', err.error.message, 'Error')
      }
    });
  }
}