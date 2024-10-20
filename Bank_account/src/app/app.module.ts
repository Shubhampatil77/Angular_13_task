import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BottomSheetaddBankAccComponent } from './bottom-sheetadd-bank-acc/bottom-sheetadd-bank-acc.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list'; // Import MatListModule here
// import Matauto
import { MatCardModule } from '@angular/material/card'; // Optional for better layout
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BottomSheetaddupdatetransactionComponent } from './BottomSheet/bottom-sheetaddupdatetransaction/bottom-sheetaddupdatetransaction.component'; // Import the MatTabsModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // This is required for the datepicker
import { MatSelectModule } from '@angular/material/select';
import { BottomsheetDeleteBankAccountComponent } from './BottomSheet/bottomsheet-delete-bank-account/bottomsheet-delete-bank-account.component';
import { EditBankAccountComponent } from './BottomSheet/edit-bank-account/edit-bank-account.component'; // if using <mat-option>
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MaterialModule } from './material/material.module';
import { DailogOpenComponent } from './dailog-open/dailog-open.component';


@NgModule({
  declarations: [
    AppComponent,
    BankAccountComponent,
    BottomSheetComponent,
    BottomSheetaddBankAccComponent,
    BottomSheetaddupdatetransactionComponent,
    BottomsheetDeleteBankAccountComponent,
    EditBankAccountComponent,
    DailogOpenComponent
  ],

  // entryComponents:[DailogOpenComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    NgxDaterangepickerMd.forRoot(),
    MatAutocompleteModule,


    MaterialModule
    

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
