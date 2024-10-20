import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddExpensePayload, AddExpenseResponse, DeleteExpensePayload, DeleteExpenseResponse, GetExpenseResponse } from '../interfaces/expense.interace';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'https://staging.evitalrx.in:3000/v3/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(payload: any): Observable<GetExpenseResponse> {
    return this.http.post<GetExpenseResponse>(`${this.apiUrl}/list`, payload);
  }

  deleteExpense(payload: DeleteExpensePayload): Observable<DeleteExpenseResponse> {
    return this.http.post<DeleteExpenseResponse>(`${this.apiUrl}/delete`, payload);
  }
  
  addExpense(payload: AddExpensePayload): Observable<AddExpenseResponse> {
    return this.http.post<AddExpenseResponse>(`${this.apiUrl}/add`, payload);
}
}