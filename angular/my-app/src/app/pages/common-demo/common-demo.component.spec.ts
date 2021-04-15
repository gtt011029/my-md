import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDemoComponent } from './common-demo.component';

describe('CommonDemoComponent', () => {
  let component: CommonDemoComponent;
  let fixture: ComponentFixture<CommonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
