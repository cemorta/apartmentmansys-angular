import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from '../guards/auth.guard';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {
  StaffMaintenanceAssignmentsComponent
} from './staff-maintenance-assignments/staff-maintenance-assignments.component';
import { UserMaintenanceRequestsListComponent } from './user-maintenance-requests-list/user-maintenance-requests-list.component';
import { UserMaintenanceRequestDetailComponent } from './user-maintenance-request-detail/user-maintenance-request-detail.component';
import { UserMaintenanceRequestAddComponent } from './user-maintenance-request-add/user-maintenance-request-add.component';
import { FlatDuesComponent } from './flat-dues/flat-dues.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff-tasks',
    component: StaffMaintenanceAssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-maintenance-requests',
    component: UserMaintenanceRequestsListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'my-maintenance-requests/add', component: UserMaintenanceRequestAddComponent, canActivate: [AuthGuard] },
  { path: 'my-maintenance-requests/:id', component: UserMaintenanceRequestDetailComponent, canActivate: [AuthGuard] },
  { path: 'flats/:id', component: FlatDuesComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
