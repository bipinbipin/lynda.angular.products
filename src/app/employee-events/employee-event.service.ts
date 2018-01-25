import {EventEmitter, Injectable, NgModule} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import {Employee} from "../employee/employee";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {EmployeeEvent} from "./employee-event";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ]
})

@Injectable()
export class EventService {

    onEventAdded = new EventEmitter<EmployeeEvent>();

    constructor(private http: HttpClient) {
    }

    getAllEventsByEmployee(employeeId: number) {
        // CLEAR THE EVENT EMITTER BECAUSE A DIFF EMPLOYEE WAS SELECTED
        this.onEventAdded = new EventEmitter<EmployeeEvent>();

        // GET THE LIST OF EVENTS FOR GIVEN EMPLOYEE
        let url = '/api/employee/' + employeeId + '/employee_event/'
        return this.http.get(url);
    }

    getEventById(eventId: number) {
        // EMPLOYEE ID CAN BE 0 AS IT IS NOT USED
        let url = '/api/employee/0/employee_event/' + eventId;
        return this.http.get(url);
    }

    saveEmployeeEvent(employeeId: number, employeeEvent: EmployeeEvent) {
        
        let url = '/api/employee/' + employeeId + '/employee_event/';
        this.http.post(url, employeeEvent).subscribe(
            (employeeEvent: any) => this.onEventAdded.emit(employeeEvent)
        )
        
    }


}