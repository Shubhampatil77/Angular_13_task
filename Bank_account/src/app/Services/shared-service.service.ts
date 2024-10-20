import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankService } from './bank.service'; // Import your existing BankService
import { FetchBankDetailsPayload } from '../Interface/bank.interface'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // BehaviorSubject to hold and share bank details across components
  private bankDetailsSource = new BehaviorSubject<boolean>(false);
  bankDetails$ = this.bankDetailsSource.asObservable(); // Observable for components to subscribe to

  constructor(private bankService: BankService) {}

  data:any
  private refreshlist = new BehaviorSubject<boolean>(false);
  Expenselist$ = this.refreshlist.asObservable();


  private dataSubject = new BehaviorSubject<any[]>([]);
  currentData = this.dataSubject.asObservable();



  getbanklist() {
    this.bankDetailsSource.next(true);
  }
  
  getbanks() {
    return this.bankService.fetchBankDetails(this.data);
  }

  setData(dataSource: any[]) {
    this.dataSubject.next(dataSource);
  }

  getData() {
    return this.dataSubject.value;
  }
}