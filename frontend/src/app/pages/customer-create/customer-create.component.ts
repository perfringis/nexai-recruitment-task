import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
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

@Component({
  selector: 'app-customer-create',
  imports: [
    CommonModule,
    HeaderComponent,
    DialogComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss',
})
export class CustomerCreateComponent {
  showDialog = false;
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        buildingNumber: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
      }),
    });
  }

  public onSubmit(event: Event): void {
    event.preventDefault();

    console.log('Form:', this.formGroup.valid);
    if (this.formGroup.valid) {
      this.customerService.createCustomer(this.formGroup.value).subscribe(
        () => {
          this.showDialog = true;
        },
        (error) => {
          console.error('Error creating customer:', error);
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public closeDialog(): void {
    this.showDialog = false;
    this.router.navigate(['/customer']);
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
