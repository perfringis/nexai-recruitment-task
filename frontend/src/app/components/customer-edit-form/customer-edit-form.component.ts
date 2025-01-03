import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextValidator } from '../../validators/text.validator';
import { NumberValidator } from '../../validators/number.validator';
import { PostalCodeValidator } from '../../validators/postal.code.validator';

@Component({
  selector: 'customer-edit-form',
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-edit-form.component.html',
  styleUrl: './customer-edit-form.component.scss',
})
export class CustomerEditForm implements OnInit {
  @Input() customer!: Customer;
  @Output() submit = new EventEmitter<void>();

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      this.submit.emit(this.formGroup.value);
    }
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
