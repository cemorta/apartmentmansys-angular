import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlatFormComponent} from './flat-form/flat-form.component';
import {FlatUserComponent} from './flat-user/flat-user.component';

const routes: Routes = [
  { path: '', component: FlatUserComponent},
  { path: "browse-flats", component: FlatFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
