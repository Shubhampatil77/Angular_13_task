import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BottomSheetaddBankAccComponent } from '../bottom-sheetadd-bank-acc/bottom-sheetadd-bank-acc.component';
import { EditBankAccountComponent } from '../BottomSheet/edit-bank-account/edit-bank-account.component';
import { BottomsheetDeleteBankAccountComponent } from '../BottomSheet/bottomsheet-delete-bank-account/bottomsheet-delete-bank-account.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent {

  bankDetails: any[] = []; // To hold the bank details

  constructor(
    private bottomsheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any  // Inject the passed data
  ) {
    this.bankDetails = data.bankDetails;  // Assign passed data to a local variable
  }
  openBottomSheetBankAccount() {
    this.bottomsheet.open(BottomSheetaddBankAccComponent, {
      panelClass: 'custom-width'
    });
  }
  openEditBottomSheet(account: any): void {
    console.log("account id: " + account);
  
    if (account.status === 'inactive') {
      alert('Cannot edit this account as it is deactivated.');
      return; 
    }
    this.bottomsheet.open(EditBankAccountComponent, {
      data: account,
    });
  }
  
  openInactiveBottomSheet(account: any): void {
    if (account.status === 'inactive') {
      alert('Cannot open this bottom sheet as the account is deactivated.');
      return; 
    }
    if(account.is_primary === "yes")  {
      alert('Please remove this account from being primary before deactivating it.')
      return
    }
    this.bottomsheet.open(BottomsheetDeleteBankAccountComponent, {
      data: account,
    });
  }
  
}
