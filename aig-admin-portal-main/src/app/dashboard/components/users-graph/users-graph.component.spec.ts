import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGraphComponent } from './users-graph.component';

describe('UsersGraphComponent', () => {
  let component: UsersGraphComponent;
  let fixture: ComponentFixture<UsersGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersGraphComponent]
    });
    fixture = TestBed.createComponent(UsersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
