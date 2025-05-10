import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {
  AdminMaintenanceRequestListComponent
} from './admin-maintenance-request-list/admin-maintenance-request-list.component';
import {
  AdminMaintenanceRequestDetailComponent
} from './admin-maintenance-request-detail/admin-maintenance-request-detail.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminMaintenanceRequestListComponent,
    AdminMaintenanceRequestDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
