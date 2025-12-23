import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { AuthTokenResponse } from '../../interfaces/auth-token-response';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCredentials } from '../../interfaces/user-credentials';
import { AuthTokenStorageService } from '../../services/auth-token-storage.service';
import { pipe, switchMap, tap } from 'rxjs';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store.service';
import { LoginFacadeService } from '../../facades/login-facade.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  // private _authService = inject(AuthService);
  private _router = inject(Router);
  // private _authTokenStorageService = inject(AuthTokenStorageService);
  // private _loggedInUserStoreService = inject(LoggedInUserStoreService);
  private _loginFacadeService = inject(LoginFacadeService);

  form = new FormGroup({
      user: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required]}),
  });
  
  submit() {
    if(this.form.invalid) return;

    const payload: UserCredentials = {
      user: this.form.value.user as string,
      password: this.form.value.password as string
    }
    
    this._loginFacadeService.login(payload)
      .subscribe({
        next: () =>  this._router.navigate(['/']),
        error: (error: HttpErrorResponse) => {
          if(error.status === 401) {
            this.form.setErrors({
              wrongCredentials: true
            })
          }
        }
      });
  }
}
