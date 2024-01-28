import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPrivComponent } from './test-priv.component';

describe('TestPrivComponent', () => {
  let component: TestPrivComponent;
  let fixture: ComponentFixture<TestPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPrivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
