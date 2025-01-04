import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'customer-page',
  imports: [CustomerTableComponent],
  templateUrl: './customer.page.html',
  styleUrl: './customer.page.scss',
})
export class CustomerPage implements OnInit {
  header = [
    'First name',
    'Last name',
    'Email',
    'Street',
    'Building number',
    'City',
    'Postal code',
    'Country',
    'Edit',
    'Delete',
  ];
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
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
