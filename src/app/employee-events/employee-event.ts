export class EmployeeEvent {
  public id: number;
  public version: number;
  public occurrence: string;
  public eventType: string;
  public title: string;
  public notes: string;

  constructor(id: number, version: number, occurrence: string, eventType: string, title: string, notes: string) {
    this.id = id;
    this.version = version;
    this.occurrence = occurrence;
    this.eventType = eventType;
    this.title = title;
    this.notes = notes;
  }

}
