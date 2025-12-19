import { Component, computed, inject, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutDirective } from './directives/logout.directive';
import { LoggedInUserStoreService } from '@core/auth/stores/logged-in-user-store.service';
import { SidenavVisibilityStoreService } from '@core/layout/components/stores/sidenav-visibility-store.service';

@Component({
  selector: 'app-sidenav-items',
  imports: [MatListModule, RouterLink, RouterLinkActive, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private _loggedInUserStoreService = inject(LoggedInUserStoreService);
  private _sidenavVisibilityStoreService = inject(SidenavVisibilityStoreService);
  
  isLoggedIn =  computed(() => this._loggedInUserStoreService.isLoggedIn());
  
  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);

  closeSidenav() {
    this._sidenavVisibilityStoreService.close();
  }
}
