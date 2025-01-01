import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer',
  imports: [TableComponent],
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
  data: Customer[] = [];

  
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (customers) => {
        this.data = customers;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }
}
