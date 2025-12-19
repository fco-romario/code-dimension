import { Component, input, linkedSignal, OnInit } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { MatButtonModule } from '@angular/material/button';
import { Balance } from './components/balance/balance';

@Component({
  selector: 'app-home',
  imports: [
    Balance,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  transactions = input.required<Transaction[]>();

  // items = linkedSignal(() => this.transactions());

}

