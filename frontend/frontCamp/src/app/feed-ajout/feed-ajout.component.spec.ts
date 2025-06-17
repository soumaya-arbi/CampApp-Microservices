import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedAjoutComponent } from './feed-ajout.component';

describe('FeedAjoutComponent', () => {
  let component: FeedAjoutComponent;
  let fixture: ComponentFixture<FeedAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedAjoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
