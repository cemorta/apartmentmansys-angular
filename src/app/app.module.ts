import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlatUserComponent } from './flat-user/flat-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlatFormComponent } from './flat-form/flat-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFlatComponent } from './components/create-flat/create-flat.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { SelectLoginComponent } from './select-login/select-login.component';
import { AuthInterceptor } from './auth.interceptor';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { StaffMaintenanceAssignmentsComponent } from './user/staff-maintenance-assignments/staff-maintenance-assignments.component';
import { UserPaymentsComponent } from './user/user-payments/user-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    FlatUserComponent,
    FlatFormComponent,
    CreateFlatComponent,
    UserListComponent,
    AdminLoginComponent,
    SelectLoginComponent,
    StaffMaintenanceAssignmentsComponent,
    UserPaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      // provideHttpClient(),
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
