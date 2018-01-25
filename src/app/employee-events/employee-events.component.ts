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
  emptyEmployeeEvent = new EmployeeEvent(null, null, currentDate.toISOString().substring(0,10), this.eventEnum, "... Review", "notes...");
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

            // INITIALIZE THE EVENT LIST
            this.eventService.getAllEventsByEmployee(this.id)
              .subscribe(
                (events: any[]) => {
                  this.events = events;
                }, 
                (error) => console.log(error)
              )

            // SUBSCRIBE TO THE EVENT EMIITER STREAM
            this.eventService.onEventAdded.subscribe(
              (employeeEvent: EmployeeEvent) => {
                this.events.push(employeeEvent);
              }
            )
      }
    )



  }

  addEvent(value:any) {
    
    console.log("id:" + this.model.id + " - ver:" + this.model.version);

    // POST THE NEW EVENT TO THE BACKEND
    this.eventService.saveEmployeeEvent(
      this.id, 
      new EmployeeEvent(this.model.id, 
                        this.model.version, 
                        value.occurrence, 
                        this.eventEnum, 
                        value.title, 
                        value.notes)
    )

    // RESET THE MODEL I.E. CLEAR THE INPUTS
    this.model = new EmployeeEvent(null, null, currentDate.toISOString().substring(0,10), this.eventEnum, "... Review", "notes...");
  }

  editEvent(id) {
    this.eventService.getEventById(id)
      .subscribe(
        (event: any) => {
          this.model = event;
          console.log(event);
        }
      )
  }


}
