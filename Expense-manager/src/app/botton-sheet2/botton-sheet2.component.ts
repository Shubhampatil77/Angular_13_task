import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-botton-sheet2',
  templateUrl: './botton-sheet2.component.html',
  styleUrls: ['./botton-sheet2.component.css']
})
export class BottonSheet2Component implements OnInit {
  paymentMethodForm!: FormGroup;
  paymentMethods: any[] = [];
  originalPaymentMethods: any[] = []; // Store the original list of methods
  selectedMethod:any
  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<BottonSheet2Component>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any // Inject the data passed to the bottom sheet
  ) {}

  ngOnInit(): void {
    // Initialize form group with Validators
    this.paymentMethodForm = this.fb.group({
      payment_method_id: ['', Validators.required] // Form control for payment method
    });

    // Store a copy of the original payment methods
    this.originalPaymentMethods = [...this.data.paymentMethods];

    // Add "All Payments" option dynamically and set the list
    this.paymentMethods = [{ id: 'all', method_name: 'All Payments' }, ...this.originalPaymentMethods];
  }

  // Function to handle form submission
  selectPaymentMethod(): void {
    if (this.paymentMethodForm.valid) {
      const selectedMethod = this.paymentMethodForm.value.payment_method_id;
      this.bottomSheetRef.dismiss(selectedMethod); // Pass the selected payment method back
    }
  }

  // Reset the form to select "All Payments" and restore the full payment methods list
  resetForm(): void {
    this.paymentMethodForm.setValue({ payment_method_id: 'all' }); // Set "All Payments" as the selected value
    this.bottomSheetRef.dismiss('all');

  }
}
