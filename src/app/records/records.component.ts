import { Component, OnInit } from '@angular/core';
import { RecordEntry } from '../shared/records-entry.module';
import { RecordDataService } from '../shared/records-data.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// creates the fields for the table 

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{
  recordEntries: RecordEntry[];
  recordSubscription = new Subscription();
  records: any;

  //onEdit: any;
  constructor(private recordDataService: RecordDataService, private router: Router) {}
  ngOnInit(): void {
    this.recordDataService.getRecordEntries(); 
    this.recordSubscription = this.recordDataService.recordSubject.subscribe((_recordEntries: any) => {
    this.recordEntries = this.recordEntries;
    }) 
    this.recordEntries = this.recordDataService.recordEntries;
    
  }
  onEdit(id: string) {
    this.router.navigate(["edit", id]);

  }
 
 

}
