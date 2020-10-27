import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMarkingComponent } from './image-marking.component';

describe('ImageMarkingComponent', () => {
  let component: ImageMarkingComponent;
  let fixture: ComponentFixture<ImageMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
