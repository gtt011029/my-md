import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentChildComponent } from './pages/parent-child/parent-child.component';
import { CanvesComponent } from './pages/canves/canves.component';
import { ViewChildComponent } from './pages/view-child/view-child.component';
import { FormControlComponent } from './pages/form-control/form-control.component';
import { ObservableComponent } from './pages/observable/observable.component';
import { AnnotationComponent } from './pages/annotation/annotation.component';
import { PromiseTestComponent } from './pages/promise-test/promise-test.component';
import { CommonDemoComponent } from './pages/common-demo/common-demo.component';


const routes: Routes = [
  {path: 'parentChild', component: ParentChildComponent, pathMatch: 'full', data: {}},
  {path: 'canvas', component: CanvesComponent, pathMatch: 'full', data: {}},
  {path: 'ViewChild', component: ViewChildComponent, pathMatch: 'full', data: {}},
  {path: 'FormControl', component: FormControlComponent, pathMatch: 'full', data: {}},
  {path: 'Observable', component: ObservableComponent, pathMatch: 'full', data: {}},
  {path: 'Annotation', component: AnnotationComponent, pathMatch: 'full', data: {}},
  {path: 'promise', component: PromiseTestComponent, pathMatch: 'full', data: {}},
  {path: 'commonDemo', component: CommonDemoComponent, pathMatch: 'full', data: {params: '123'}},
  {path: '', redirectTo: 'commonDemo', pathMatch: 'full', data: {}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
