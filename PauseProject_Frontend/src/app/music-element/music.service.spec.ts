import { TestBed } from '@angular/core/testing';

import { MusicElementService } from './music.service';

describe('MusicElementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicElementService = TestBed.get(MusicElementService);
    expect(service).toBeTruthy();
  });
});
