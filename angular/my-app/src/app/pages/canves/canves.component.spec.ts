import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvesComponent } from './canves.component';

describe('CanvesComponent', () => {
  let component: CanvesComponent;
  let fixture: ComponentFixture<CanvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
