import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllVotesComponent } from './view-all-votes.component';

describe('ViewAllVotesComponent', () => {
  let component: ViewAllVotesComponent;
  let fixture: ComponentFixture<ViewAllVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllVotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
