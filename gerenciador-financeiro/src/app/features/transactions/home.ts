import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionItem } from './pages/list/components/transaction-item/transaction-item';
import { NoTransaction } from './pages/list/components/no-transaction/no-transaction';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { TransactionsContainerComponent } from './pages/list/components/transactions-container/transactions-container.component';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';

@Component({
  selector: 'app-home',
  imports: [
    TransactionItem,
    NoTransaction,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _transactionsService = inject(TransactionsService);
  private _router = inject(Router);
  private _feedbackService = inject(FeedbackService);
  private _confirmationDialogService = inject(ConfirmationDialogService);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
   this.getAllTransactions();
  }

  edit(transaction: Transaction) {
    this._router.navigate(['/edit', transaction.id]);
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
    this.transactions.update(transactions => transactions.filter(item => item.id !== transaction.id));
  }

  private getAllTransactions() {
    this._transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
      error: () => {
        this._feedbackService.error('Erro ao remover transação!');
      }
    });
  }
}