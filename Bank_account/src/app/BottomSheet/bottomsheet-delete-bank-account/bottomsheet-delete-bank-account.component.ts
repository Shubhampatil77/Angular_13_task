import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { bankAccountActiveInactive } from 'src/app/Interface/bank.interface';
import { BankService } from 'src/app/Services/bank.service';
@Component({
  selector: 'app-bottomsheet-delete-bank-account',
  templateUrl: './bottomsheet-delete-bank-account.component.html',
  styleUrls: ['./bottomsheet-delete-bank-account.component.css']
})
export class BottomsheetDeleteBankAccountComponent {
  ePIN: any;
  account: any;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomsheetDeleteBankAccountComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bankService: BankService 
  ) {
    this.account = data; 

  }
  // Method to delete the bank account
  inactiveBankAccount(): void {
    console.log("Account ID "+this.account.account_number)
    console.log("ePIN "+this.ePIN)

    const bank_id = this.data.bank_id;
    const payload : bankAccountActiveInactive ={
      accesstoken:this.bankService.accesstoken,
      account_id:this.account.account_number,
      authentication_code:this.ePIN.required ,
      chemist_id:1056,
      device_id:this.bankService.deviceId,
      status:"inactive"
    }

    this.bankService.activeInactiveBankAccount(payload).subscribe(
      response => {
        console.log(response)
        // console.log('Bank account deleted successfully');
      },
      error => {
        console.error('Error deleting bank account', error);
      }
    );
  }
  onSubmit(){
    console.log('ePIN submitted:', this.ePIN);

  }
  cancel(): void {
    this.bottomSheetRef.dismiss();
  }
}

