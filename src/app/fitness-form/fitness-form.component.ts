import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecordDataService } from '../shared/records-data.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RecordEntry } from '../shared/records-entry.module';

@Component({
  selector: 'app-fitness-form',
  templateUrl: './fitness-form.component.html',
  styleUrl: './fitness-form.component.css'
})
export class FitnessFormComponent implements OnInit {
  // add & update the tqable entries
  
  recordForm:FormGroup;
  editMode = false;
  recordEntry: RecordEntry;
  private paramId: string;

  constructor(private recordDataService: RecordDataService, private router: Router, private activatedRoute:ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.recordEntry = this.recordDataService.getRecordEntry(this.paramId);
      }else{
        this.editMode = false;
      }
    })
    this.recordForm = new FormGroup({
      'day':new FormControl(this.editMode ? this.recordEntry.day: null,[Validators.required]),
      'workout_sts:': new FormControl(this.editMode ? this.recordEntry.workout_sts : null,[Validators.required]),
    })
    
  }
  onAdd(){
    const newEntry = new RecordEntry('',this.recordForm.value.day, this.recordForm.value.workout_sts); // add day & workout sts
    if(this.editMode){
      newEntry.id = this.paramId; 
      this.recordDataService.updateEntry(this.paramId, newEntry);
    }else{
      this.recordDataService.onAddRecordEntry(newEntry);
    }
    
    this.router.navigateByUrl("");  
  }

}
