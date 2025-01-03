import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../components/custom-dialog/custom-dialog.component';

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
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
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
