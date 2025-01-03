import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';

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

  constructor(private customerService: CustomerService) {}

  public ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }
}
