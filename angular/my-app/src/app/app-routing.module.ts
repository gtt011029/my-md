import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentChildComponent } from './pages/parent-child/parent-child.component';
import { CanvesComponent } from './pages/canves/canves.component';
import { ViewChildComponent } from './pages/view-child/view-child.component';
import { FormControlComponent } from './pages/form-control/form-control.component';
import { ObservableComponent } from './pages/observable/observable.component';


const routes: Routes = [
  {path: 'parentChild', component: ParentChildComponent, pathMatch: 'full', data: {}},
  {path: 'canves', component: CanvesComponent, pathMatch: 'full', data: {}},
  {path: 'ViewChild', component: ViewChildComponent, pathMatch: 'full', data: {}},
  {path: 'FormControl', component: FormControlComponent, pathMatch: 'full', data: {}},
  {path: 'Observable', component: ObservableComponent, pathMatch: 'full', data: {}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
