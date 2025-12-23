import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { CurrencyPipe } from '@angular/common';

const CssClasses = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
}
@Component({
  selector: 'app-transaction-value',
  imports: [CurrencyPipe],
  templateUrl: './transaction-value.html',
  styleUrl: './transaction-value.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'cassClass()'
  }
})
export class TransactionValue {
  transaction = input.required<Transaction>();

  cassClass = computed(() => CssClasses[this.transaction().type])
}
