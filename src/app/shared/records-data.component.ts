import { Injectable } from "@angular/core";
import { RecordEntry } from "./records-entry.module";
import { HttpClient } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { Subject, map } from "rxjs";

@Injectable({providedIn:"root"})

export class RecordDataService {
  public maxId: string;

  constructor(private http: HttpClient){}

  updateEntry(id: string, entry:RecordEntry){
    this.http.put<{message: string}>('http://localhost:3000/update-entry'+ id, entry).subscribe((jsonData) => {
      console.log(jsonData.message);
      this.getRecordEntries() ;
    });

  }
  
  public recordSubject = new Subject<RecordEntry[]>();
  recordEntries: RecordEntry[] = [];
  
  // onUpdateEntry(paramId: string, newEntry: RecordEntry) {
  //   throw new Error('Method not implemented.');
  // }

  // recordSubject = new Subject<RecordEntry>();
  

   
   

    
    //Get json data
    
  getRecordEntries(){
    this.http.get<{recordEntries:any}>('http://localhost:3000/records-entries')
    .pipe(map((responseData) => {
      return responseData.recordEntries.map((entry: {day:string; workout_sts: string; _id:string}) => {
        return {
          day: entry.day,
          workout_sts: entry.workout_sts,
          id: entry._id
        }
      })
    }))
    .subscribe((updateResponse) => {
      this.recordEntries = updateResponse;
      this.recordSubject.next(this.recordEntries);
    });
  }
  getRecordEntry(id: string){
    const index = this.recordEntries.findIndex(el => {
      return el.id == id;
  })
    return this.recordEntries[index];

  }
  
  onAddRecordEntry(recordEntry: RecordEntry){
      // this.http.get<{maxId: string}>('http://localhost:3000/max-id').subscribe((jsonData) => {
      //   recordEntry.id =jsonData.maxId + 1;
        this.http.post<{message:string}>('http://localhost:3000/add-entry', recordEntry).subscribe((jsonData) => {
        console.log(recordEntry);  
        this.getRecordEntries();
      })

      // this.recordEntries.push(recordEntry);
      // this.recordSubject.next(this.recordEntries);

   
    // onUpdateEntry(paramId: number, newEntry: RecordEntry) {
      
    //   this.recordEntries[paramId] = newEntry;
    //   this.recordSubject.next(this.recordEntries);
    // }
   

}
}