import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomApi } from './custom-api';

describe('CustomApi', () => {
  let component: CustomApi;
  let fixture: ComponentFixture<CustomApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomApi],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
