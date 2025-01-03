import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(
    data: { title: string; message: string },
    onClose?: () => void
  ) {
    const dialogRef = this.dialog.open(CustomDialogComponent, { data });
    if (onClose) {
      dialogRef.afterClosed().subscribe(onClose);
    }
  }
}
