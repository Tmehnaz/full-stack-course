import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';
import { FitnessFormComponent } from './fitness-form/fitness-form.component';

// Navigation inside the web application
// Routing starts from the fitness tracker page as root

const routes: Routes = [
  {path:"",component: RecordsComponent },
  {path:"data-entry",component:FitnessFormComponent},
  {path:"edit/:id", component:FitnessFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
