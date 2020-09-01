import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentChildComponent } from '../app/pages/parent-child/parent-child.component';
import { CanvesComponent } from '../app/pages/canves/canves.component';
import { ViewChildComponent } from '../app/pages/view-child/view-child.component';
import { FormControlComponent } from '../app/pages/form-control/form-control.component';


const routes: Routes = [
  {path: 'parentChild', component: ParentChildComponent, pathMatch: 'full', data: {}},
  {path: 'canves', component: CanvesComponent, pathMatch: 'full', data: {}},
  {path: 'ViewChild', component: ViewChildComponent, pathMatch: 'full', data: {}},
  {path: 'FormControl', component: FormControlComponent, pathMatch: 'full', data: {}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
