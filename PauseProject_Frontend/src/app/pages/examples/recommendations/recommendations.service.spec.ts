import { TestBed } from '@angular/core/testing';

import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendationsService = TestBed.get(RecommendationsService);
    expect(service).toBeTruthy();
  });
});
