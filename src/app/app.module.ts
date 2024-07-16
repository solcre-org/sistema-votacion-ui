import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VotingFormComponent } from './voting-form/voting-form.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppComponent,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [],
})

export class AppModule {}
