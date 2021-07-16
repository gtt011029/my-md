import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentChildComponent } from './pages/parent-child/parent-child.component';
import { FirstChildComponent } from './pages/parent-child/first-child/first-child.component';
import { CanvesComponent } from './pages/canves/canves.component';
import { ViewChildComponent } from './pages/view-child/view-child.component';
import { PercentPipe } from './pipe/percent.pipe';
import { PercentsPipe } from './pipe/percents.pipe';
import { HighlightDirective } from './directive/highlight.directive';
import { AdDirective } from './directive/ad.directive';
import { AdBannerComponent } from './pages/ad-banner/ad-banner.component';
import { FormControlComponent } from './pages/form-control/form-control.component';
import { ForbiddenNameDirective } from './shared/forbidden-name.directive';
import { DynamicFormQuestionComponent } from './pages/form-control/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './pages/form-control/dynamic-form/dynamic-form.component';
import { ObservableComponent } from './pages/observable/observable.component';
import { AnnotationComponent } from './pages/annotation/annotation.component';
import { PromiseTestComponent } from './pages/promise-test/promise-test.component';
import { CommonDemoComponent } from './pages/common-demo/common-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentChildComponent,
    FirstChildComponent,
    CanvesComponent,
    ViewChildComponent,
    PercentPipe,
    PercentsPipe,
    HighlightDirective,
    AdDirective,
    AdBannerComponent,
    FormControlComponent,
    ForbiddenNameDirective,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    ObservableComponent,
    AnnotationComponent,
    PromiseTestComponent,
    CommonDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
