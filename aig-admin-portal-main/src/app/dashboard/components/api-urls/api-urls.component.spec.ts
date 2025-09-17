import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUrlsComponent } from './api-urls.component';

describe('ApiUrlsComponent', () => {
  let component: ApiUrlsComponent;
  let fixture: ComponentFixture<ApiUrlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiUrlsComponent]
    });
    fixture = TestBed.createComponent(ApiUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
