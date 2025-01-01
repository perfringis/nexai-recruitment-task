import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-success-dialog',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
})
export class SuccessDialogComponent {
  @Input() message!: string;
  @Output() close = new EventEmitter<void>();

  public onClose(): void {
    this.close.emit();
  }
}
