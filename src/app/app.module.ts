import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";



import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes }from './app.routes';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEventsComponent } from './employee-events/employee-events.component';
import { EventService } from './employee-events/employee-event.service';
import { FieldEngineerComponent } from './field-engineer/field-engineer.component';
import { FieldEngineerService } from "./field-engineer/field-engineer.service";
import { NglModule } from 'ng-lightning/ng-lightning';
import { ClarityModule } from "@clr/angular";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    AboutComponent,
    EmployeeComponent,
    EmployeeEventsComponent,
    FieldEngineerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    routes,
    NglModule.forRoot()
    // ClarityModule
  ],
  providers: [
    HttpClient,
    EventService,
    FieldEngineerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
