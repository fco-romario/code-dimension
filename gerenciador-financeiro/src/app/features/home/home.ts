import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { NoTransaction } from './components/no-transaction/no-transaction';
import { TransactionsService } from '../../shared/transaction/services/transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransaction],
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