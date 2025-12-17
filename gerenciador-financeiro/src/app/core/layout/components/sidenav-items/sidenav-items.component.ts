import { Component, computed, inject, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutFacadeService } from '../../../auth/facades/logout-facade.service';
import { LoggedInUserStoreService } from '../../../auth/stores/logged-in-user-store.service';

@Component({
  selector: 'app-sidenav-items',
  imports: [MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private _logoutFacadeService = inject(LogoutFacadeService);
  private _router = inject(Router);
  private _loggedInUserStoreService = inject(LoggedInUserStoreService);
  
  isLoggedIn =  computed(() => this._loggedInUserStoreService.isLoggedIn());
  
  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);

  logout() {
    this._logoutFacadeService.logout()
      .subscribe({
        next: () => this._router.navigate(['./auth/login']),
      })
  }
}
