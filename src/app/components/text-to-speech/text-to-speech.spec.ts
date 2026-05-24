import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToSpeech } from './text-to-speech';

describe('TextToSpeech', () => {
  let component: TextToSpeech;
  let fixture: ComponentFixture<TextToSpeech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextToSpeech],
    }).compileComponents();

    fixture = TestBed.createComponent(TextToSpeech);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
