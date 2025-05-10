import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {
  StaffMaintenanceAssignmentsComponent
} from './staff-maintenance-assignments/staff-maintenance-assignments.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
