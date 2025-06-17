import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCampeurComponent } from './main-campeur.component';

describe('MainCampeurComponent', () => {
  let component: MainCampeurComponent;
  let fixture: ComponentFixture<MainCampeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCampeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCampeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
