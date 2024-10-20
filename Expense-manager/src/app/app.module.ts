import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageExpenseComponent } from './manage-expense/manage-expense.component';
import { BottonSheetComponent } from './botton-sheet/botton-sheet.component';  // Import BottonSheetComponent
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatListModule} from '@angular/material/list';
import { MatBottomSheetModule,} from '@angular/material/bottom-sheet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as dayjs from 'dayjs/esm';
import { BottonSheet2Component } from './botton-sheet2/botton-sheet2.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ManageExpenseComponent,
    BottonSheetComponent,
    DateFormatPipe,
    BottonSheet2Component,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    MatListModule  ,
    FormsModule,ReactiveFormsModule ,HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    NgxDaterangepickerMd.forRoot(),
    ToastrModule.forRoot(),

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
