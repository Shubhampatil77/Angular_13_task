import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BankService } from 'src/app/Services/bank.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-bottom-sheetaddupdatetransaction',
  templateUrl: './bottom-sheetaddupdatetransaction.component.html',
  styleUrls: ['./bottom-sheetaddupdatetransaction.component.css']
})
export class BottomSheetaddupdatetransactionComponent {
  transactionForm: FormGroup = new FormGroup({});
  hideFields = true; // Set to true to hide the fields

  transactionType: any;
  paymentMode: any; // Change type based on your needs
  amount: any;
  transactionDate: any; // Format as needed
  partyName: any;
  remark: any;
  paymentMethods = []; // Fetch or define your payment methods here
  showChequeAndBankFields = false;
  startDate: string;
  endDate: string;
  clearanceDate: string;
  date: string;
  bank_ac_id: any; // To hold the bank details
  maxDate: string; // Variable to hold today's date
  result: any[] = []; // To hold the passbook results
  paymentModes = [
    { id: 1, value: 'CASH' },
    { id: 3, value: 'UPI' },
    { id: 4, value: 'CHEQUE' },
    { id: 5, value: 'Paytm' },
    { id: 6, value: 'CC/DC' },
    { id: 7, value: 'RTGS/NEFT' },
  ];
  constructor(private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef,  
    private apiService:BankService,
    private bottomsheet: MatBottomSheet,
  @Inject(MAT_BOTTOM_SHEET_DATA) public data: any// Inject your API service
    )
    {
 
      this.bank_ac_id = data.accountId;  // Assign passed data to a local variable
      console.log("Account ID "+this.bank_ac_id)
      
      const today = new Date();
      // Set today's date as end date
      this.endDate = today.toISOString().split('T')[0];

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 89);
      
      this.startDate = yesterday.toISOString().split('T')[0];
      this.clearanceDate = today.toISOString().slice(0, 19).replace('T', ' '); // "2024-10-08 14:30:00
      
      this.maxDate = this.getFormattedDate(new Date());
      // this.maxDate = new Date(); // Current date
      this.date = this.getFormattedDate(today); // Format as YYYY-MM-DD


    this.transactionForm = this.fb.group({
      transaction_type: ['debit',],     
      payment_method_id: [1,''],         
      cheque_no: ['',],                 
      amount: [,Validators.required],                   
      party_name: [''],              
      date: [this.date,''],    
      clearance_date: [this.date,],
      remark: [''],               
      account_id: [this.bank_ac_id],           
      chemist_id: [1056],              
      start_date: [this.startDate], 
      end_date: [this.endDate],
      device_id: [this.apiService.deviceId], 
      accesstoken: [this.apiService.accesstoken] 
    });

  }
  // end_dade should be Todays date, startDate shoule be date which Are selected in the datepikker ,clearanceDate shoule be date which are maullay selecte by he us from the htmk date pikekr same date assgin to date
 
  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');       
    return `${year}-${month}-${day}`;
  }

  onDateInputChange(event: any): void {
    const selectedDate = new Date(event.value);
  
    // Calculate start date (90 days before the selected date)
    const start = new Date(selectedDate);
    start.setDate(selectedDate.getDate() - 90); // Subtract 90 days
  
    // Format the dates as 'YYYY-MM-DD'
    this.startDate = this.getFormattedDate(start);
    const formattedSelectedDate = this.getFormattedDate(selectedDate);
  
    // Patch the values to the form
    this.transactionForm.patchValue({
      start_date: this.startDate, // Set start_date to 90 days before selected date
      date: formattedSelectedDate, // Set date to the selected date
      clearance_date: formattedSelectedDate // Set clearance_date to the selected date
    });
  
    // Logging for debugging
    console.log("Start Date (90 days before):", this.startDate);
    console.log("Selected Date:", formattedSelectedDate);
  }
  
    //  when this wroks i need to fet the date rigt wehn get this dat ei want set this selected date to tow filed date and the clearee daet in from and set start will bw 90 days befoer the selcet d date 
  
  
  ngOnInit() {}

  onPaymentModeChange(event:any) {
    const id = event.value;               
    console.log('Payment mode changed:', event.value);
              
    this.showChequeAndBankFields = id === 4 || id === 7;
    if (!this.showChequeAndBankFields) {
      this.transactionForm.get('cheque_no')?.setValue('');
      this.transactionForm.get('party_name')?.setValue('');
    }
  }

  onSubmit() {
    const confirmation = window.confirm("Are you sure you want to submit the transaction?");
    
    if (confirmation) {
        this.apiService.addOrUpdateBankTransaction(this.transactionForm.value).subscribe(
            response => {
              // console.log(response);
              this.bottomSheetRef.dismiss(response.data); // Pass the response data when dismissing
              // this.result = response.data.passbook_result.results;
                this.bottomSheetRef.dismiss();
            },
            error => {
                console.error('Error adding transaction:', error);
                location.reload();
            }
        );
    } else {
        console.log("Transaction submission canceled.");
    }
}

preventSpace(event: KeyboardEvent) {
  if (event.code === 'Space') {
    event.preventDefault();  // Prevents the space from being entered
  }
}

    closeBottomSheet() {
      this.bottomSheetRef.dismiss();
    }
}
