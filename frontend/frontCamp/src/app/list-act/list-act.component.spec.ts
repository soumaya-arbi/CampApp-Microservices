import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActComponent } from './list-act.component';

describe('ListActComponent', () => {
  let component: ListActComponent;
  let fixture: ComponentFixture<ListActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
