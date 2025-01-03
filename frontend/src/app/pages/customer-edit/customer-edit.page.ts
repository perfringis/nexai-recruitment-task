import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerEditFormComponent } from '../../components/customer-edit-form/customer-edit-form.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'customer-edit-page',
  imports: [
    DialogComponent,
    CustomerEditFormComponent,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './customer-edit.page.html',
  styleUrl: './customer-edit.page.scss',
})
export class CustomerEditPage {
  customer!: Customer;
  showDialog = false;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['customer']) {
      this.customer = navigation.extras.state['customer'];
    }
  }

  public onSubmit(): void {
    this.customerService.editCustomer(this.customer).subscribe(
      (customer) => {
        this.showDialog = true;
      },
      (error) => {
        console.error('Error editing customer:', error);
      }
    );
  }

  public closeDialog(): void {
    this.showDialog = false;
    this.router.navigate(['/customer']);
  }
}
