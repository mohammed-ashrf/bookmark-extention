import { TestBed } from '@angular/core/testing';

import { BookmarkserviceService } from './bookmarkservice.service';

describe('BookmarkserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookmarkserviceService = TestBed.get(BookmarkserviceService);
    expect(service).toBeTruthy();
  });
});
