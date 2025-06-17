import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteAddComponent } from './activite-add.component';

describe('ActiviteAddComponent', () => {
  let component: ActiviteAddComponent;
  let fixture: ComponentFixture<ActiviteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiviteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
