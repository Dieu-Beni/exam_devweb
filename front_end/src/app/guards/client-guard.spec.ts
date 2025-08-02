import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { clientGuard } from './client-guard';

describe('clientGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
