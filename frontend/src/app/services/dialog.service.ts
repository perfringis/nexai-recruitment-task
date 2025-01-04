import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { DialogComponent } from '../components/custom-dialog/custom-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(
    data: { title: string; message: string },
    onClose?: () => void
  ) {
    const dialogRef = this.dialog.open(DialogComponent, { data });
    if (onClose) {
      dialogRef.afterClosed().subscribe(onClose);
    }
  }
}
