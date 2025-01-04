import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'customer-combo-box',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-combo-box.component.html',
  styleUrl: './customer-combo-box.component.scss',
})
export class CustomerComboBoxComponent {
  @Input() customers!: Customer[];
  @Output() customerSelect = new EventEmitter<Customer | null>();

  filteredCustomers: Customer[] = [];
  isOpen: boolean = false;
  searchText: string = '';

  constructor() {
    this.filteredCustomers = this.customers;
  }

  public toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.filteredCustomers = this.customers;
    this.searchText = '';
  }

  public filterCustomers() {
    this.filteredCustomers = this.customers.filter((customer) =>
      `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  public selectCustomer(customer: Customer) {
    this.searchText = `${customer.firstName} ${customer.lastName}`;
    this.isOpen = false;
    this.customerSelect.emit(customer);
  }

  public clearSelection() {
    this.searchText = '';
    this.isOpen = true;
    this.customerSelect.emit(null);
  }
}
