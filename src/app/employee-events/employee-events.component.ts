import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeEvent } from './employee-event';
import { EventService } from './employee-event.service';

const currentDate = new Date();

@Component({
  selector: 'app-employee-events',
  templateUrl: './employee-events.component.html',
  styleUrls: ['./employee-events.component.css']
})
export class EmployeeEventsComponent implements OnInit {
  id: any;
  paramsSub: any;
  update: boolean = false;
  eventEnum = "PERFORMANCE_REVIEW";
  emptyEmployeeEvent = new EmployeeEvent(null, null, currentDate.toISOString().substring(0,10), this.eventEnum, "", "");
  model = this.emptyEmployeeEvent;

  
  events: EmployeeEvent[];
  

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService) {

  }

  ngOnInit() {
    // LOG INITIAL STATE OF ROUTE PARAM
    // console.log(this.activatedRoute.snapshot.params['id']);

    // SUBSCRIBE TO THE ROUTE PARAMS OBSERVABLE
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
            // IF THE ID CHANGES GET THE EVENTS

            // CLEAR THE FORM
            this.clearForm();

            this.initializeAndSubscribeToEventList();

      }
    )

    
  }

  addEvent(value:any) {
    
    // console.log("id:" + this.model.id + " - ver:" + this.model.version);

    // POST THE NEW EVENT TO THE BACKEND
    let observable = this.eventService.saveEmployeeEvent(
      this.id, 
      new EmployeeEvent(this.model.id, 
                        this.model.version, 
                        value.occurrence, 
                        this.eventEnum, 
                        value.title, 
                        value.notes)
    )

    if(observable) {
      observable.subscribe(
                (employeeEvent: any) => {
                    // console.log("REINITIZE - Employee ID: " + employeeId )
                    // REFETCH EVENTS BY EMPLOYEE
                    // this.getAllEventsByEmployee(employeeId);
                },
                (error) => console.log(error),
                () => {
                    // this.getAllEventsByEmployee(employeeId)
                    console.log("PROMISE COMPLETED")
                    this.initializeAndSubscribeToEventList();
                }
            )
    }
    // RESET THE MODEL I.E. CLEAR THE INPUTS
    this.clearForm();
    
  }

  editEvent(id) {
    this.update = true;
    this.eventService.getEventById(id)
      .subscribe(
        (event: any) => {
          this.model = event;
          // console.log(event);
        }
      )
  }

  clearForm() {
    // RESET THE MODEL I.E. CLEAR THE INPUTS
    this.model = new EmployeeEvent(null, null, currentDate.toISOString().substring(0,10), this.eventEnum, "", "");

    this.update = false;
  }

  initializeAndSubscribeToEventList() {
      console.log("RESUBSCRIBE TO EVENTS")
      this.events = [];

      // INITIALIZE THE EVENT LIST
      this.eventService.getAllEventsByEmployee(this.id)
        .subscribe(
          (events: any[]) => {
            this.events = events;
            // console.log(this.events);
          }, 
          (error) => console.log(error)
        )


      // let getEventFunc = (data: any[]) => {
      //       // console.log(data);
      //       this.events = data; 
      //   };
      // this.eventService.getEventsByEmployee_Sub(getEventFunc, this.id);
      // console.log(this.events);


      // SUBSCRIBE TO THE EVENT EMIITER STREAM
      this.eventService.onEventAdded.subscribe(
        (employeeEvent: EmployeeEvent) => {
          this.events.push(employeeEvent);
        }
      )
  }


}
