import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresTabComponent } from './stores-tab.component';

describe('StoresTabComponent', () => {
  let component: StoresTabComponent;
  let fixture: ComponentFixture<StoresTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
