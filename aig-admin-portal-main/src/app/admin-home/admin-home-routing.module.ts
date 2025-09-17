import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutes } from '../shared/utils/components-routes';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { PermissionGuard } from '../shared/guards/permission.guard';
import { PermissionTitle } from '../shared/models/permission-title';
import { PermissionType } from '../shared/models/permission-type';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: ComponentsRoutes.DASHBOARD,
        pathMatch: 'full',
      },
      {
        path: ComponentsRoutes.NOTIFICATIONS,
        pathMatch: 'full',
        component: NotificationComponent
      },
      {
        path: ComponentsRoutes.DASHBOARD,

        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule),

      },
      {
        path: ComponentsRoutes.USERS,
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
        data: {
          permissionTitle: PermissionTitle.USERS,
          accessType: PermissionType.READ,
        }
      },
      {
        path: ComponentsRoutes.VERIFICATION_OFFICER,
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('../verification-officer/verification-officer.module').then((m) => m.VerificationOfficerModule),
        data: {
          permissionTitle: PermissionTitle.VERIFICATION_OFFICERS,
          accessType: PermissionType.READ,
        }
      },
      {
        path: ComponentsRoutes.VERIFICATION_PORTAL,
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('../verification-portal/verification-portal.module').then((m) => m.VerificationPortalModule),
        data: {
          permissionTitle: PermissionTitle.VERIFICATION_PORTAL,
          accessType: PermissionType.READ,
        }
      },
      {
        path: ComponentsRoutes.EMERGENCY,
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('../emergency/emergency.module').then((m) => m.EmergencyModule),
        data: {
          permissionTitle: PermissionTitle.EMERGENCY,
          accessType: PermissionType.READ,
        }
      },
      // {
      //   path: ComponentsRoutes.API_DOCUMENTATION,

      //   loadChildren: () =>
      //     import('../api-documentation/api-documentation.module').then((m) => m.ApiDocumentationModule),

      // },
      {
        path: ComponentsRoutes.ORGANIZATION,
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('../organization/organization.module').then((m) => m.OrganizationModule),
        data: {
          permissionTitle: PermissionTitle.ORGANIZATIONS,
          accessType: PermissionType.READ,
        }

      },
      {
        path: ComponentsRoutes.ROLE_MANAGEMENT,
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('../role-management/role-management.module').then((m) => m.RoleManagementModule),
        data: {
          permissionTitle: PermissionTitle.ROLE_MANAGEMENT,
          accessType: PermissionType.READ,
        }
      },
      {
        path: ComponentsRoutes.CONFIGURATOIN,
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('../configurations/configurations.module').then((m) => m.ConfigurationsModule),
        data: {
          permissionTitle: PermissionTitle.CONFIGURATIONS,
          accessType: PermissionType.READ,
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
