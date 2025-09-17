import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ComponentsRoutes } from '../utils/components-routes';

export const authGuardGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let valid = authService.isTokenExpired();
  if(!valid){
    authService.navigateToComponent(ComponentsRoutes.ADMIN_HOME);
    return false;
  }
  return true;
};
