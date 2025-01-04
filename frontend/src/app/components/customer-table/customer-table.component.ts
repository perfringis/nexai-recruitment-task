import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { ButtonComponent } from '../button/button.component';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'customer-table',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent {
  @Input() header!: string[];
  @Input() customers!: Customer[];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private dialogService: DialogService
  ) {}

  public createCustomer(): void {
    this.router.navigate(['/customer/new']);
  }

  public editCustomer(customer: Customer): void {
    this.router.navigate([`/customer/edit/${customer.id}`], {
      state: { customer },
    });
  }

  public deleteCustomer(customerId: string): void {
    this.customerService.deleteCustomer(customerId).subscribe(
      () => {
        this.customers = this.customers.filter(
          (customer) => customer.id !== customerId
        );
        this.dialogService.openDialog({
          title: 'Success',
          message: 'Customer deleted successfully!',
        });
      },
      (error) => {
        this.dialogService.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }
}
