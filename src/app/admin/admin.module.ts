import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {
  AdminMaintenanceRequestListComponent
} from './admin-maintenance-request-list/admin-maintenance-request-list.component';
import {
  AdminMaintenanceRequestDetailComponent
} from './admin-maintenance-request-detail/admin-maintenance-request-detail.component';
import {ApartmentListComponent} from './apartment-list/apartment-list.component';
import {ApartmentDetailComponent} from './apartment-detail/apartment-detail.component';
import {ApartmentCreateComponent} from './apartment-create/apartment-create.component';
import {DueListComponent} from './due-list/due-list.component';
import {DueCreateComponent} from './due-create/due-create.component';
import {AmenityFormComponent} from './amenity-form/amenity-form.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminMaintenanceRequestListComponent,
    AdminMaintenanceRequestDetailComponent,
    ApartmentListComponent,
    ApartmentDetailComponent,
    ApartmentCreateComponent,
    DueCreateComponent,
    DueListComponent,
    AmenityFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
