import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HumanizeCurrencyPipe } from './pipes/humanize-currency-pipe';

type CardType = 'income' | 'outcome' | 'balance';
type ValueCssClass = 'income' | 'outcome' | 'zero';


// Exemplo usando enum:
// enum ValueCssClass {
//   INCOME = 'income',
//   OUTCOME = 'outcome',
// }

// ValueCssClass.INCOME

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule, HumanizeCurrencyPipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceCard {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssClass>(() => {
    if(this.type() === 'income') {
      return 'income';
    } 
    
    if(this.type() === 'outcome') {
      return 'outcome';
    }

    if(this.value() === 0) {
      return 'zero';
    }

    return this.value() > 0 ? 'income' : 'outcome';
  });
}
