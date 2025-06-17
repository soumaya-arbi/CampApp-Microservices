import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavResponsableComponent } from './sidenav-responsable.component';

describe('SidenavResponsableComponent', () => {
  let component: SidenavResponsableComponent;
  let fixture: ComponentFixture<SidenavResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavResponsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
