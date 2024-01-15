import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDataComponent } from './employmentData.component';

describe('EmploymentDataComponent', () => {
  let component: EmploymentDataComponent;
  let fixture: ComponentFixture<EmploymentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmploymentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
