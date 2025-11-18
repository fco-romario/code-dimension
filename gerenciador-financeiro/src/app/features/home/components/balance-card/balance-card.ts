import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CardType = 'income' | 'outcome' | 'balance';
type ValueCssClass = 'income' | 'outcome';


// Exemplo usando enum:
// enum ValueCssClass {
//   INCOME = 'income',
//   OUTCOME = 'outcome',
// }

// ValueCssClass.INCOME

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
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

    return this.value() > 0 ? 'income' : 'outcome';
  });
}
