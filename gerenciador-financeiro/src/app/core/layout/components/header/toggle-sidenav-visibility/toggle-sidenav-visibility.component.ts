import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';
import { SidenavVisibilityStoreService } from '../../stores/sidenav-visibility-store.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-sidenav-visibility',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toggle-sidenav-visibility.component.html',
  styleUrl: './toggle-sidenav-visibility.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSidenavVisibilityComponent {
  private readonly _sidenavVisibilityStoreService = inject(SidenavVisibilityStoreService);
  private readonly _mobileLayoutService = inject(MobileLayoutService);

  isMobile = this._mobileLayoutService.isMobile();
  
  
  toggleSidenavVisibility() {
    return this._sidenavVisibilityStoreService.toggle();
  }
}
