import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from './auth.guard.spec';

describe('AuthGuard', () => {

  let guard: AuthGuard;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: {}
        },
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true
          }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});