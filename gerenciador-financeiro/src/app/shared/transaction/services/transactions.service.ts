import { HttpClient, HttpParams, httpResource, HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private _http = inject(HttpClient);
  
  public getAll(searchText?: string) {
    let httpParams = new HttpParams();

    if (searchText) {
      httpParams = httpParams.append('q', searchText);
    }

    return this._http.get<Transaction[]>('/api/transactions', { params: httpParams });
  }

  getAllWithHttpResource(searchText: Signal<string>) {
    return httpResource<Transaction[]>(
      () => {
        let httpParams = new HttpParams();
    
        if (searchText()) {
          httpParams = httpParams.append('q', searchText());
        }
    
        return {
          url: '/api/transactions',
          params: httpParams,
        
        } as HttpResourceRequest
      }, {
        defaultValue: [],
      }
    );
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
