import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';
import { SidenavVisibilityStoreService } from '../stores/sidenav-visibility-store.service';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class sidenavComponent {
  private readonly _mobileLayoutService = inject(MobileLayoutService);
  private readonly _sidenavVisibilityStoreService = inject(SidenavVisibilityStoreService);

  private readonly isMobile = this._mobileLayoutService.isMobile();

  sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');

  isSidenavOpened = computed(() => {
    if(!this.isMobile()) {
      return true
    }

    return this._sidenavVisibilityStoreService.isVisible();
  });
}
