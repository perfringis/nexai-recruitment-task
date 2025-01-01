import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog.component';
import { CustomerEditFormComponent } from '../../components/customer-edit-form/customer-edit-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-edit',
  imports: [SuccessDialogComponent, CustomerEditFormComponent, CommonModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent {
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
        console.log('Customer edited:', customer);
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
