import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import {FetchBankDetailsPayload, FetchPassbookDetailsPayload, searchBankNamePayload,addOrUpdateBankTransactionPayload, deleteBankTransaction, deleteBankTransactionPDC, deleteBankAccount, bankAccountActiveInactive } from '../Interface/bank.interface';
@Injectable({
  providedIn: 'root'
})
export class BankService {
  private baseUrl = 'https://staging.evitalrx.in:3000/v3/bank';
  refreshToken = "eJwVj12TQzAYhX/RdojVWZc72mrMJoZFwk1HghFera4q8uuX2zPn4znV6jfCkypQPk40NqnCI75HtnTxEXcDT13fOVSr3xZe+io4NTiCDrePhZwS9OP6o0DlIMABcY+G8gp1wUIVtOeZxtmI++WdI5g4SqfSA6P63Up7+siZOUgrVFtel97FKDnZAZrM2jr6ZNebDFGQFjUEeoFQe+5rJn1qEnbZNhck0DBmGu/eOef+zqYL5kxyxUdmGts2NOV2gsRyDeKzSTUxiJpVzpt556ca2yROrCAO1zo8POGjCr3IJR20V7DFsz919GZ/uu+0pt/AurqRPJrYXzX+AxZcaUA="
  accesstoken ="o02eu1alolvojlc2"
  deviceId = 'c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36';

  private accountsSubject = new BehaviorSubject<any[]>([]);
  accounts$ = this.accountsSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  addOrUpdateBankDetails(data: any): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.refreshToken}`, // Pass token in header
      'Content-Type': 'application/json'
    };
    return this.http.post(`${this.baseUrl}/add_update_bank_details`, data,{headers });
  }
  fetchBankDetails(Payload: FetchBankDetailsPayload): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.refreshToken}`, // Pass token in header
      'Content-Type': 'application/json'
    };
    return this.http.post(`${this.baseUrl}/chemist_bank_list`, Payload, { headers });
}
fetchPassbookDetails(Payload: FetchPassbookDetailsPayload): Observable<any> {
  
  var headers = {
    'Authorization': `Bearer ${this.refreshToken}`,
    'Content-Type': 'application/json'
  };

  return this.http.post(`${this.baseUrl}/passbook`, Payload, { headers });
}

addOrUpdateBankTransaction(data: any): Observable<any> {
  
  const headers = {
    'Authorization': `Bearer ${this.refreshToken}`,
    'Content-Type': 'application/json'
  };

  return this.http.post(`${this.baseUrl}/add_update_bank_transaction`, data, { headers });
}

searchBank(Payload: searchBankNamePayload): Observable<any> {

  const url = `${this.baseUrl}/search`; 
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.refreshToken}` // If needed, add the bearer token
  });

  return this.http.post<any>(url, Payload, { headers });
}

deleteTransaction(Payload: deleteBankTransaction): Observable<any> {

  const url = `${this.baseUrl}/delete_transaction`; 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.refreshToken}`, // If required by API
    'Content-Type': 'application/json'
  });

  // Send POST request to delete the transaction
  return this.http.post<any>(url, Payload, { headers });
}
deleteTransactionPDC(Payload: deleteBankTransactionPDC): Observable<any> {

  const url = `${this.baseUrl}/delete_pdc`; 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.refreshToken}`, // If required by API
    'Content-Type': 'application/json'
  });

  // Send POST request to delete the transaction
  return this.http.post<any>(url, Payload, { headers });
}

  activeInactiveBankAccount(Payload: bankAccountActiveInactive): Observable<any> {
    const url = `${this.baseUrl}/active_inactive`;
    
    // Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.refreshToken}`
    });
    return this.http.post(url, Payload, { headers });
  }
}

