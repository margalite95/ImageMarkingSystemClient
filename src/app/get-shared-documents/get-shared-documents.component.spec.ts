import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSharedDocumentsComponent } from './get-shared-documents.component';

describe('GetSharedDocumentsComponent', () => {
  let component: GetSharedDocumentsComponent;
  let fixture: ComponentFixture<GetSharedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSharedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSharedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
