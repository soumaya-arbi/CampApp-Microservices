import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumAjoutComponent } from './forum-ajout.component';

describe('ForumAjoutComponent', () => {
  let component: ForumAjoutComponent;
  let fixture: ComponentFixture<ForumAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumAjoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
