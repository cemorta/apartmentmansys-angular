import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserMaintenanceRequestsListComponent } from './user-maintenance-requests-list/user-maintenance-requests-list.component';
import { UserMaintenanceRequestDetailComponent } from './user-maintenance-request-detail/user-maintenance-request-detail.component';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserMaintenanceRequestsListComponent,
    UserMaintenanceRequestDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
