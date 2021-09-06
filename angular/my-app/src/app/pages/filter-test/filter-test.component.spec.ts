import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTestComponent } from './filter-test.component';

describe('FilterTestComponent', () => {
  let component: FilterTestComponent;
  let fixture: ComponentFixture<FilterTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
