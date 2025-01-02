import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { ButtonComponent } from '../button/button.component';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  imports: [ButtonComponent, DialogComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() header!: string[];
  @Input() customers!: Customer[];

  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

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
        this.showSuccessDialog = true;
      },
      (error) => {
        this.showErrorDialog = true;
      }
    );
  }

  public closeSuccessDialog(): void {
    this.showSuccessDialog = false;
  }

  public closeErrorDialog(): void {
    this.showErrorDialog = false;
  }
}
