import { inject, Injectable } from '@angular/core';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutFacadeService {
  private readonly _authService = inject(AuthService);  
  private readonly _authTokenStorageService = inject(AuthTokenStorageService);  
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);

  logout() {
    return this._authService.logout()
      .pipe(
        tap(() => this._authTokenStorageService.remove()),
        tap(() => this._loggedInUserStoreService.logout()),
      )
  }
}
