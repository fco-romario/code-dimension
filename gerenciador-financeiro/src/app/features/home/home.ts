import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { NoTransaction } from './components/no-transaction/no-transaction';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TransactionsService } from '../../shared/transaction/services/transactions.service';

@Component({
  selector: 'app-home',
  imports: [
    Balance,
    TransactionItem,
    NoTransaction,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _transactionsService = inject(TransactionsService);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
   this.getAllTransactions();
  }

  private getAllTransactions() {
    this._transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      }
    });
  }
}