import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottonSheetComponent } from '../botton-sheet/botton-sheet.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenseService } from '../Service/expense.service';
import { DeleteExpensePayload, DeleteExpenseResponse, Expense, GetExpenseResponse } from '../interfaces/expense.interace';
import * as moment from 'moment';
import { BottonSheet2Component } from '../botton-sheet2/botton-sheet2.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.css']
})
export class ManageExpenseComponent implements OnInit  {

  accesstoken = 'mgkvooqxj8x2jkll';
  chemist_id = 1056; 
  device_id = 'c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36';

  dataSource: Expense[] = [];
  addExpenseForm!: FormGroup;
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sort order
  sortField: string = ''; // Field to be sorted
  isLoading = true;
  errorMessage = '';
  expenses: any[] = [];
  categories:any[]=[];
  total:any;
  total_amount:any;
  total_income:any;
  paymentMethods: any[]=[];
  pharmacyName: string | null = null; 
  city: string | null = null; 

  alwaysShowCalendars: boolean;
  
  selected: any;
    ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    };
    
    invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
  return this.invalidDates.some(d => d.isSame(m, 'day'));
  };

  radioOptions = [
    { id: 1, label: 'Bank Fee and Charges' },
    { id: 2, label: 'Employee Salaries & Advances' },
    { id: 3, label: 'Printing and Stationery' },
    { id: 4, label: 'Raw Material' },
    { id: 5, label: 'Rent or Mortgage Payments' },
    { id: 6, label: 'Repair & Maintenance' },
    { id: 7, label: 'Utilities & Phone' },
    { id: 8, label: 'Taxes/Licenses/Fees' },
    { id: 9, label: 'Food & Beverage' },
    { id: 10, label: 'Session Cash Difference' },
    { id: 11, label: 'Others' }
  ];
  ngOnInit(): void {
    // this.fetchExpenses();

    this.loadPharmacyDetails(); 
    if (!this.pharmacyName || !this.city) {
      this.router.navigate(['/login']); 
      alert('Please log in to access this page');
      return;
    }
        this.onDateRangeSelected(this.selected);
  }

  constructor(private bottomSheet: MatBottomSheet,private fb: FormBuilder,
     private expenseService: ExpenseService,private router: Router) 
      {
    this.createForm();   
      this.alwaysShowCalendars = true;
      this.selected = {
        startDate: moment(),
        endDate: moment()
      };
  }

  createForm(): void {
    const currentDate = new Date();    
    const acountid = 1; // Replace with actual account ID.
    this.addExpenseForm = this.fb.group({
      start_date: [''], 
      end_date: [''],    
      accesstoken: ['mgkvooqxj8x2jkll'], // Your access token
      chemist_id: [1056],
      device_id: ['c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36'],
      // Add other fields as necessary

      category_id:['All'],
      orderby:[''],
      search_by_entity_id:[''],
      account_id: [acountid],
      payment_method_id: [''],
      reference_no: [''],
      bankaccount: [''],
      expense_date: [''],
      payment_date: [currentDate],
     
    });
  }

  onDateRangeSelected(event: any): void {
    console.log('Date range selected:', event); // Log event for debugging
    if (event && event.startDate && event.endDate) {
      const startDateFormatted = event.startDate.format('YYYY-MM-DD');
      const endDateFormatted = event.endDate.format('YYYY-MM-DD');
      this.addExpenseForm.patchValue({
        start_date: startDateFormatted,
        end_date: endDateFormatted
      });

      console.log('Form patched:', this.addExpenseForm.value); // Log form value for debugging

      // Call fetchExpenses after patching the form values
      this.fetchExpenses();
    }
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
    }
    this.fetchExpenses();
  }


  fetchExpenses(): void {
    const formValue = this.addExpenseForm.value;
    const payload = {
      accesstoken: formValue.accesstoken,
      chemist_id: formValue.chemist_id,
      device_id: formValue.device_id,
      start_date: formValue.start_date,
      end_date: formValue.end_date,
      export: 0,
      page: 1,
      orderby: this.sortField,
      order: this.sortOrder,
      search_by_entity_id: 0,
      transaction_type: '',
      payment_method_id: formValue.payment_method_id || '' ,
      category_id: 0 // Provide a default value for category_id
    };
    if (formValue.category_id !== 'All') {
      payload.category_id = formValue.category_id;
  }

  if (formValue.payment_method_id && formValue.payment_method_id !== 'all') {
    payload.payment_method_id = formValue.payment_method_id;
  } else {
    delete payload.payment_method_id;  // If "All" is selected, don't filter by payment method
  }
  
  this.expenseService.getExpenses(payload).subscribe(
    (data: GetExpenseResponse) => {
      this.isLoading = false;
      console.log('Full API response:', data);

      if (data.status_code === '1') {
        this.expenses = data.data.results; 
        this.dataSource = data.data.results;
        this.categories = data.data.expense_categories;
        this.paymentMethods = data.data.payment_methods;
        this.total = data.data.total_expense;
        this.total_amount = data.data.total_amount;
        this.total_income = data.data.total_income;
        this.paymentMethods = data.data.payment_methods;  // Store the available payment methods
       
        if (this.expenses.length > 0) {
          const pharmacyName = this.expenses[0].pharmacy_name;
          const city = this.expenses[0].city;
    
          // Save to local storage
          localStorage.setItem('pharmacyName', pharmacyName);
          localStorage.setItem('city', city);
         
        }
        console.log('Expenses list:', data.data.results);

      } else {
        this.errorMessage = 'Failed to fetch expenses';
        console.log('Error message:', data.status_message);

      }
    },
    (error) => {
      this.isLoading = false;
      this.errorMessage = 'An error occurred while fetching expenses';
      console.error('Error fetching expenses:', error);
      
    }
  );
}

loadPharmacyDetails(): void {
  this.pharmacyName = localStorage.getItem('pharmacyName');
  this.city = localStorage.getItem('city');
}

logout(): void {
  localStorage.removeItem('pharmacyName');
  localStorage.removeItem('city');

  this.router.navigate(['/login']); 
  alert('You have been logged out');
}


getCategoryName(categoryId: number): string {
  if (!this.categories) {
    return 'Unknown Category'; // Handle the case where categories is undefined
  }

  const category = this.categories.find(cat => cat.id === categoryId);
  return category ? category.category : 'Unknown Category';
}

deleteExpense(expenseId: number): void {
  const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
  
  if (confirmDelete) {
    const payload: DeleteExpensePayload = {
      accesstoken: this.accesstoken,
      chemist_id: this.chemist_id,
      device_id: this.device_id,
      expense_id: expenseId
    };

    this.expenseService.deleteExpense(payload).subscribe(
      (response: DeleteExpenseResponse) => {
        if (response.status_code === "1") {
          // Successfully deleted the expense
          console.log('Expense deleted:', response);
          this.fetchExpenses();  // Refresh the expense list after deletion
        } else {
          console.error('Error deleting expense:', response.status_message);
        }
      },
      (error) => {
        console.error('Error deleting expense:', error);
      }
    );
  }
}




  openBottomSheet(): void {
    this.bottomSheet.open(BottonSheetComponent,{
      panelClass: 'custom-width'

    }); 

  }


 openBottomSheet2(): void {
  const bottomSheet = this.bottomSheet.open(BottonSheet2Component, {
    data: { paymentMethods: this.paymentMethods },  // Pass payment methods to the bottom sheet
    panelClass: 'custom-css'
  });

  bottomSheet.afterDismissed().subscribe((selectedMethodId: number) => {
    if (selectedMethodId) {
      // Apply the selected payment method to the form and re-fetch the filtered data
      this.addExpenseForm.patchValue({ payment_method_id: selectedMethodId });
      this.fetchExpenses();  // Fetch expenses based on the selected payment method
    }
  });
}

    
  getPaymentMethodName(paymentMethodId: number): string {
    const method = this.paymentMethods.find(method => method.id === paymentMethodId);
    return method ? method.method_name : 'Unknown Method';
  }
  
   

}
