import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesselectionComponent } from './imagesselection.component';

describe('ImagesselectionComponent', () => {
  let component: ImagesselectionComponent;
  let fixture: ComponentFixture<ImagesselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
