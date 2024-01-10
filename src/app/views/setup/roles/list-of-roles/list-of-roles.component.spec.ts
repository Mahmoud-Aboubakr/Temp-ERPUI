import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRolesComponent } from './list-of-roles.component';

describe('ListOfRolesComponent', () => {
  let component: ListOfRolesComponent;
  let fixture: ComponentFixture<ListOfRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
