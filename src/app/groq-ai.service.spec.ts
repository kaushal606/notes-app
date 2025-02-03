import { TestBed } from '@angular/core/testing';

import { GroqAiService } from './groq-ai.service';

describe('GroqAiService', () => {
  let service: GroqAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroqAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
