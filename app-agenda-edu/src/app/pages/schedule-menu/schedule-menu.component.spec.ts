import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMenuComponent } from './schedule-menu.component';

describe('ScheduleMenuComponent', () => {
  let component: ScheduleMenuComponent;
  let fixture: ComponentFixture<ScheduleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
