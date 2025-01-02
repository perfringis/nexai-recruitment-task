import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-customer',
  imports: [CustomerTableComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
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

  ngOnInit(): void {
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
