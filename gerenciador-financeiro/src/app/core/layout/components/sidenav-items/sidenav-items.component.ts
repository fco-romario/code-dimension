import { Component, computed, inject, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutFacadeService } from '../../../auth/facades/logout-facade.service';
import { LoggedInUserStoreService } from '../../../auth/stores/logged-in-user-store.service';
import { LogoutDirective } from './directives/logout.directive';

@Component({
  selector: 'app-sidenav-items',
  imports: [MatListModule, RouterLink, RouterLinkActive, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private _loggedInUserStoreService = inject(LoggedInUserStoreService);
  
  isLoggedIn =  computed(() => this._loggedInUserStoreService.isLoggedIn());
  
  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);


}
