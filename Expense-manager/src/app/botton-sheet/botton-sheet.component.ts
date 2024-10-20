import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef,} from '@angular/material/bottom-sheet';
import { MatSelectChange } from '@angular/material/select'; // Import MatSelectChange
import { SharedServiceService } from '../Service/shared-service.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-botton-sheet',
  templateUrl: './botton-sheet.component.html',
  styleUrls: ['./botton-sheet.component.css']
})
export class BottonSheetComponent implements OnInit {
  submitted: boolean = false; // Track if the form has been submitted

  addExpenseForm!: FormGroup;
  gstForm!: FormGroup;

  showGSTFields: boolean = true;
  showChequeAndBankFields = false;
  accessToken='mgkvooqxj8x2jkll';
  refreshtoken ='eJwdj8FygjAARL+oDgYo5dhBG5MxYbRKAheHBLSBCLGAQr6+0PPuvnlbTvhHQKlihdHZojVVqEPN0ZcReke14UmEw1U54SqHSZ9z6nCga1S1I9mcwT7CnQCFETrUojmaYqevOTuouNq+6Cnt0H18ZkAPHCRDAbVTfs/QO20ztjbSPah5bwv45RScLAKvjPl1zvwGqZdKGa0yTuc8/M2Yt+R9BnogQDiWsPXKDX7kYOyWroTJJJi2EuinaGaW7ouZbVL+7+KSSrrx6XMidnFKvOUcOcmJWumTzc3SxlltAxQEZn+LrhNRzoeOSxdfWpsiskP+eXg0dXp58+IOGvQHAgdpkw=='

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
  paymentModes = [
    { id: 1, value: 'CASH' },
    { id: 3, value: 'UPI' },
    { id: 4, value: 'CHEQUE' },
    { id: 5, value: 'Paytm' },
    { id: 6, value: 'CC/DC' },
    { id: 7, value: 'RTGS/NEFT' },
  ];
  ngOnInit(): void {
    // const currentDate = moment().format('YYYY-MM-DD'); // Format the date correctly
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD format
 
    this.addExpenseForm = this.fb.group({
      invoicePhoto: File,
      category_id: ['', Validators.required],
      expense_date: [formattedDate, Validators.required,],
      payment_date: [formattedDate, Validators.required,],
      payment_method_id: [1],
      chemist_id:[1005],
      amount: ['',Validators.required],
      totalamount: [''],
      reference_no:[''], 
      remark: ['',this.textOnlyValidator],
      account_id: [1],
      gstOption: ['withoutGST'], 
      gstPercent:['',this.gstPercentValidator()],
      gstnNumber:['',this.gstnNumberValidator()],
      partyName: ['',this.textOnlyValidator()],
      cheque_date: [formattedDate],
      bankaccount: [''],
      transaction_type:['expense'],
      accesstoken: this.accessToken,
      device_id: "c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36"

    });
    
    this.onGSTOptionChange('withoutGST'); // Initialize without GST fields


  }
  onGSTOptionChange(gstOption: string): void {
    if (gstOption === 'withGST') {
      this.showGSTFields = true;

      // Add validation for GST fields when 'With GST' is selected
      this.addExpenseForm.get('gstPercent')?.setValidators([Validators.required,this.gstPercentValidator()],);
      this.addExpenseForm.get('gstnNumber')?.setValidators([Validators.required,this.gstnNumberValidator()]);
    } else {
      this.showGSTFields = false;

      // Remove validation and clear GST field values when 'Without GST' is selected
      this.addExpenseForm.get('gstPercent')?.clearValidators();
      this.addExpenseForm.get('gstnNumber')?.clearValidators();
      this.addExpenseForm.get('gstPercent')?.setValue('');
      this.addExpenseForm.get('gstnNumber')?.setValue('');
    }

    // Update the validity of the form controls after changing the validators
    this.addExpenseForm.get('gstPercent')?.updateValueAndValidity();
    this.addExpenseForm.get('gstnNumber')?.updateValueAndValidity();
  }

  // onGSTOptionChange(value: string): void {
  //   if (value == 'withoutGST') {
  //   } 
  // }


  constructor(private _bottomSheetRef: MatBottomSheetRef<BottonSheetComponent>,private http: HttpClient,
    private fb: FormBuilder,private share:SharedServiceService,  private toastr: ToastrService) {}
  open:any
  //open botton shit
  
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();

  }

  

  addExpense(){
    this.submitted = true; 
    if (this.addExpenseForm.invalid) {
      this.addExpenseForm.markAllAsTouched(); // Trigger validation errors

      if (this.addExpenseForm.get('category_id')?.hasError('required')) {
        this.toastr.warning('Please select at least 1 category', 'Warning');
      }
    }
    console.log(this.addExpenseForm)
    if (this.addExpenseForm.valid) {
      const formData = this.addExpenseForm.value;
      const url = 'https://staging.evitalrx.in:3000/v3/expenses/add';
  
      const headers = {
        Authorization: `Bearer ${this.refreshtoken}`,
        'Content-Type': 'application/json',
      };
      this.http.post(url, formData, { headers }).subscribe(response => {
        // console.log('Expense added successfully:', response);

        this.toastr.success('Expense added successfully', 'Success');
        this.share.getExpenselist();
        this.closeBottomSheet();
      }, error => {
        console.error('Error occurred while adding expense:', error);
        this.toastr.error('Failed to add expense. Please try again', 'Error');
      });

    } 
  }
   
  

 
  onPaymentModeChange(event: MatSelectChange) {
    const id = event.value;                             
    this.showChequeAndBankFields = id === 4 || id === 7;
    if (!this.showChequeAndBankFields) {
      this.addExpenseForm.get('cheque_date')?.setValue('');
      this.addExpenseForm.get('bankaccount')?.setValue('');
    }
  }

  // noFutureDateValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const today = new Date();
  //     const selectedDate = new Date(control.value);
  //     return selectedDate <= today ? null : { futureDate: true };
  //   };
  // }

  textOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(control.value) ? null : { textOnly: true };
    };
  }

  calculateTotal() {
    const gstPercent = this.addExpenseForm.get('gstPercent')?.value;
    const amount = this.addExpenseForm.get('amount')?.value;
    if (gstPercent !== null && amount !== null) {
      const total = parseFloat(amount) + (parseFloat(amount) * gstPercent / 100);
      this.addExpenseForm.get('totalamount')?.setValue(Math.round(total), { emitEvent: false }); // Rounding to nearest integer
    }
  }

  gstPercentValidator(): ValidatorFn {
    const validValues = [0, 5, 12, 18, 28];
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      return validValues.includes(value) ? null : { invalidGstPercent: { value } };
    };
  }


  gstnNumberValidator(): ValidatorFn {
    const gstnRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      return gstnRegex.test(value) ? null : { invalidGstnNumber: { value } };
    };
  } 
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.addExpenseForm.patchValue({
      invoicePhoto: file
    });
    this.addExpenseForm.get('invoicePhoto')?.updateValueAndValidity();
  }
  


  closeBottomSheet(): void {
    this._bottomSheetRef.dismiss();
  }

}