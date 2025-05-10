import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import {
  AdminMaintenanceRequestListComponent
} from './admin-maintenance-request-list/admin-maintenance-request-list.component';
import {
  AdminMaintenanceRequestDetailComponent
} from './admin-maintenance-request-detail/admin-maintenance-request-detail.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'maintenance', component: AdminMaintenanceRequestListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'maintenance/:id', component: AdminMaintenanceRequestDetailComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
