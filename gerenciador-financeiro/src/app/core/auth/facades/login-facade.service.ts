import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserCredentials } from '../interfaces/user-credentials';
import { tap, switchMap, Observable, pipe } from 'rxjs';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { User } from '../interfaces/user';
import { AuthTokenResponse } from '../interfaces/auth-token-response';

@Injectable({
  providedIn: 'root',
})
export class LoginFacadeService {
  private readonly _authService = inject(AuthService);
  private readonly _authTokenStorageService = inject(AuthTokenStorageService);  
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);
    
  login(userCredentials: UserCredentials): Observable<User> {
    return this._authService.login(userCredentials).pipe(this.creatUserSession());
  }

  refreshToken(token: string): Observable<User> {
    return this._authService.refreshToken(token).pipe(this.creatUserSession());
  }

  private creatUserSession() {
    return pipe(
      tap((response: AuthTokenResponse) => this._authTokenStorageService.set(response.token)),
      switchMap((response: AuthTokenResponse) => this._authService.getCurrentUser(response.token)),
      tap((user: User) => this._loggedInUserStoreService.setUser(user)),
    );
  }
}
