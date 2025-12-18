import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from "@angular/router";
import { sidenavComponent } from './components/sidenav/sidenav.component';


@Component({
  selector: 'app-layout',
  imports: [Header, sidenavComponent, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
