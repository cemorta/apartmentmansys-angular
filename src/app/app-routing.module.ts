import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlatFormComponent} from './flat-form/flat-form.component';
import {FlatUserComponent} from './flat-user/flat-user.component';
import {CreateFlatComponent} from './components/create-flat/create-flat.component';
import {UserListComponent} from './components/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { SelectLoginComponent } from './select-login/select-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/select-login', pathMatch: 'full' },
  { path: 'select-login', component: SelectLoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: ApartmentListComponent },
  { path: 'login', component: UserLoginComponent },
  //// { path: 'admin/login', component: AdminLoginComponent },
  //// { path: "browse-flats", component: FlatFormComponent}
  // { path: 'apartments', component: ApartmentListComponent },
  // { path: 'users', component: UserListComponent },
  // { path: 'apartments/:id', component: ApartmentDetailComponent },
  // { path: 'apartment/create', component: ApartmentCreateComponent },
  // { path: 'apartments/:id/create-flat', component: CreateFlatComponent },
  // { path: 'users/add', component: AddUserComponent },
  // Admin routes
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: 'admin/login', component: AdminLoginComponent },
  // {
  //   path: 'apartment',
  //   loadChildren: () => import('./ my-apartment/my-apartment.module').then(m => m.MyApartmentModule),
  //   canActivate: [AuthGuard]
  // },
  // Regular user routes
  // {
  //   path: 'maintenance-requests',
  //   loadChildren: () => import('./maintenance-requests/maintenance-requests.module').then(m => m.MaintenanceRequestsModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'amenities-booking',
  //   loadChildren: () => import('./amenities-booking/amenities-booking.module').then(m => m.AmenitiesBookingModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'my-payments',
  //   loadChildren: () => import('./my-payments/my-payments.module').then(m => m.MyPaymentsModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'staff-tasks',
  //   loadChildren: () => import('./staff-tasks/staff-tasks.module').then(m => m.StaffTasksModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  //   canActivate: [AuthGuard]
  // },
  //
  //
  // { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  // { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
