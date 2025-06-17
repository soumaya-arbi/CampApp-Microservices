import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainResponsableComponent } from './main-responsable.component';

describe('MainResponsableComponent', () => {
  let component: MainResponsableComponent;
  let fixture: ComponentFixture<MainResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainResponsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
