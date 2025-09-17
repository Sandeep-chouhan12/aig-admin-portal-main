import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleListComponent } from './components/role-list/role-list.component';
import { SubAdminListComponent } from './components/sub-admin-list/sub-admin-list.component';
import { RolePrivilegesComponent } from './components/role-privileges/role-privileges.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RoleListComponent,
    SubAdminListComponent,
    RolePrivilegesComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RoleManagementModule { }
