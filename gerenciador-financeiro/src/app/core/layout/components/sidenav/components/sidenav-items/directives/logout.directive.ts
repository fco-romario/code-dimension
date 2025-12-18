import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutFacadeService } from '../../../../../../auth/facades/logout-facade.service';

@Directive({
  selector: '[appLogout]',
  host: {
    '(click)': 'logout()'
  }
})
export class LogoutDirective {
  private _logoutFacadeService = inject(LogoutFacadeService);
  private _router = inject(Router);

  logout() {
    this._logoutFacadeService.logout()
      .subscribe({
        next: () => this._router.navigate(['./auth/login']),
    })
  }

}
