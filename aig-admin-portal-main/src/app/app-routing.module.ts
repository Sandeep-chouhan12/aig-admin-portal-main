import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutes } from './shared/utils/components-routes';
import { AuthenticationComponent } from './authentication/components/authentication/authentication.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { SomethingWentWrongComponent } from './shared/components/something-went-wrong/something-went-wrong.component';

const routes: Routes = [
  {
    path:ComponentsRoutes.LOGIN,
    component:AuthenticationComponent,
    pathMatch:'full',
    canActivate : [authGuardGuard]
  },
  {
    path: ComponentsRoutes.ADMIN_HOME,
    loadChildren: () =>
      import('./admin-home/admin-home.module').then((m) => m.AdminHomeModule),
  },
  {
    path:ComponentsRoutes.SOMETHING_WENT_WRONG,
    component:SomethingWentWrongComponent,
    pathMatch:'full',
  },
  {
    path:'**',
    redirectTo:ComponentsRoutes.NOT_FOUND_PAGE,
  },
  {
    path:ComponentsRoutes.NOT_FOUND_PAGE,
    component:NotFoundComponent,
    pathMatch:'full',
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
