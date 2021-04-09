import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTaskListComponent } from './custom-task-list.component';

describe('CustomTaskListComponent', () => {
  let component: CustomTaskListComponent;
  let fixture: ComponentFixture<CustomTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
