import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { DlDateTimeDateModule, DlDateTimePickerModule, DlDateTimeInputModule } from 'angular-bootstrap-datetimepicker';

@NgModule({
  declarations: [AppComponent, ProductFormComponent, CustomerFormComponent],
  imports: [
    BrowserModule,
    FormsModule, // Required for Template Driven Forms
    ReactiveFormsModule, // Required for Reactive Forms
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    DlDateTimeInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
