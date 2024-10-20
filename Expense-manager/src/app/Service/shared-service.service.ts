import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseService } from './expense.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  data:any

   private refreshlist = new BehaviorSubject<boolean>(false);
   Expenselist$ = this.refreshlist.asObservable();
 
   constructor() { }
 
   getExpenselist() {
    console.log("exp...call")
     this.refreshlist.next(true);
   }
   }