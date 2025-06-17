import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterhebergementComponent } from './affecterhebergement.component';

describe('AffecterhebergementComponent', () => {
  let component: AffecterhebergementComponent;
  let fixture: ComponentFixture<AffecterhebergementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterhebergementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecterhebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
