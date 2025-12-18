import { Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavVisibilityStoreService } from '../stores/sidenav-visibility-store.service';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly _sidenavVisibilityStoreService = inject(SidenavVisibilityStoreService);
  private readonly _mobileLayoutService = inject(MobileLayoutService);

  isMobile = this._mobileLayoutService.isMobile();
  
  
  toggleSidenavVisibility() {
    return this._sidenavVisibilityStoreService.toggle();
  }
}
