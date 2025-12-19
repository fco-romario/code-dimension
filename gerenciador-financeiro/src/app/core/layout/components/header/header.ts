import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToggleSidenavVisibilityComponent } from "./toggle-sidenav-visibility/toggle-sidenav-visibility.component";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, ToggleSidenavVisibilityComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
