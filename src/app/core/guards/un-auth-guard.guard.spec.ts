import { TestBed, async, inject } from '@angular/core/testing';

import { UnAuthGuardGuard } from './un-auth-guard.guard';

describe('UnAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnAuthGuardGuard]
    });
  });

  it('should ...', inject([UnAuthGuardGuard], (guard: UnAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
