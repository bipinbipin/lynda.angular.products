import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../employee-events/employee-event.service";
import { CrmEngineer } from "./crm_engineer";
import {deserialize} from 'json-typescript-mapper'
import { FieldEngineerService } from "./field-engineer.service";


@Component({
  selector: 'app-field-engineer',
  templateUrl: './field-engineer.component.html',
  styleUrls: ['./field-engineer.component.css']
})
export class FieldEngineerComponent implements OnInit {

  table_data;
  crm_engineers: CrmEngineer[];

  constructor(private activatedRoute: ActivatedRoute,
              private fieldEngineerService: FieldEngineerService) { }

  ngOnInit() {
    
    this.getCrmEngineersOnProject();

  }

  getCrmEngineersOnProject() {
    this.fieldEngineerService.getCrmEngineersOnProject().subscribe(
      (engineers: any[]) => {
        // console.log(engineers);
        this.crm_engineers = engineers;
        this.table_data = engineers;
      },
      (error) => console.log(error),
      () => {
        console.log(this.crm_engineers);
      }
    )
  }

  addMonth(date: string, months: number) {
    let dt = new Date(date)
    return new Date(dt.setMonth(dt.getMonth() + months)).toLocaleDateString();
  }

  formatStringAsDate(date: string) {
    let dt = new Date(date)
    return dt.toLocaleDateString();
  }

}
