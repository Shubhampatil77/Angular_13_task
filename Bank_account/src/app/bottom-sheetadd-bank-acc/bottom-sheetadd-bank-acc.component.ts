import { Component, OnInit } from '@angular/core';
import { BankService } from '../Services/bank.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Bank, searchBankNamePayload } from '../Interface/bank.interface';
import { debounceTime, filter, fromEvent } from 'rxjs';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-bottom-sheetadd-bank-acc',
  templateUrl: './bottom-sheetadd-bank-acc.component.html',
  styleUrls: ['./bottom-sheetadd-bank-acc.component.css']
})
export class BottomSheetaddBankAccComponent implements OnInit {
  transactions: any[] = [];
  staffId: number = 0; 
  bankForm: FormGroup;
  banks: Bank[] = [];  
  selectedBankId: number | null = null;
  selectedBankName: string = '';
  bankDetails: any;
  isPrimaryAccount = 'no';  


    constructor(private fb: FormBuilder, private bankService: BankService,
      private bottomSheetRef: MatBottomSheetRef,  
    ) {
    this.bankForm = this.fb.group({
      accesstoken: ['o02eu1alolvojlc2',],
      account_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16)]],
      account_type: ['saving',],
      bank_id: [null, ],
      bank_name: ['',Validators.required],  
      chemist_id: [1056], 
      device_id: ['c0f4b8d0-511b-42f1-b7c3-f7d72d3dda36'], 
      ifsc_code: ['',Validators.required],
      is_primary: ['no']
    });
  }
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
  }
  }
  

  selectBank(bank: any): void {
    console.log('Bank Object:', bank); 
    this.selectedBankId = bank.id || bank.bank_id;
    this.bankForm.get('bank_id')?.setValue(this.selectedBankId); 
    this.bankForm.get('bank_name')?.setValue(bank.bank_name); 
    this.banks = []; 

    this.selectedBankName = bank.bank_name;  // Update selected bank name

    if (this.selectedBankId) {
      console.log(`Selected Bank: ${bank.bank_name}, ID: ${this.selectedBankId}`);
    } else {
      console.error('Error: Bank ID is undefined');
    }
  
    this.banks = []; // Clear the search results after selection
  }
  

  togglePrimaryAccount(event: MatCheckboxChange) {
    this.isPrimaryAccount = event.checked ? 'yes' : 'no';
    this.bankForm.get('is_primary')?.setValue(this.isPrimaryAccount); // Update form control value
  }
  
  toUpperCase(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
  }
  
  onSubmit(): void {
    if (this.bankForm .valid) {
      const formData = this.bankForm.value;
      this.bankService.addOrUpdateBankDetails(formData).subscribe(
        (response) => {
          console.log('Bank account added/updated successfully', response);
          this.bottomSheetRef.dismiss();

        },
        (error) => {
          console.error('Error adding/updating bank account', error);
        }
      );
    }
  }
  closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }
}
