import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
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
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
