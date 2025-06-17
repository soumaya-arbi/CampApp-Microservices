import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForComponent } from './list-for.component';

describe('ListForComponent', () => {
  let component: ListForComponent;
  let fixture: ComponentFixture<ListForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListForComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
