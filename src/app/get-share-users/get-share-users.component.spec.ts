import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShareUsersComponent } from './get-share-users.component';

describe('GetShareUsersComponent', () => {
  let component: GetShareUsersComponent;
  let fixture: ComponentFixture<GetShareUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetShareUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetShareUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
