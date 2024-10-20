import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA ,MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BankService } from 'src/app/Services/bank.service';
import { Bank, FetchBankDetailsPayload, searchBankNamePayload } from 'src/app/Interface/bank.interface';
import { debounceTime, filter, fromEvent } from 'rxjs';
import { SharedService } from 'src/app/Services/shared-service.service';

@Component({
  selector: 'app-edit-bank-account',
  templateUrl: './edit-bank-account.component.html',
  styleUrls: ['./edit-bank-account.component.css'],
})
export class EditBankAccountComponent implements OnInit {
  account: any;
  bankForm: FormGroup;
  isPrimaryAccount= ''; // Declare isPrimaryAccount
  banks: Bank[] = [];  
  selectedBankName: string = '';  
  selectedBankId: number | null = null;
  bankAccounts: any[] = []; // Store all bank accounts

  bankDetails: any[] = [];  //share service 


  ngOnInit(): void {
    const searchInput = document.getElementById('search-bank-input'); // Input field for search
    if (searchInput) {
      fromEvent(searchInput, 'input')
        .pipe(
          debounceTime(300), // Wait for 300ms pause
          filter((event: any) => event.target.value.length >= 3) // Only search if input length >= 3 characters
        )
        .subscribe((event: any) => {
          this.searchBank(event.target.value.trim());
        });
    }

  }
  
  searchBank(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();     // Now you can use 'value' to search the bank
    const accesstoken = 'o02eu1alolvojlc2'; // Use form value or default
    const chemist_id = "1056";
    const device_id = 'c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36'; // Hardcoded or get from form/control

    if (value.length >= 3) {
    const payload: searchBankNamePayload = {
      searchstring: value,
      accesstoken: accesstoken,
      chemist_id: chemist_id,
      device_id: device_id
    };
    
    this.bankService.searchBank(payload).subscribe(
      (response) => {
        if (response.status_code === '1') {
          this.banks = response.data; // Store the search result
        } else {
          this.banks = []; // Clear results if no match
          console.error('Error searching for banks:', response.status_message);
        }
      },
      (error) => {
        console.error('Error searching for banks', error);
        this.banks = []; // Clear results in case of an error
      }
    );
  }else {
    this.banks = [];
  // console.log(this.banks)
  }
  }

  
  selectBank(bank: any): void {
    console.log('Bank Object:', bank); // Log the bank object to inspect its structure
    this.selectedBankId = bank.id || bank.bank_id; // Try to get the ID from the correct field
    this.bankForm.get('bank_id')?.setValue(this.selectedBankId); // Update the form with the selected bank ID
    this.banks = []; // Clear the search results after selecting the bank

    this.selectedBankName = bank.bank_name;  // Update selected bank name

    if (this.selectedBankId) {
      console.log(`Selected Bank: ${bank.bank_name}, ID: ${this.selectedBankId}`);
    } else {
      console.error('Error: Bank ID is undefined');
    }
  
    this.banks = []; // Clear the search results after selection
  }
  
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private fb: FormBuilder, private bankService: BankService,
  private bottomSheetRef: MatBottomSheetRef, private sharedService: SharedService, 

    ) {
    this.account = data; 
    console.log("Accoutn Noumber "+this.account.account_number)
    console.log("Name"+this.account.bank_name)
    console.log("object+"+this.account.is_primary)

    this.bankForm = this.fb.group({
      accesstoken: ['o02eu1alolvojlc2',],
      
      account_id:[this.account.id,],
      account_no: [this.account.account_number, ],
      account_type: [this.account.account_type,],
      bank_name: [this.account.bank_name,Validators.required],  
      bank_id: [this.account.id],
      chemist_id: [1056], 
      device_id: ['c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36'], 
      ifsc_code: [this.account.ifsc_code],
      is_primary: [this.account.is_primary === 'yes'] // Set to boolean for the checkbox
    });
  }

  togglePrimaryAccount(event: MatCheckboxChange) {
    // Set isPrimaryAccount based on the checked state of the checkbox
    this.isPrimaryAccount = event.checked ? 'yes' : 'no';
    console.log('Initial account.is_primary:', this.account.is_primary);

    // Update the form control value accordingly
    this.bankForm.get('is_primary')?.setValue(this.isPrimaryAccount); 
    console.log("Primary Account Status: " + this.isPrimaryAccount);
}
isPrimaryDisabled(): boolean {
  // Log bankAccounts to ensure it's an array
  console.log('bankAccounts:', this.bankAccounts);

  // Ensure it's an array before calling some
  if (!Array.isArray(this.bankAccounts)) {
    console.error('bankAccounts is not an array');
    return false; // or true based on your logic
  }

  const isCurrentAccountPrimary = this.bankForm.get('is_primary')?.value === 'yes';
  const hasOtherPrimary = this.bankAccounts.some(account => account.id !== this.account.id && account.is_primary === 'yes');

  return hasOtherPrimary && !isCurrentAccountPrimary; // Disable if another account is primary
}


  onSubmit(): void {
    if (this.bankForm.valid) {
      const formData = this.bankForm.value;
      console.log("Data For Updating", this.bankForm.value);
  
      this.bankService.addOrUpdateBankDetails(formData).subscribe(
        (response) => {
          console.log('Bank account added/updated successfully', response);
          this.sharedService.getbanklist();

          this.bottomSheetRef.dismiss(); // Close the bottom sheet
        },
        (error) => {
          console.error('Error adding/updating bank account', error);
        }
      );
    }
  }
  
  toUpperCase(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
  }
  closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }

  }

