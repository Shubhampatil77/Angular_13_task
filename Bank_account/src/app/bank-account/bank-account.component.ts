import { Component, OnInit } from '@angular/core';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BankService } from '../Services/bank.service';
import { deleteBankTransaction, deleteBankTransactionPDC, FetchBankDetailsPayload, FetchPassbookDetailsPayload, Transaction } from '../Interface/bank.interface';
import { BottomSheetaddupdatetransactionComponent } from '../BottomSheet/bottom-sheetaddupdatetransaction/bottom-sheetaddupdatetransaction.component';
import * as moment from 'moment';
import { SharedService } from '../Services/shared-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit{
  banks: any[] = []; // Replace 'any' with your actual bank type if you have one
    // passbook_pdc_Details: any[] = []; // Similarly for transactions

  bankDetails: any[]=[];
  data :any;
  addExpenseForm!: FormGroup;
  transactions: any[] = []; // To hold fetched transactions
  accountDetails: { account_number: string; bank_name: string }[] = [];
  accountId: string[] = []; // Array to hold account numbers
  passbookDetails: any[] = []; // To hold the passbook results
  passbook_pdc_Details:any[]=[];
  total:any[]=[];
  totalAltra:any[]=[];
  bank_id:any
  account_number:any
  status: any;
  accountNumbers: string[] = []; // Array to hold account numbers
  accountNames:string[]=[];
  selectedAccountId: string | null = null;  // Instead of number | null
  accountNumber :any[]=[];

  startDate: string;
  endDate: string;
  clearanceDate: string;
  date: string;
  current_bal:any;
  total_credit:any
  total_debit:any
  total_debit_pdc:any
  alwaysShowCalendars: boolean;
  selected = {
    startDate: moment().subtract(89, 'days'),
    endDate: moment()
  };
  endDateFormatted :any
  startDateFormatted:any;
  searchDescription: string = ''; // Initialize the search description
  searchRemarks:string='';
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sort order
  sortField: string = ''; // Field to be sorted
  ranges: any = {
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'Last 90 Days': [moment().subtract(89, 'days'), moment()],
    'Current Fiscal Year': [moment().startOf('year'), moment()],
    'Previous Fiscal Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
  };
    invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

    isInvalidDate = (m: moment.Moment) => {
      return this.invalidDates.some(d => d.isSame(m, 'day'));
      };

  constructor(private fb: FormBuilder,private bottomsheet: MatBottomSheet, private bankService:BankService, private sharedService :SharedService){

    this.sortField = 'clearance_date'; // Initial sort field
    this.sortOrder = 'desc'; // Start with ascending order
    this.alwaysShowCalendars = true;
    this.selected = {
      startDate: moment().subtract(89, 'days'),
      endDate: moment()
    };
    const today = new Date();
    
    this.endDate = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    this.startDate = yesterday.toISOString().split('T')[0];
    this.clearanceDate = today.toISOString().slice(0, 19).replace('T', ' '); // "2024-10-08 14:30:00
    this.date = today.toISOString().split('T')[0]; // "2024-10-08"

  }
  ngOnInit(): void {
    console.log('ngOnInit called');
    this.initializeForm();
    this.selected = {
      startDate: moment().subtract(89, 'days'),
      endDate: moment()
  };
  this.onDateRangeSelected(this.selected);
  this.Fetchdetails(); 
  this.sharedService.setData(this.bankDetails);
  this.sharedService.bankDetails$.subscribe(() => {
      // this.onDateRangeSelected(this.selected); // Ensure this.selected has proper startDate and endDate
  });

  }
  initializeForm(): void {
    this.addExpenseForm = this.fb.group({
      expense_date: ['',],
      // Add other form controls as needed
    });
    console.log(this.addExpenseForm)

  }

  onDateRangeSelected(event: any) {
    console.log('Date range selected From Function:', event); // Log event for debugging
    if
     (event && event.startDate && event.endDate) 
      {
         this.startDateFormatted = event.startDate.format('YYYY-MM-DD');
        this.endDateFormatted = event.endDate.format('YYYY-MM-DD');
        
        // Call fetchPassbookDetails with the selected date range
        if (this.selectedAccountId) {
            this.fetchPassbookDetails(this.selectedAccountId, this.startDateFormatted, this.endDateFormatted);
        } else {
            console.warn('No account selected for date range filter');
        }
    }
  }

sortByClearanceDate() {
  this.sortField = 'clearance_date';
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; 

  this.fetchSortedPassbookDetails();
}

sortByChequeDate() {
  this.sortField = 'cheque_date';
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle order

  this.fetchSortedPassbookDetails();
}

fetchSortedPassbookDetails() {
  if (this.selectedAccountId) {
      this.fetchPassbookDetails(
          this.selectedAccountId,
          this.startDateFormatted, // Keep startDate constant
          this.endDateFormatted,   // Keep endDate constant
          this.searchRemarks
      );
  } else {
      console.warn('No account selected for fetching passbook details');
  }
}

  
onSearch() {
  this.startDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
  this.endDate = moment().add(1, 'days').format('YYYY-MM-DD');
  this.fetchPassbookDetails(this.selectedAccountId, this.startDate, this.endDate, this.searchRemarks);
}
Fetchdetails() {
  const payload: FetchBankDetailsPayload = {
    accesstoken: this.bankService.accesstoken, // Use the service's access token
    chemist_id: 1056, // Adjust as necessary
    device_id: this.bankService.deviceId, // Use the service's device ID
    orderby: "clearance_date",
    order: "desc",
    start_date: moment().subtract(90, 'days').format('YYYY-MM-DD'),
    end_date:moment().format('YYYY-MM-DD'), // Default to today
    page: 1,
  };

  this.bankService.fetchBankDetails(payload).subscribe(
    (response) => {
      if (response && response.data && response.data.results) {
        this.bankDetails = response.data.results;

        if (this.bankDetails.length > 0) {
          this.selectedAccountId = this.bankDetails[0].id; // Automatically select the first account's ID
        } else {
          this.selectedAccountId = null; // Set to null if no accounts
        }

        console.log("Selected Account ID on Bank List API:", this.selectedAccountId);

        // Set passbook and PDC details only for the selected account
        if (this.bankDetails[0].passbook_details && this.bankDetails[0].passbook_details.results.length > 0) {
          this.passbookDetails = this.bankDetails[0].passbook_details.results;
          this.total_credit = this.bankDetails[0].passbook_details.total_records[0].total_credit;
          this.total_debit = this.bankDetails[0].passbook_details.total_records[0].total_debit;
          this.current_bal = this.bankDetails[0].balance;  // Set balance
        } else {
          console.warn("Passbook details or results are missing for this account");
        }

        if (this.bankDetails[0].upcoming_pdc_details && this.bankDetails[0].upcoming_pdc_details.results.length > 0) {
          this.passbook_pdc_Details = this.bankDetails[0].upcoming_pdc_details.results;
          this.total_debit_pdc = this.bankDetails[0].upcoming_pdc_details.total_records[0].total_debit;
        } else {
          console.warn("Upcoming PDC details or results are missing for this account");
        }
      } else {
        console.warn('Unexpected response structure:', response); // Log unexpected structures
      }
    },
    (error) => {
      console.error('Error fetching bank details:', error); // Log any errors
    }
  );
}

extractAccountNumbers(): void {
  this.accountNumbers = this.bankDetails.map(detail => detail.account_number);
  this.accountNames = this.bankDetails.map(detail => detail.bank_name);
  this.accountId = this.bankDetails.map(detail => detail.id);
  this.selectedAccountId = this.accountNumber[0]; // Storing the first account number ('1111111111')

}
fetchPassbookDetails(account: any, startDate?: string, endDate?: string,remarks?: string) {
  this.selectedAccountId = account; // Set the selected account ID

  // Use the provided startDate and endDate, or fallback to default values
  const start = startDate || moment().subtract(90, 'days').format('YYYY-MM-DD')
  const end = endDate || moment().format('YYYY-MM-DD')// Default to today
 
  const page = 1; // Example page number
  const Payload :FetchPassbookDetailsPayload = {
    accesstoken: this.bankService.accesstoken,
    chemist_id: 1056,
    device_id: this.bankService.deviceId,
    account_id: account, // Pass the account number
    orderby: this.sortField,
    order: this.sortOrder,
    start_date: start,  // Use the filtered start date
    end_date: end,      // Use the filtered end date
    page: page,
    is_pdc: "no",
    passbook_page: 1,
    pdc_page: 1,
    search_by_id: 0,
    remarks: remarks || '' // Add remarks filter
  };
  this.bankService.fetchPassbookDetails(Payload)
    .subscribe(
      response => {  
        console.log('Passbook Details: new', response);

        // this.bankDetails = response.data.results;

        this.passbookDetails = response.data.passbook_result.results;
        this.passbook_pdc_Details = response.data.upcoming_pdc_result.results;
        this.total = response.data.passbook_result;
        this.totalAltra = response.data;
        this.current_bal = response.data.current_balance;  // Balance 
        this.total_credit = response.data.passbook_result.total_records[0].total_credit;
        this.total_debit = response.data.passbook_result.total_records[0].total_debit;    
        this.total_debit_pdc = response.data.upcoming_pdc_result.total_records[0].total_debit;

      },
      error => {
        console.error('Error fetching passbook details:', error);
      }
    );
}
openBottomSheetBankAccount(): void {
  if (this.bankDetails && this.bankDetails.length > 0) {
    this.bottomsheet.open(BottomSheetComponent, {
      panelClass: 'custom-width',  // Panel class for custom width
      data: { bankDetails: this.bankDetails }  // Pass bank details to BottomSheetComponent
    });
  } else {
    this.bottomsheet.open(BottomSheetComponent, {
      panelClass: 'custom-width',  // Panel class for custom width
      data: { message: 'No bank accounts added.' }  // Pass message when no bank details
    });
  }
}

openBottomSheet(): void {
  if (this.selectedAccountId) {
    const selectedAccount = this.bankDetails.find(account => account.id === this.selectedAccountId);
    
    if (selectedAccount) {
      if (selectedAccount.status === 'inactive') {
        alert('Account is deactivated.');
      } else {
        const bottomSheetRef = this.bottomsheet.open(BottomSheetaddupdatetransactionComponent, {
          panelClass: 'custom-width3',
          data: { accountId: this.selectedAccountId } // Pass the selected account ID
        });
        
        bottomSheetRef.afterDismissed().subscribe(result => {
          if (result) {
            
            this.passbookDetails = result.passbook_result.results; // Update passbookDetails with the returned data
        this.passbook_pdc_Details = result.upcoming_pdc_result.results;

            console.log("Updated passbook details ON Addd Trasctions:", this.passbookDetails);
        }
        });
      }
    } else {
      alert('No account found with the selected ID.');
    }
  } else {
    alert('Please select an account.');
  }
}
// showRemark: boolean = false;
activeIndex: number | null = null;

toggleRemark(index: number) {
  if (this.activeIndex === index) {
    this.activeIndex = null; // Hide the remark if it's already visible
  } else {
    this.activeIndex = index; // Show the remark for the clicked index
  }
}


onDeleteTransaction(transactionId: number) {
  console.log('Transaction ID:', transactionId);
  console.log('Current bank details:', this.bankDetails);

  const transactionExists = this.bankDetails.some(bk => 
      bk.passbook_details?.results.some((tx: Transaction) => tx.id === transactionId)
  );

  if (!transactionExists) {
      console.error('Transaction not found in any bank account.');
      return; // Exit if the transaction is not found
  }

  const bank = this.bankDetails.find(bk =>
      bk.passbook_details?.results.some((tx: Transaction) => tx.id === transactionId)
  );

  console.log('Bank:', bank);

  if (!bank) {
      console.error('Bank not found for the given transaction ID');
      return; // Exit if bank details are not found
  }

  const bank_id = bank.bank_id;
  const account_number = bank.account_number;

  console.log('Bank ID:', bank_id);
  console.log('Account Number:', account_number); 

  // Step 1: Confirm deletion
  const confirmDelete = confirm('Are you sure you want to delete this transaction?');
  if (!confirmDelete) {
      console.log('Transaction deletion canceled');
      return; // Exit if the user cancels the deletion
  }

  // Step 2: Prepare the payload for deletion
  const payload: deleteBankTransaction = {
      id: transactionId,
      bank_id: bank_id,
      account_number: account_number,
      chemist_id: 1056,
      accesstoken: 'o02eu1alolvojlc2',
      device_id: 'c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36'
  };

  // Step 3: Call the service to delete the transaction
  this.bankService.deleteTransaction(payload).subscribe(
      (response) => {
          if (response.status_code === '1') {
              console.log('Transaction deleted successfully', response.status_message);
              this.fetchPassbookDetails(this.selectedAccountId); // Ensure this updates the UI
          } else {
              console.log('Failed to delete transaction: ', response.status_message);
              this.fetchPassbookDetails(this.selectedAccountId);
          }
      },
      (error) => {
          console.error('Error occurred while deleting transaction: ', error);
      }
  );
}


onDeleteTransactionPDC(pdcid: any) {
  const confirmDelete = confirm('Are you sure you want to delete this transaction?');

  if (confirmDelete) {
      const payload: deleteBankTransactionPDC = {
          pdc_id: pdcid,
          chemist_id: 1056,
          accesstoken: 'o02eu1alolvojlc2',
          device_id: 'c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36'
      };

      this.bankService.deleteTransactionPDC(payload).subscribe(
          (response) => {
              if (response.status_code === '1') {
                  // Check for the PDC ID in passbook_pdc_Details
                  const index = this.passbook_pdc_Details.findIndex(item => item.id === pdcid);
                  console.log('Attempting to find ID:', pdcid);
                  console.log('PDC IDs in list:', this.passbook_pdc_Details.map(item => item.id));

                  if (index > -1) {
                      this.passbook_pdc_Details.splice(index, 1); // Remove the item from the array
                      console.log('Transaction deleted successfully and removed from the list.');
                  } else {
                      console.log('Transaction not found in the list.');
                  }
              } else {
                  console.log('Response:', response.status_message);
              }
          },
          (error) => {
              console.error('Error occurred while deleting transaction: ', error);
          }
      );
  } else {
      console.log('Transaction deletion canceled');
    }
  }
}