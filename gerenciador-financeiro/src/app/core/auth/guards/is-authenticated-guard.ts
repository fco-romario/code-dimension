import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoggedInUserService } from '../stores/logged-in-user.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const _loggedInUserService = inject(LoggedInUserService);
  
  if(_loggedInUserService.isLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  
  const urlTree = router.parseUrl('/auth/login');

  return new RedirectCommand(urlTree);
};
