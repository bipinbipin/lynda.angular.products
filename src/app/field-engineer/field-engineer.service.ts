import {EventEmitter, Injectable, NgModule, Output} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {Employee} from "../employee/employee";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ]
})

@Injectable()
export class FieldEngineerService {

    constructor(private http: HttpClient) { }

    
    getCrmEngineersOnProject() {
        // EMPLOYEE ID CAN BE 0 AS IT IS NOT USED
        let url = '/api/crm_engineer/'
        return this.http.get(url);
    }
}
