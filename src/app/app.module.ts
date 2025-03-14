import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlatUserComponent } from './flat-user/flat-user.component';
import {HttpClientModule} from '@angular/common/http';
import { FlatFormComponent } from './flat-form/flat-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FlatUserComponent,
    FlatFormComponent
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
