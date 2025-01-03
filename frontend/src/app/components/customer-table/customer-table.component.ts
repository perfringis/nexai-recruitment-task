import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { ButtonComponent } from '../button/button.component';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

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
    private dialog: MatDialog
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
        this.openDialog({
          title: 'Success',
          message: 'Customer created successfully!',
        });
      },
      (error) => {
        this.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }

  public openDialog(data: { title: string; message: string }) {
    this.dialog.open(CustomDialogComponent, {
      data,
    });
  }
}
