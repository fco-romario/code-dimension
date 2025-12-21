import { Component, computed, input, linkedSignal, OnInit, signal } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { MatButtonModule } from '@angular/material/button';
import { Balance } from './components/balance/balance';
import { PieChartComponent } from './components/charts/pie/pie-chart.component';
import { PieChartConfig } from './components/charts/pie/pie-chart-config.interface';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    Balance,
    MatButtonModule,
    PieChartComponent,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  transactions = input.required<Transaction[]>();
  
  canLoadComponent = signal(false);

  totalIncomes = computed(() => {
      return sumTransactions(this.transactions(), TransactionType.INCOME);
    })
  
  totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);
  })

  // items = linkedSignal(() => this.transactions());
  chartConfig = computed<PieChartConfig>(() => {
    return {
      labels: ['Ganhos', 'Gastos'],
      dataLabel: 'valor total',
      data: [this.totalIncomes(), this.totalOutcomes()]
    }
  });

}

