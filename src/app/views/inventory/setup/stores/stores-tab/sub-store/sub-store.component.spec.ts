import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoreComponent } from './sub-store.component';

describe('SubStoreComponent', () => {
  let component: SubStoreComponent;
  let fixture: ComponentFixture<SubStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
