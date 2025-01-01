import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-edit-form',
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './customer-edit-form.component.html',
  styleUrl: './customer-edit-form.component.scss',
})
export class CustomerEditFormComponent {
  @Input() customer!: Customer;
  @Output() submit = new EventEmitter<void>();

  public onSubmit(): void {
    this.submit.emit();
  }
}
