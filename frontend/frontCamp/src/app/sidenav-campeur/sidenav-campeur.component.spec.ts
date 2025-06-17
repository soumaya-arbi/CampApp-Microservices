import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavCampeurComponent } from './sidenav-campeur.component';

describe('SidenavCampeurComponent', () => {
  let component: SidenavCampeurComponent;
  let fixture: ComponentFixture<SidenavCampeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavCampeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavCampeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
