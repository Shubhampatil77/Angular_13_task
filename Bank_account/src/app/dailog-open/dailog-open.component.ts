import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../app.component';

@Component({
  selector: 'app-dailog-open',
  templateUrl: './dailog-open.component.html',
  styleUrls: ['./dailog-open.component.css']
})
export class DailogOpenComponent {

  // constructor(
  //   public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogData,
  // ) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
