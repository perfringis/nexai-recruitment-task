import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextValidator } from '../../validators/text.validator';
import { NumberValidator } from '../../validators/number.validator';
import { PostalCodeValidator } from '../../validators/postal.code.validator';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'customer-edit-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-edit.page.html',
  styleUrl: './customer-edit.page.scss',
})
export class CustomerEditPage implements OnInit {
  customer!: Customer;
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['customer']) {
      this.customer = navigation.extras.state['customer'];
    }
  }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: [
        this.customer.firstName,
        {
          validators: [Validators.required, TextValidator()],
        },
      ],
      lastName: [
        this.customer.lastName,
        {
          validators: [Validators.required, TextValidator()],
        },
      ],
      email: [
        this.customer.email,
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      address: this.fb.group({
        street: [
          this.customer.address.street,
          {
            validators: [Validators.required],
          },
        ],
        buildingNumber: [
          this.customer.address.buildingNumber,
          {
            validators: [Validators.required, NumberValidator()],
          },
        ],
        city: [
          this.customer.address.city,
          {
            validators: [Validators.required, TextValidator()],
          },
        ],
        country: [
          this.customer.address.country,
          {
            validators: [Validators.required, TextValidator()],
          },
        ],
        postalCode: [
          this.customer.address.postalCode,
          {
            validators: [Validators.required, PostalCodeValidator()],
          },
        ],
      }),
    });
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.customerService.editCustomer(this.customer).subscribe(
        (customer) => {
          this.openDialog({
            title: 'Success',
            message: 'Customer edited successfully!',
          });
          this.router.navigate(['/customer']);
        },
        (error) => {
          this.openDialog({
            title: 'Error',
            message: error.message,
          });
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public openDialog(data: { title: string; message: string }) {
    this.dialog.open(CustomDialogComponent, {
      data,
    });
  }

  get firstName(): FormControl {
    return this.formGroup.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.formGroup.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get street(): FormControl {
    return this.formGroup.get('address.street') as FormControl;
  }

  get buildingNumber(): FormControl {
    return this.formGroup.get('address.buildingNumber') as FormControl;
  }

  get city(): FormControl {
    return this.formGroup.get('address.city') as FormControl;
  }

  get country(): FormControl {
    return this.formGroup.get('address.country') as FormControl;
  }

  get postalCode(): FormControl {
    return this.formGroup.get('address.postalCode') as FormControl;
  }
}
