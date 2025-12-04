import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TransactionsService } from '../../../../../shared/transaction/services/transactions.service';
import { Transaction } from '../../../../../shared/transaction/interfaces/transaction';

export const getTransactionsResolver: ResolveFn<Transaction[]> = (route, state) => {
  const _service = inject(TransactionsService);
  return _service.getAll();
};
