import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlatFormComponent} from './flat-form/flat-form.component';
import {FlatUserComponent} from './flat-user/flat-user.component';
import {ApartmentListComponent} from './apartment-list/apartment-list.component';
import {ApartmentDetailComponent} from './apartment-detail/apartment-detail.component';
import {ApartmentCreateComponent} from './apartment-create/apartment-create.component';

const routes: Routes = [
  { path: '', component: FlatFormComponent },
  // { path: "browse-flats", component: FlatFormComponent}
  { path: 'apartments', component: ApartmentListComponent },
  { path: 'view-apartment/:id', component: ApartmentDetailComponent },
  { path: 'apartments/create', component: ApartmentCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
