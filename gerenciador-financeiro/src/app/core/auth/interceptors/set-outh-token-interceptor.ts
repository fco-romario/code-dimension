import { HttpInterceptorFn } from '@angular/common/http';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { inject } from '@angular/core';

export const setOuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loggedInUserStoreService = inject(LoggedInUserStoreService);

  if(!loggedInUserStoreService.isLoggedIn()) {
    return next(req);
  }
  const authTokenStorageService = inject(AuthTokenStorageService);
  const token =  authTokenStorageService.get();

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(newReq);
};
