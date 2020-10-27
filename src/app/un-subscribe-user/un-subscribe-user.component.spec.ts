import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSubscribeUserComponent } from './un-subscribe-user.component';

describe('UnSubscribeUserComponent', () => {
  let component: UnSubscribeUserComponent;
  let fixture: ComponentFixture<UnSubscribeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnSubscribeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnSubscribeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
