import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSharedDocumentsComponent } from './create-shared-documents.component';

describe('CreateSharedDocumentsComponent', () => {
  let component: CreateSharedDocumentsComponent;
  let fixture: ComponentFixture<CreateSharedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSharedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSharedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
