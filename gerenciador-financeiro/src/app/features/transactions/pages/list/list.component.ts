import { Component, inject, input, linkedSignal, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { MatButtonModule } from '@angular/material/button';
import { NoTransaction } from './components/no-transaction/no-transaction';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';
import { SearchComponent } from "./components/search/search.component";

@Component({
  selector: 'app-list',
  imports: [
    TransactionItem,
    NoTransaction,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
    SearchComponent
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit{
  private _transactionsService = inject(TransactionsService);
  private _router = inject(Router);
  private _feedbackService = inject(FeedbackService);
  private _confirmationDialogService = inject(ConfirmationDialogService);
  private _activatedRoute = inject(ActivatedRoute);

  transactions = input.required<Transaction[]>();

  items = linkedSignal(() => this.transactions());

  searchText = signal('');

  ngOnInit(): void { }

  edit(transaction: Transaction) {
    this._router.navigate(['edit', transaction.id], { relativeTo: this._activatedRoute });
  }

  remove(transaction: Transaction) {
    this._confirmationDialogService.open(
      {
        title: 'Deletar transação',
        message: 'Tem certeza que deseja deletar essa transação?',
      }
    ).subscribe({      
      next: () => {
        this._transactionsService.delete(transaction.id).subscribe({
          next: () => {
            this.removeTransactionFromArray(transaction);
            this._feedbackService.success('Transação removida com sucesso!');
          },
          error: () => {
            this._feedbackService.error('Erro ao remover transação!');
          }
        });
      }
    });
  }

  private removeTransactionFromArray(transaction: Transaction) {
    // const transactionsFiltered = this.transactions().filter(item => item.id !== transaction.id);
    // this.transactions.set(transactionsFiltered);
    this.items.update(transactions => transactions.filter(item => item.id !== transaction.id));
  }
}

