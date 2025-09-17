import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, race, timer } from 'rxjs';
import { switchMap, take, catchError, timeout, map } from 'rxjs/operators';
import { PermissionManagementService } from '../services/permission-management.service';
import { PermissionTitle } from '../models/permission-title';
import { PermissionType } from '../models/permission-type';
import { PermissionResponse } from '../models/permission-response';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private permissionService: PermissionManagementService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const permissionTitle: PermissionTitle | undefined = route.data['permissionTitle'];
    const accessType: PermissionType | undefined = route.data['accessType'];

    // Validate required permission data
    if (!permissionTitle || !accessType) {
      this.router.navigate(['/unauthorized']);
      return of(false);
    }

    // Check if permissions are already loaded and not empty
    if (this.permissionService.isLoaded() && this.permissionService.permissions().length > 0) {
      return this.checkPermission(permissionTitle, accessType, state);
    }

    // If not loaded or empty, ensure permissions are loaded first
  
    return race(
      this.permissionService.loadPermissions().pipe(
        switchMap((permissions) => {

          
          return this.checkPermission(permissionTitle, accessType, state);
        })
      ),
      timer(15000).pipe(
        switchMap(() => {
          // console.warn('PermissionGuard: Timeout waiting for permissions to load');
          this.router.navigate(['/unauthorized']);
          return of(false);
        })
      )
    ).pipe(
      catchError((error) => {
        // console.error('PermissionGuard: Error checking permissions', error);
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }

  private checkPermission(
    permissionTitle: PermissionTitle,
    accessType: PermissionType,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const hasPermission = this.permissionService.hasPermission(permissionTitle, accessType);

    if (hasPermission) {
      return of(true);
    }

    console.warn('PermissionGuard: Access denied', {
      permissionTitle,
      accessType,
      attemptedRoute: state.url
    });

    this.router.navigate(['/unauthorized'], {
      queryParams: { returnUrl: state.url }
    });

    return of(false);
  }
}