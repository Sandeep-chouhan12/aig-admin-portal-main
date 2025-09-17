import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { RolesResponse } from '../models/roles-response';
import { PermissionTitle } from '../models/permission-title';
import { PermissionType } from '../models/permission-type';
import { ApiRoutes } from '../utils/api-routes';
import { PermissionResponse } from '../models/permission-response';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError, map, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionManagementService {
  permissions = signal<PermissionResponse[]>([]);
  private loaded = new BehaviorSubject<boolean>(false);
  private loading = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    // Auto-initialize permissions when service is created
    this.initializePermissions();
  }

  private initializePermissions(): void {
    // Only initialize if we have a valid role
    const roleId = this.authService.getRoleId();
    if (roleId) {
      this.loadPermissions().subscribe({
        next: (permissions) => {
         
        },
        error: (error) => {
      
        }
      });
    }
  }

  setPermissions(newPermissions: PermissionResponse[]): void {
    const current = this.permissions();
    if (JSON.stringify(current) !== JSON.stringify(newPermissions)) {
      this.permissions.set(newPermissions);
    }
  }

  loadPermissions(): Observable<PermissionResponse[]> {
    const roleId = this.authService.getRoleId();

    if (!roleId) {
      // console.warn('No role ID found, cannot load permissions');
      this.loaded.next(true);
      return of([]);
    }

    if (this.loading.value) {
    
      return this.waitForLoad().pipe(
        map(() => this.permissions())
      );
    }

    this.loading.next(true);

    return this.httpClient.get<{ permissions: PermissionResponse[] }>(
      `${ApiRoutes.GET_PERMISSIONS_BY_ROLE_ID}${roleId}/LoadAllpermissions`
    ).pipe(
      tap({
        next: (res) => {
          this.setPermissions(res.permissions);
          this.loaded.next(true);
          this.loading.next(false);
          
        },
        error: (err) => {
          // console.error('Failed to load permissions', err);
          this.loaded.next(true); // Mark as loaded even on error to prevent infinite waiting
          this.loading.next(false);
        }
      }),
      map(res => res.permissions),
      catchError(err => {
        // console.error('Permission loading error', err);
        return of([]);
      })
    );
  }

  hasPermission(title: PermissionTitle, permissionAccessType: PermissionType): boolean {

    const role = this.authService.getUserRole();
    if (!role || !title || !permissionAccessType) {
      // console.warn('Missing role or permission info', { role, title, permissionAccessType });
      return false;
    }

    const perms = this.permissions();
    return perms.some((permission) => {
      return permission.title === title &&
        this.checkPermission(permissionAccessType, permission);
    });
  }

  checkPermission(permissionAccessType: PermissionType, permission: PermissionResponse): boolean {
    switch (permissionAccessType) {
      case PermissionType.CREATE: return permission.canCreate;
      case PermissionType.DELETE: return permission.canDelete;
      case PermissionType.READ: return permission.canRead;
      case PermissionType.UPDATE: return permission.canUpdate;
      default: return false;
    }
  }

  waitForLoad(): Observable<boolean> {
    if (this.loaded.value && this.permissions().length > 0) {
      return of(true);
    }

    return this.loaded.pipe(
      filter(loaded => loaded && this.permissions().length > 0),
      take(1)
    );
  }

  isLoaded(): boolean {
    return this.loaded.value && this.permissions().length > 0;
  }

  isLoading(): boolean {
    return this.loading.value;
  }

  // Method to refresh permissions
  refreshPermissions(): Observable<PermissionResponse[]> {
    this.loaded.next(false);
    this.loading.next(false);
    return this.loadPermissions();
  }
}