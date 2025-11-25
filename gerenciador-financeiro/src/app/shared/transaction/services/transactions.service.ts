import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private _http = inject(HttpClient);
  
  public getAll() {
      return this._http.get<Transaction[]>('http://localhost:3000/transactions');
  }

  post(payload: TransactionPayload) {
    return this._http.post<any>(
      'http://localhost:3000/transactions',
      payload
    );
  }
}
