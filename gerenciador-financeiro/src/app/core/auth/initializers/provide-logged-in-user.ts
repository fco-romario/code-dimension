import { inject, provideAppInitializer } from "@angular/core";
import { tap, switchMap, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { AuthTokenStorageService } from "../services/auth-token-storage.service";
import { LoggedInUserStoreService } from "../stores/logged-in-user-store.service";
import { LoginFacadeService } from "../facades/login-facade.service";

export function provideLoggedInUser() {
    return provideAppInitializer(() => {
        const _authTokenStorageService = inject(AuthTokenStorageService);
        
        if(!_authTokenStorageService.has()) return of();
        
        // const _authService = inject(AuthService);
        // const _loggedInUserService = inject(LoggedInUserStoreService);
        const _loginFacadeService = inject(LoginFacadeService);
        const token = _authTokenStorageService.get() as string;

        return _loginFacadeService.refreshToken(token);
    })
}