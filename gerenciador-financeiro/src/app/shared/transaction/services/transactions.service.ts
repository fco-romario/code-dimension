import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private _http = inject(HttpClient);
  
  public getAll() {
      return this._http.get<Transaction[]>('/api/transactions');
  }

  public getById(id: string) {
      return this._http.get<Transaction>(`/api/transactions/${id}`);
  }

  post(payload: TransactionPayload) {
    return this._http.post<TransactionPayload>(
      '/api/transactions',
      payload
    );
  }

  put(id: number, payload: TransactionPayload) {
    return this._http.put<TransactionPayload>(
      `/api/transactions/${id}`,
      payload
    );
  }

  delete(id: number) {
    return this._http.delete(`/api/transactions/${id}`);
  }
}
