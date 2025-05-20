import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserMaintenanceRequestsListComponent } from './user-maintenance-requests-list/user-maintenance-requests-list.component';
import { UserMaintenanceRequestDetailComponent } from './user-maintenance-request-detail/user-maintenance-request-detail.component';
import { UserMaintenanceRequestAddComponent } from './user-maintenance-request-add/user-maintenance-request-add.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { FlatDuesComponent } from './flat-dues/flat-dues.component';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserMaintenanceRequestsListComponent,
    UserMaintenanceRequestDetailComponent,
    UserMaintenanceRequestAddComponent,
    UserDashboardComponent,
    FlatDuesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,

  ]
})
export class UserModule { }
