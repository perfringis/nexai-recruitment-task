import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-custom-dialog',
  imports: [
    ButtonComponent
  ],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss',
})
export class CustomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
