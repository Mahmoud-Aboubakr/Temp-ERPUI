import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAndContatctInfoComponent } from './addressAndContatctInfo.component';

describe('AddressAndContatctInfoComponent', () => {
  let component: AddressAndContatctInfoComponent;
  let fixture: ComponentFixture<AddressAndContatctInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressAndContatctInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressAndContatctInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
