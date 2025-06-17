import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCampingComponent } from './centre-camping.component';

describe('CentreCampingComponent', () => {
  let component: CentreCampingComponent;
  let fixture: ComponentFixture<CentreCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentreCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
