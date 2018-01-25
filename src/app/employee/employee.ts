import {EmployeeEvent} from "../employee-events/employee-event";

export class Employee {
  public id: number;
  public firstName: string;
  public lastName: string;
  public jobTitle: string;
  public employeeEvents: EmployeeEvent[] = [];


  constructor(id: number, firstName: string, lastName: string, jobTitle: string, employeeEvents) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobTitle = jobTitle;
    this.employeeEvents = employeeEvents;
  }
}