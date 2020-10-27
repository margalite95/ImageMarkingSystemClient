import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSharedDocumentsComponent } from './remove-shared-documents.component';

describe('RemoveSharedDocumentsComponent', () => {
  let component: RemoveSharedDocumentsComponent;
  let fixture: ComponentFixture<RemoveSharedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSharedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSharedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
