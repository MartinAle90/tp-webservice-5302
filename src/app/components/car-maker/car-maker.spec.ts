import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMaker } from './car-maker';

describe('CarMaker', () => {
  let component: CarMaker;
  let fixture: ComponentFixture<CarMaker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarMaker],
    }).compileComponents();

    fixture = TestBed.createComponent(CarMaker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
