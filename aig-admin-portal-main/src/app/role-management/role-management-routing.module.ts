import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './components/role-list/role-list.component';
import { SubAdminListComponent } from './components/sub-admin-list/sub-admin-list.component';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { RolePrivilegesComponent } from './components/role-privileges/role-privileges.component';

const routes: Routes = [

  { path: '', redirectTo: ComponentsRoutes.ROLE_LIST, pathMatch: 'full' },
  { path: ComponentsRoutes.ROLE_LIST, component: RoleListComponent },
  { path: ComponentsRoutes.SUB_ADMIN_LIST, component: SubAdminListComponent },
  { path: ComponentsRoutes.ROLE_PRIVILIGES+'/:roleId/permissions', component: RolePrivilegesComponent }
];

// 'roles/:roleId/permissions'
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
