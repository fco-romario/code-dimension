import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/interfaces/transaction';
import { TransactionType } from '../../shared/enums/transaction-type';
import { NoTransaction } from './components/no-transaction/no-transaction';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransaction],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions = signal<Transaction[]>([
    // { title: 'Salário', value: 100, type: TransactionType.INCOME },
    // { title: 'VA', value: 50, type: TransactionType.INCOME },
    // { title: 'Aluguel', value: 150, type: TransactionType.OUTCOME },
  ]);
}
