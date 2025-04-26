import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlatFormComponent} from './flat-form/flat-form.component';
import {FlatUserComponent} from './flat-user/flat-user.component';
import {ApartmentListComponent} from './apartment-list/apartment-list.component';
import {ApartmentDetailComponent} from './apartment-detail/apartment-detail.component';
import {ApartmentCreateComponent} from './apartment-create/apartment-create.component';
import {CreateFlatComponent} from './components/create-flat/create-flat.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {LoginComponent} from './components/login/login.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: "browse-flats", component: FlatFormComponent}
  { path: 'apartments', component: ApartmentListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'apartments/:id', component: ApartmentDetailComponent },
  { path: 'apartment/create', component: ApartmentCreateComponent },
  { path: 'apartments/:id/create-flat', component: CreateFlatComponent },
  { path: 'users/add', component: AddUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
