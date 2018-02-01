import {EventEmitter, Injectable, NgModule, Output} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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

    @Output()
    onEventAdded: EventEmitter<any> = new EventEmitter<EmployeeEvent>();

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

    // saveEmployeeEvent(employeeId: number, employeeEvent: EmployeeEvent) {
    //     // console.log(employeeEvent.id);
    //     let url = '/api/employee/' + employeeId + '/employee_event/';

    //     // UPDATE
    //     if(employeeEvent.id) {
    //         console.log("UPDATE")
    //         // REINITIALIZE THE EMITTER TO ACCOUNT FOR UPDATE
    //         this.http.post(url, employeeEvent).subscribe(
    //             (employeeEvent: any) => {
    //                 console.log("REINITIZE - Employee ID: " + employeeId )
    //                 // REFETCH EVENTS BY EMPLOYEE
    //                 // this.getAllEventsByEmployee(employeeId);
    //             },
    //             (error) => console.log(error),
    //             () => {
    //                 // this.getAllEventsByEmployee(employeeId)
    //                 console.log("PROMISE COMPLETED")
    //             }
    //         )
    //     } else {    
    //     // SAVE
    //         this.http.post(url, employeeEvent).subscribe(
    //             (employeeEvent: any) => this.onEventAdded.emit(employeeEvent)
    //         )

    //     }
    // }


    saveEmployeeEvent(employeeId: number, employeeEvent: EmployeeEvent) {
        // console.log(employeeEvent.id);
        let url = '/api/employee/' + employeeId + '/employee_event/';

        // UPDATE
        if(employeeEvent.id) {
            console.log("UPDATE")
            // REINITIALIZE THE EMITTER TO ACCOUNT FOR UPDATE
            return this.http.post(url, employeeEvent)
        } else {    
        // SAVE
            this.http.post(url, employeeEvent).subscribe(
                (employeeEvent: any) => this.onEventAdded.emit(employeeEvent)
            )

        }
    }


    getEventsByEmployee_Sub(anonFunc, employeeId: number): Subscription {
        
        // CLEAR THE EVENT EMITTER BECAUSE A DIFF EMPLOYEE WAS SELECTED
        this.onEventAdded = new EventEmitter<EmployeeEvent>();

        // GET THE LIST OF EVENTS FOR GIVEN EMPLOYEE
        let url = '/api/employee/' + employeeId + '/employee_event/'
        let retVal = this.http.get(url).subscribe(anonFunc)
        return retVal;
    }



}