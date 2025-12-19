import { ResolveFn } from '@angular/router';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { inject } from '@angular/core';

export const getTransactionByIdResolver: ResolveFn<Transaction> = (route, state) => {
  const transactionsService = inject(TransactionsService);
  const ID = route.params['id'];

  return transactionsService.getById(ID);
};
