import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlatUserComponent } from './flat-user/flat-user.component';
import {HttpClientModule} from '@angular/common/http';
import { FlatFormComponent } from './flat-form/flat-form.component';
import { FormsModule } from '@angular/forms';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { ApartmentCreateComponent } from './apartment-create/apartment-create.component';

@NgModule({
  declarations: [
    AppComponent,
    FlatUserComponent,
    FlatFormComponent,
    ApartmentListComponent,
    ApartmentDetailComponent,
    ApartmentCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    // provideHttpClient(),
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
