import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { EmployeeComponent } from './employee/employee.component';

export const router: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    { path: 'about', component: AboutComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'employee', component: EmployeeComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

