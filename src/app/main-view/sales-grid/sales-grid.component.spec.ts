import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGridComponent } from './sales-grid.component';

describe('SalesGridComponent', () => {
  let component: SalesGridComponent;
  let fixture: ComponentFixture<SalesGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesGridComponent]
    });
    fixture = TestBed.createComponent(SalesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
